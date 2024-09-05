import { Component, Input } from '@angular/core';
import { TaskInterface } from '../../interfaces/task-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'digi-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: TaskInterface;
  // Méthodes
  onButtonValidate() {
    console.log(`Bouton validé`);
    this.task.done = !this.task.done;
  }
}
