// This is just a placeholder... 
// A better structure would be
// graphql/typeDef.js, graphql/resolvers.js, etc.
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

const ObjectifyId = (id) => {
  return new ObjectId(id);
}

const resolvers = {
  Query: {
    posts: async () => {
      const data = await context()
      return (data.find({}).toArray())
    },
    async post(_parent, _args, _context, _info) {
      const data = await context()
      return data.findOne(ObjectifyId(_args._id))
    }
  },
  Mutation: {
    submitPost: async(root, args, _context, info) => {
      const Posts = await context()
      if (args.input._id) {
        const res = await Posts.updateOne(
          {_id: ObjectifyId(args.input._id)}, 
          {$set: {
            "author": args.input.author, 
            "body": args.input.body 
          }}
        )
        return (await Posts.findOne({_id: ObjectifyId(args.input._id)}))
      } 
      const res = await Posts.insertOne(args.input)
      return (await Posts.findOne({_id: res.insertedId}))
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;