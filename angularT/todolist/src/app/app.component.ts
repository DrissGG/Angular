import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskInterface } from './interfaces/task-interface';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Title } from '@angular/platform-browser';
// Décorateur avec ses annotations. Ce décorateur fait appel à une directive qui est une classe qui va
// déterminer (via les annotations) le comportement du composant
@Component({
  selector: 'digi-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'TODOLIST';
  constructor(headTitle: Title) {
    headTitle.setTitle('Test de titre');
  }
}
