// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TaskListComponent } from './task-list.component';

// describe('TaskListComponent', () => {
//   let component: TaskListComponent;
//   let fixture: ComponentFixture<TaskListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [TaskListComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(TaskListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule
import { TaskListComponent } from './task-list.component';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';

fdescribe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    todoService = jasmine.createSpyObj('TodoService', ['deleteTask', 'updateTask']);

    TestBed.configureTestingModule({
    //   declarations: [TaskListComponent],
      imports: [FormsModule, MatButtonModule, MatTableModule, BrowserAnimationsModule,TaskListComponent, NoopAnimationsModule],
      providers: [{ provide: TodoService, useValue: todoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTask when delete button is clicked', () => {
    const index = 0;

    // Mock the deleteTask method in the service
    todoService.deleteTask.and.returnValue(of(undefined));

    // Trigger the deleteTask method
    component.deleteTask(index);

    // Check if the deleteTask method is called with the correct arguments
    expect(todoService.deleteTask).toHaveBeenCalledWith(component.tasks[index].id);
  });

  it('should call updateTask when save button is clicked', () => {
    const index = 0;

    // Mock the updateTask method in the service
    todoService.updateTask.and.returnValue(of(component.tasks[index]));

    // Trigger the saveTask method
    component.saveTask(index);

    // Check if the updateTask method is called with the correct arguments
    expect(todoService.updateTask).toHaveBeenCalledWith(component.tasks[index].id, component.tasks[index]);
  });

  it('should toggle edit mode when edit button is clicked', () => {
    const index = 0;

    // Initial editMode should be false
    expect(component.tasks[index].editMode).toBeFalsy();

    // Trigger the toggleEditMode method
    component.toggleEditMode(index);

    // After toggle, editMode should be true
    expect(component.tasks[index].editMode).toBeTruthy();
  });

  it('should toggle task completion when mark completed button is clicked', () => {
    const index = 0;

    // Initial completed status should be false
    expect(component.tasks[index].completed).toBeFalsy();

    // Trigger the markCompleted method
    component.markCompleted(index);

    // After toggle, completed status should be true
    expect(component.tasks[index].completed).toBeTruthy();
  });
});




// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule } from '@angular/material/table';
// import { EventEmitter } from '@angular/core';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// import { TaskListComponent } from './task-list.component';

// describe('TaskListComponent', () => {
//   let component: TaskListComponent;
//   let fixture: ComponentFixture<TaskListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [FormsModule, MatButtonModule, MatTableModule, NoopAnimationsModule],
//       declarations: [TaskListComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TaskListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should toggle edit mode when toggleEditMode is called', () => {
//     const index = 0;
//     const initialEditMode = component.tasks[index].editMode;

//     component.toggleEditMode(index);

//     expect(component.tasks[index].editMode).toBe(!initialEditMode);
//   });

//   it('should update task when saveTask is called', () => {
//     const index = 0;
//     const initialTask = { ...component.tasks[index] };
//     const updatedTask = { ...initialTask, title: 'Updated Task' };

//     spyOn(component.todoService, 'updateTask').and.returnValue(of(updatedTask));

//     component.saveTask(index);

//     expect(component.tasks[index]).toEqual(updatedTask);
//     expect(component.tasks[index].editMode).toBe(false);
//   });

//   it('should mark task as completed when markCompleted is called', () => {
//     const index = 0;
//     const initialCompleted = component.tasks[index].completed;

//     component.markCompleted(index);

//     expect(component.tasks[index].completed).toBe(!initialCompleted);
//   });

//   it('should delete task when deleteTask is called', () => {
//     const index = 0;
//     const deletedTask = component.tasks[index];
//     spyOn(component.todoService, 'deleteTask').and.returnValue(of(undefined));

//     component.deleteTask(index);

//     expect(component.tasks).not.toContain(deletedTask);
//   });
// });
