import { Injectable } from '@angular/core';
import { TaskInterface, TaskPostInterface } from './interfaces/task-interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataTasksService {
  constructor(private http: HttpClient) { }

  private formValues$ = new Subject<any>()
  private url = 'http://localhost:3000/tasks';
  loadTasks(): Observable<TaskInterface[]> {
    return this.http.get<Array<TaskInterface>>(this.url);

  }
  postTask(newTask: TaskPostInterface): Observable<TaskInterface> {
    console.log("dans postTask: ", newTask);
    return this.http.post<TaskInterface>(this.url, newTask)

  }

  getFormValuesObservable() {
    return this.formValues$.asObservable()
  }

  setFormValues(values: any) {
    this.formValues$.next(values)
  }
}
