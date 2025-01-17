import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/login')
    .field('email', 'test@test.com')
    .field('password', 'Password123')
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  // First register a user with all required fields
  await request(app)
    .post('/api/users/register')
    .field('firstName', 'Test')
    .field('lastName', 'User')
    .field('email', 'test@test.com')
    .field('password', 'Password123')
    .field('confirmPassword', 'Password123')
    .expect(201);

  // Try to sign in with wrong password
  await request(app)
    .post('/api/users/login')
    .field('email', 'test@test.com')
    .field('password', 'WrongPassword123')
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  // First register a user with all required fields
  await request(app)
    .post('/api/users/register')
    .field('firstName', 'Test')
    .field('lastName', 'User')
    .field('email', 'test@test.com')
    .field('password', 'Password123')
    .field('confirmPassword', 'Password123')
    .expect(201);

  // Sign in with correct credentials
  const response = await request(app)
    .post('/api/users/login')
    .field('email', 'test@test.com')
    .field('password', 'Password123')
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});