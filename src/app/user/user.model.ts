export class User {
  public _id: string;
  public username: string;
  public email: string;
  // public image: { name: string, url: string };
  public password: string;
  public friends: User[];
  public token: [{access: string, token: string }];

  constructor(_id: string, username: string, email: string, password: string, friends: User[], token: [{access: string, token: string}]) {
    this._id = _id;
    this.username = username;
    this.email = email;
    // this.image = image;
    this.password = password;
    this.friends = friends;
    this.token = token;
  }
}
