import { Component, Input, Output, EventEmitter } from '@angular/core'; // Assurez-vous d'importer Output et EventEmitter
import { TaskInterface } from '../../interfaces/task-interface';
import { CommonModule } from '@angular/common';
import { DataTasksService } from '../../data-tasks.service'; // Importer le service

@Component({
  selector: 'digi-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: TaskInterface;
  // Déclarez l'événement deleteTaskEvent avec @Output
  @Output() deleteTaskEvent = new EventEmitter<string>();


  constructor(private dataTasksService: DataTasksService) { }

  // Méthode pour valider/invalider la tâche
  onButtonValidate() {
    this.task.done = !this.task.done; // Inverser l'état de la tâche
    this.dataTasksService.patchTask(this.task).subscribe({
      next: (updatedTask) => console.log(`Tâche mise à jour : ${updatedTask}`),
      error: (err) => console.error(`Erreur lors de la mise à jour : ${err}`),
    });
  }

  // Méthode pour supprimer la tâche
  onButtonDelete() {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette tâche ?');
    if (confirmation) {
      this.dataTasksService.deleteTask(this.task.id).subscribe({
        next: () => {
          console.log('Tâche supprimée avec succès');
          this.deleteTaskEvent.emit(this.task.id); // Émettre l'événement avec l'ID de la tâche
        },
        error: (err) => console.error(`Erreur lors de la suppression : ${err}`),
      });
    }
  }
}
