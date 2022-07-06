import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoList} from './todo-list';
import {TodoListService} from './todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'Todo App';
  public todoList: TodoList[];
  public todoForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly todoListService: TodoListService) {
    this.todoForm = this.fb.group({
      task: ['', Validators.required]
    });

    this.todoList = this.todoListService.getTodoList();
  }

  /**
   * Method will add task to TodoList
   */
  public addTask(): void {
    const task = (this.todoForm.get('task')?.value as string).trim();
    const duplicateTask: boolean = this.todoList.some(item => item.task === task);

    if (!!task && !duplicateTask) {
      this.todoListService.addTask({task});
    } else {
      alert(`${task} is already present in list`);
    }
    this.resetForm();
  }

  /**
   * Method will delete task from TodoList
   */
  public deleteTask(task: TodoList): void {
    this.todoListService.deleteTask(task);
  }

  /**
   * Method will pass data to export service to create csv from list {@link todoList}
   *
   */
  public exportToCsv(): void {
    this.todoListService.exportToCsv(this.todoList, 'user-data');
  }

  /**
   * Method will reset form
   */
  public resetForm(): void {
    this.todoForm.reset({task: ''});
  }
}
