import request from "supertest";
import { app } from "../../app";

it("respons with details about the cuurent user", async () => {
  const cookie = await global.login();

  const response = await request(app)
    .get("/api/auth/currentuser")
    .set("Cookie", cookie!)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
