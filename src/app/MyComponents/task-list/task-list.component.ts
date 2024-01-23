// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './task-list.component.html',
//   styleUrl: './task-list.component.css'
// })
// export class TaskListComponent {

// }

// task-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TodoService, Todo } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, MatButtonModule, MatTableModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: Todo[] = [];
  constructor(private todoService: TodoService) {}

  deleteTask(index: number) {
    // Check if the tasks array is not empty and the index is within bounds
    if (this.tasks && this.tasks.length > 0 && index >= 0 && index < this.tasks.length) {
      const deletedTask = this.tasks[index];
  
      const deletedTaskId = deletedTask.id; // Use deletedTask instead of this.tasks[index]
  
      this.todoService.deleteTask(deletedTaskId).subscribe(
        () => {
          // Remove the task from the tasks array if deletion is successful
          this.tasks.splice(index, 1);
          console.log('Task deleted');
          console.log(`Task "${deletedTask.title}" deleted`);
          this.tasks.forEach((task, i) => {
            task.id = i + 1;
          });
        },
        (error: any) => {
          console.error('Error deleting task:', error);
        }
      );
    } else {
      console.error('Invalid index or tasks array is empty.');
    }
  }
  

  toggleEditMode(index: number) {
    this.tasks[index].editMode = !this.tasks[index].editMode;
  }
  
  saveTask(i: number) {
    const updatedTask = this.tasks[i];
  
    // Check if the task has an 'id' property before attempting to update
    if (!updatedTask || !updatedTask.id) {
      console.error('Task or task id is missing.');
      return;
    }
  
    this.todoService.updateTask(updatedTask.id, updatedTask).subscribe(
      (updatedTaskResponse: Todo) => {
        // Update the tasks array with the updated task from the server
        this.tasks[i] = updatedTaskResponse;
        this.tasks[i].editMode = false;
        console.log('Task updated', updatedTaskResponse);
      },
      
    );
  }
  

  markCompleted(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }
}


















// saveTask(index: number) {
  //   const updatedTaskId = this.tasks[index].id;
  //   const updatedTask = this.tasks[index];

  //   this.todoService.updateTask(updatedTaskId, updatedTask).subscribe(
  //     (updatedTaskResponse: Todo) => {
  //       // Rebuild the tasks array with the updated task
  //       this.tasks = this.tasks.map((task, i) =>
  //         i === index ? updatedTaskResponse : task
  //       );

  //       console.log('Task updated:', updatedTaskResponse);
  //     },
  //     (error: any) => {
  //       console.error('Error updating task:', error);
  //     },
  //     () => {
  //       // Set editMode to false after the update, regardless of success or failure
  //       this.tasks[index].editMode = false;
  //     }
  //   );
  // }

  // saveTask(index: number) {
  //   const updatedTaskId = this.tasks[index].id;

  //   // Include the 'id' property in the updatedTask object
  //   const updatedTask = {
  //     id: updatedTaskId,
  //     title: this.tasks[index].title,
  //     completed: this.tasks[index].completed,
  //     editMode: this.tasks[index].editMode,
  //   };

  //   this.todoService.updateTask(updatedTaskId, updatedTask).subscribe(
  //     (updatedTaskResponse: Todo) => {
  //       // Update the tasks array with the updated task from the server
  //       this.tasks[index] = updatedTaskResponse;
  //       this.tasks[index].editMode = false;
  //       console.log('Task updated:', updatedTaskResponse);
  //     },
  //     (error: any) => {
  //       console.error('Error updating task:', error);
  //     }
  //   );
  // }