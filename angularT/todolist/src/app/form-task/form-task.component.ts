import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'digi-form-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})

export class FormTaskComponent {
  register(taskTitle: string) {
    console.log(`Formulaire soumis`, taskTitle);
  }
}