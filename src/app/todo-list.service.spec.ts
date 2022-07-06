import {TestBed} from '@angular/core/testing';
import {TodoList} from './todo-list';
import {TodoListService} from './todo-list.service';

describe('TodoListService', () => {
  let service: TodoListService;
  let database: TodoList[] = [];
  let task1: { task: string };
  let task2: { task: string };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListService);
    database = service.getTodoList();
    task1 = {task: 'Task 1'};
    task2 = {task: 'Task 2'};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should add task', () => {
    service.addTask(task1);
    expect(database[0]).toEqual(task1);
  });

  it('Should delete a task', () => {
    service.deleteTask(task1);
    expect(database[0]).toBeUndefined();
  });
});
