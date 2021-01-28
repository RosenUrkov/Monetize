import { User } from './../../../entities/user.entity';
import { createConnection, Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';

const seedUser = async (connection) => {
  const userRepo: Repository<User> = connection.manager.getRepository(User);
  const seedUser = await userRepo.findOne({
    where: {
      username: 'user',
    },
  });

  if (seedUser) {
    console.log('The user is already seeded!');
    return;
  }

  const username = 'user';
  const password = 'asd123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { username, password: hashedPassword };

  const createdUser = await userRepo.save(user);
  console.log('Seeded user successfully!');

  return createdUser;
};

const seed = async () => {
  console.log('Seed started!');
  const connection = await createConnection();

  await seedUser(connection);

  await connection.close();
  console.log('Seed completed!');
};

seed().catch(console.error);
