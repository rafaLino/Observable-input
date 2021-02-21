import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FakerService } from './faker.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'observable-input';
  todoList$: Observable<Array<Todo>>;
  count: number = 0;
  constructor(
    private api: ApiService,
    private faker: FakerService
  ) { }

  ngOnInit(): void {
    this.todoList$ = this.api.get();
  }

  public refresh(): void {
    this.todoList$ = this.api.get();
  }

  public async add(): Promise<void> {
    const todo = this.faker.createTodo();
    await this.api.post(todo).toPromise();
  }

  public deleteAll(): void {
    let ids: number[] = [];
    this.todoList$.subscribe(list => {
      ids = list.map(x => x.id);
      ids.forEach(async id => {
        try {
          await this.api.delete(id).toPromise();
        }
        catch {
          console.error('error in id:', id);
        }
      });
    });
  }
}
