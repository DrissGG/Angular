import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTasksService } from '../data-tasks.service';


@Component({
  selector: 'digi-form-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})

export class FormTaskComponent {
  constructor(private dataTasksService: DataTasksService) {
  }

  register(formValues: string) {
    console.log("formValues values dans onSubmit", formValues)
    // emission notification next 
    this.dataTasksService.setFormValues(formValues)
  }
}