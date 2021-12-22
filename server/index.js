const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { MongoClient, ObjectId } = require('mongodb');

const typeDefs = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(_id: ID!): Post
  }

  type Post {
    _id: ID
    author: String
    body: String
  }

  type Mutation {
    submitPost(input: PostInput!): Post
  }
  
  input PostInput {
    _id: ID
    author: String!
    body: String!
  }  
`);

const context = async() => {
  let db;
  try {
    const dbClient = new MongoClient('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await dbClient.connect()
    db = dbClient.db('near') // database name
    return db.collection('posts')
  } catch (e) {
    console.log('--->error while connecting via graphql context (db)', e)
  }
}

const prepare = (o) => {
  o._id = new ObjectId(o._id)
  return o
}

const resolvers = {
  Query: {
    posts: async () => {
      const data = await context()
      return (data.find({}).toArray())
    },
    async post(_parent, _args, _context, _info) {
      const data = await context()
      return data.findOne(prepare(_args))
    }
  },
  Mutation: {
    submitPost: async(root, args, _context, info) => {
      const Posts = await context()
      if (args.input._id) {
        const res = await Posts.updateOne(
          {_id: prepare(args.input)._id}, 
          {$set: {
            "author": args.input.author, 
            "body": args.input.body 
          }}
        )
        return (await Posts.findOne({_id: prepare(args.input)._id}))
      } 
      const res = await Posts.insertOne(args.input)
      return (await Posts.findOne({_id: res.insertedId}))
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
