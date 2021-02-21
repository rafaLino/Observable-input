import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { Todo } from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class FakerService {

  constructor() { }

  createTodo(): Todo {
    const todo = new Todo();
    todo.id = faker.random.number();
    todo.title = faker.lorem.word();
    todo.description = faker.lorem.words(3);
    todo.completed = false;
    return todo;
  }
}
