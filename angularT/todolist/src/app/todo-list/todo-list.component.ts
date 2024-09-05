import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInterface } from '../interfaces/task-interface';
import { TaskComponent } from './task/task.component';
import { DataTasksService } from '../data-tasks.service';
import { FormTaskComponent } from '../form-task/form-task.component';

@Component({
  selector: 'digi-todo-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, FormTaskComponent],
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
    //souscription l'observable 
    this.dataTasksService.getFormValuesObservable().subscribe({
      next: (newTaskData) => {
        //ajout local 
        const newTask = {
          name: 'tmp',
          done: false,
          ...newTaskData
        }
        this.tasks.push({ ...newTask, id: "tmp" })
        // ajout sur jsonServer
        this.dataTasksService.postTask(newTask).subscribe({
          next: (newTaskFromJson) => {
            console.log("newTaskFromJson: ", newTaskFromJson)
            //je voudrais donner l'id provenant du server  a l'objet tache local
            // coder une ligne ici 
            newTaskData.id = newTaskFromJson.id
          },
          error: (error) => {
            console.error("error attrapée dans le todiList component lors de la requete http post", error.message())
            this.tasks.pop() //methode impure 
          }
        })

      }

    })

  }
}
