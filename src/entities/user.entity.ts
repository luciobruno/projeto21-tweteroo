export class User {
  private username: string;
  private avatar: string;

  constructor(username: string, avatar: string) {
    this.username = username;
    this.avatar = avatar;
  }

  get _findUsername() {
    return this.username;
  }

  get _findAvatar() {
    return this.avatar;
  }
}
