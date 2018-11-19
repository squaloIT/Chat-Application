export class User {
  public username: string;
  public email: string;
  public image: { name: string, url: string };
  public password: string;
  public friends: User[];

  constructor(username: string, email: string, image: { name: string, url: string }, password: string, friends: User[]) {
    this.username = username;
    this.email = email;
    this.image = image;
    this.password = password;
    this.friends = friends;
  }
}
