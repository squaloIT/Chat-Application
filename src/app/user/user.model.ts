export class User {
  public userID: string;
  public username: string;
  public email: string;
  public image: { name: string, url: string };
  public password: string;
  public friends: User[];

  constructor(userID: string, username: string, email: string, image: { name: string, url: string }, password: string, friends: User[]) {
    this.userID = userID;
    this.username = username;
    this.email = email;
    this.image = image;
    this.password = password;
    this.friends = friends;
  }
}
