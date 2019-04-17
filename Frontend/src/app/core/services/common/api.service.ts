import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',

  })

  api_url = 'http://localhost:5000/'

  constructor(private http: HttpClient) {  }

  private executeHttpMethod(httpMethod: string, url: string, data?: { [key: string]: any }): Observable<any> {

    const httpMethodName: string = httpMethod.toLowerCase()

    const req$: Observable<Response> = data ?
      this.http[httpMethodName](`${this.api_url}${url}`, data, { headers: this.headers }) :
      this.http[httpMethodName](`${this.api_url}${url}`, { headers: this.headers })

    return req$
  }

  get(path: string): Observable<any> {
    return this.executeHttpMethod('get', path, null)
  }

  post(path: string, body): Observable<any> {
    return this.executeHttpMethod('post', path, body)
  }

  put(path: string, body): Observable<any> {
    return this.executeHttpMethod('put', path, body)
  }

  delete(path): Observable<any> {
    return this.executeHttpMethod('delete', path, null)
  }
}

