import request from "supertest";
import { app } from "../../app";

const validUserData = {
  firstName: "Test",
  lastName: "User",
  email: "test@test.com",
  password: "Password123",
  confirmPassword: "Password123"
};

describe("POST /api/auth/register", () => {
  it("returns 201 on successful register", async () => {
    await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", validUserData.lastName)
      .field("email", validUserData.email)
      .field("password", validUserData.password)
      .field("confirmPassword", validUserData.confirmPassword)
      .expect(201);
  });

  it("returns 400 with an invalid email", async () => {
    await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", validUserData.lastName)
      .field("email", "invalidemail")
      .field("password", validUserData.password)
      .field("confirmPassword", validUserData.confirmPassword)
      .expect(400);
  });

  it("returns 400 with an invalid password (too short)", async () => {
    await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", validUserData.lastName)
      .field("email", validUserData.email)
      .field("password", "Pw1")
      .field("confirmPassword", "Pw1")
      .expect(400);
  });

  it("returns 400 with password missing required characters", async () => {
    await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", validUserData.lastName)
      .field("email", validUserData.email)
      .field("password", "password")  // missing number
      .field("confirmPassword", "password")
      .expect(400);
  });

  it("returns 400 with non-matching passwords", async () => {
    await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", validUserData.lastName)
      .field("email", validUserData.email)
      .field("password", "Password123")
      .field("confirmPassword", "Password124")
      .expect(400);
  });

  it("returns 400 with missing fields", async () => {
    await request(app)
      .post("/api/auth/register")
      .expect(400);
  });

  it("returns 400 with numbers in firstName", async () => {
    await request(app)
      .post("/api/auth/register")
      .field("firstName", "Test123")
      .field("lastName", validUserData.lastName)
      .field("email", validUserData.email)
      .field("password", validUserData.password)
      .field("confirmPassword", validUserData.confirmPassword)
      .expect(400);
  });

  it("returns 400 with numbers in lastName", async () => {
    await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", "User123")
      .field("email", validUserData.email)
      .field("password", validUserData.password)
      .field("confirmPassword", validUserData.confirmPassword)
      .expect(400);
  });

  it("disallows duplicate emails", async () => {
    // First register
    await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", validUserData.lastName)
      .field("email", validUserData.email)
      .field("password", validUserData.password)
      .field("confirmPassword", validUserData.confirmPassword)
      .expect(201);

    // Duplicate register attempt
    await request(app)
      .post("/api/auth/register")
      .field("firstName", "Another")
      .field("lastName", "User")
      .field("email", validUserData.email)  // Same email
      .field("password", validUserData.password)
      .field("confirmPassword", validUserData.confirmPassword)
      .expect(400);
  });

  it("sets a cookie after successful register", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .field("firstName", validUserData.firstName)
      .field("lastName", validUserData.lastName)
      .field("email", validUserData.email)
      .field("password", validUserData.password)
      .field("confirmPassword", validUserData.confirmPassword)
      .expect(201);
      
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});