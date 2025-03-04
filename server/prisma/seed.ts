import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@near.dev' },
    update: {},
    create: {
      email: 'admin@near.dev',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create demo user
  const userPassword = await bcrypt.hash('demo123', 10);
  await prisma.user.upsert({
    where: { email: 'demo@near.dev' },
    update: {},
    create: {
      email: 'demo@near.dev',
      name: 'Demo User',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
