import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  // First register a user with all required fields
  await request(app)
    .post('/api/users/register')
    .field('firstName', 'Test')
    .field('lastName', 'User')
    .field('email', 'test@test.com')
    .field('password', 'Password123')
    .field('confirmPassword', 'Password123')
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})  // No need for FormData here since we're not sending any data
    .expect(200);

  // Check if the cookie is cleared correctly
  expect(response.get('Set-Cookie')![0]).toEqual(
    'sima-auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});