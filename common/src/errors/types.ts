export enum ServerErrorType {
  NoError = 0,
  RequestValidation = 1,
  BadRequest = 2,
  DatabaseConnection = 3,
  NotAuthorized = 4,
  NotFound = 5,
  AuthWrongPasswordOrEmail = 6,
  AuthUserAlreadyExists = 7,
  AuthTokenNotFound = 8,
  AuthTokenExpired = 9,
  AuthInvalidToken = 10,
  TooManyRequests = 11,
  InternalServerError = 12,
}

export interface CustomNextRequest<B, P, Q> extends Express.Request {
  body: B;
  params: P;
  query: Q;
}