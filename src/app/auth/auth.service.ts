import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  onAuth = new Subject<string | null>();
  // private token = null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  signInUser(email: string, password: string): Observable<HttpResponse<any>> {
    const url = 'http://localhost:3000/auth/login';
    const data = {
      email, password
    };
    return this.httpClient.post(url, data, { observe: 'response' });
  }

  registerUser(email: string, password: string, username: string): Observable<HttpResponse<Object>> {
    return this.httpClient.post(`http://localhost:3000/auth/register`, {
      'email': email,
      'username': username,
      'password': password
    }, {
        observe: 'response'
      });

    // return this.token;
  }
  isAuthenticated(): boolean {
    return this.getToken() != null;
  }
  getUserID(): Observable<HttpResponse<Object>> {
    return this.httpClient.get('http://localhost:3000/user/id',
      {
        headers: new HttpHeaders().append('authorization', this.getToken()),
        observe: 'response'
      });
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.emitAuth();
    // this.getUserID().subscribe((response: HttpResponse<any>) => {
    //   if (response.status === 200) {
    //     const userID = response.body.idAndTimestamp._id;
    //     console.log(userID);
    //     this.onAuth.next(userID);
    //     // TODO ODAVDE TREBA NASTAVITI DA SE URADI PRIKAZ PRIJATELJA KADA JE NEKO ULOGOVAN I CELJA DALJA LOGIKA OKO TOGA
    //   } else {
    //     this.onAuth.next(null);
    //   }
    // });
    // saljem event i kazem da se userID promenio svima koje to zanima

  }
  deleteToken(token: string) {
    this.httpClient.delete('http://localhost:3000/users/token', {
      headers: {
        authorization: token
      },
      observe: 'response'
    }).subscribe((response) => {
      if (response.status === 204) {
        localStorage.removeItem('access_token');
        this.router.navigate(['auth/login']);
      } else {
        // localStorage.removeItem('access_token');
        alert('Nismo uspeli da obrisemo Vas token');
      }
    },
      (err) => {
        alert('Nismo uspeli da obrisemo Vas token');
        console.error(err);
      });
  }
  emitAuth(): void {
    this.onAuth.next(this.getToken());
  }
  logOut(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Your token is already expired!');
      this.router.navigate(['auth/login']);
      return;
    }
    this.deleteToken(token);
  }
}
