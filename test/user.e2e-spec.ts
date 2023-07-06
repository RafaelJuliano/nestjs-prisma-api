import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';

describe('Users /users', () => {
  let app: INestApplication;

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', () => {
    const createUserDto = {
      name: 'John',
      email: 'john@mail.com',
      admin: false
    }
    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
  });

  it('/users/:id (POST)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(respose => {
        expect(respose.body).toHaveLength(1)
      });
  });

  it('/users (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200)
  });
});
