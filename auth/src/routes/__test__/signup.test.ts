import request from "supertest";
import { app } from "../../app";


describe("GET /api/users/signup", () => {
  it("returnsa 201 on successful signup", async () => {
     await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  });
});

describe("GET /api/users/signup", () => {
  it("returns 400 with an invalid email", async () => {
     await request(app)
      .post("/api/users/signup")
      .send({
        email: "simatestgmail.com",
        password: "password",
      })
      .expect(400);
  });
});

describe("GET /api/users/signup", () => {
  it("returns 400 with an invalid password", async () => {
     await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "pd",
      })
      .expect(400);
  });
});

describe("GET /api/users/signup", () => {
  it("returns 400 with missing email and password", async () => {
     await request(app).post("/api/users/signup").send({}).expect(400);
  });
});

describe("GET /api/users/signup", () => {
  it("it disallows duplicate emails ", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
  });
});

describe("GET /api/users/signup", () => {
  it("sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
      
      expect(response.get('Set-Cookie')).toBeDefined();
  });
});


// describe('GET /api/users/signup', () => {
//     it('returnsa 201 on successful signup', async () => {
//       const response = await request(app).get('/api/users/number');

//       expect(response.status).toBe(200);
//       expect(response.body.number).toBe(42);
//     });
//   });
