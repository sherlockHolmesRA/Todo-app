import { Component, OnInit } from '@angular/core';

import { TaskService } from './services/task.service';
import { TodoService } from './services/todo.service';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 todos: Array<any>;
 newTodo: any;
 requesting: boolean;

 constructor(private todoService: TodoService, private taskService: TaskService) { }

 ngOnInit() {
   this.newTodo = { title: '', tasks: [] };
   this.requesting = false;
   this.getTodos();
 }


 getTodos() {
   this.requesting = true;
   this.todoService.getTodos().subscribe((res) => {
     this.todos = res.todos;
     this.requesting = false;
   }, (err) => {
     this.requesting = false;
   });
 }

 createTodo() {
   this.requesting = true;
   this.todoService.createTodo(this.newTodo).subscribe((res) => {
     this.todos.push(res);
     this.newTodo = {};
     this.requesting = false;
   });

 }

 deleteTodo(todo) {

   this.requesting = true;
   this.todoService.deleteTodo(todo).subscribe(() => {
     this.todos.forEach((t, i) => {
       if (t.id === todo.id) {
         this.todos.splice(i, 1);
       }
     });
     this.requesting = false;
   });
 }

 createTask(todo) {

   this.requesting = true;
   const newTask = { todoId: todo.id, content: todo.taskContent };

   this.taskService.createTask(newTask).subscribe((res) => {
     todo.tasks.push(res);
     delete todo.taskContent;
     this.requesting = false;
   });
 }

 updateTask(task) {

   this.requesting = true;
   if (task.state) {
     task.state = false;
   } else {
     task.state = true;
   }

   this.taskService.updateTask(task).subscribe((res) => {
     task = res;
     this.requesting = false;
   });
 }

 deleteTask(todo, task) {
   this.requesting = true;
   this.taskService.deleteTask(task).subscribe(() => {
     todo.tasks.forEach((t, i) => {
       if (t.id === task.id) {
         todo.tasks.splice(i, 1);
       }
     });
     this.requesting = false;
   });

 }
}
