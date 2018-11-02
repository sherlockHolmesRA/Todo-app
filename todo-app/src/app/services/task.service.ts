import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class TaskService {
   constructor(private http: Http) { }

   createTask(task) {
       return this.http.post(environment.api + '/todo/task', task)
           .map(res => res.json());
   }

   updateTask(task) {
       return this.http.put(environment.api + '/todo/task', task)
           .map(res => res.json());
   }

   deleteTask(task) {
       return this.http.delete(environment.api + '/todo/task/' + task.id);
   }

}
