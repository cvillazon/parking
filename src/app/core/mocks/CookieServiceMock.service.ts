export class CookieServiceMock {
  get(key: string) {
    return key
      ? "--eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcy52aWxsYXpvbkBjZWliYS5jb20uY28iLCJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.PU9kIdBC_9CGttcUGe5BpGHKD75Sxfdbr495ZevNQ4s"
      : null;
  }
}
