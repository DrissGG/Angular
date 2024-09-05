import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInterface } from '../interfaces/task-interface';
import { TaskComponent } from './task/task.component';
import { DataTasksService } from '../data-tasks.service';
import { NewsletterComponent } from '../newsletter/newsletter.component';

@Component({
  selector: 'digi-todo-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, NewsletterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() data: string = '';

  tasks!: TaskInterface[];

  constructor(private dataTasksService: DataTasksService) { }

  ngOnInit(): void {
    this.dataTasksService.loadTasks().subscribe({
      next: (tasksFromHttpRequest) => {
        this.tasks = tasksFromHttpRequest;
      },
      error: (error) => {
        console.error(
          `Erreur dans TodoListComponent loadTasks ${error.message}`
        );
      },
      complete: () => {
        console.log(`Observable issu de la loadTasks terminé `);
      },
    });
  }
}
