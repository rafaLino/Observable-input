import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient,
  ) { }

  get(): Observable<Array<Todo>> {
    return this._http.get<Array<Todo>>(environment.baseUrl + 'todos');
  }

  post(todo: Todo): Observable<void> {
    return this._http.post<void>(environment.baseUrl + 'todos', todo);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.baseUrl}todos/${id}`);
  }
}
