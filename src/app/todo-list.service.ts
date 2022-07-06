import {Injectable} from '@angular/core';
// @ts-ignore
import * as FileSaver from 'file-saver';
import {StorageService} from './storage.service';
import {TodoList} from './todo-list';

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';
const TODO_LIST_STORAGE_KEY = 'TODO_LIST';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private readonly todoList: TodoList[];
  private defaultTodoList: TodoList[] = [];

  constructor(private storageService: StorageService) {
    this.todoList = storageService.getItem(TODO_LIST_STORAGE_KEY) || this.defaultTodoList;
  }

  public getTodoList(): TodoList[] {
    return this.todoList;
  }

  public addTask(task: TodoList): void {
    this.todoList.push(task);
    this.saveTaskList();
  }

  public deleteTask(task: TodoList): void {
    const index = this.todoList.indexOf(task);
    this.todoList.splice(index, 1);
    this.saveTaskList();
  }

  /**
   * Convert an array of data to csv.
   * It automatically generates title row based on object keys.
   *
   * @param rows array of data to be converted to CSV.
   * @param fileName filename to save as.
   * @param columns array of object properties to convert to CSV. If skipped, then all object properties will be used for CSV.
   */
  public exportToCsv(rows: { task: string }[], fileName: string, columns?: string[]): void {
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });

    const csvContent =
      keys.join(separator) + '\n' +
      rows.map((row: any) => {
        return keys.map(k => {
          return row[k] === null || row[k] === undefined ? '' : row[k];
        }).join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }

  private saveTaskList(): void {
    this.storageService.setItem(TODO_LIST_STORAGE_KEY, this.todoList);
  }

  /**
   * Saves the file on user's machine via FileSaver library.
   *
   * @param buffer The data that need to be saved.
   * @param fileName File name to save as.
   * @param fileType File type to save as.
   */
  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], {type: fileType});
    FileSaver.saveAs(data, fileName);
  }
}
