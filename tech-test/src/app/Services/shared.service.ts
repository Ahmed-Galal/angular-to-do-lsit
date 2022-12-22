import { Injectable } from '@angular/core';
import { Task } from '../shared/Task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  tasks: any = [{
    id: 1,
    label: 'Task1',
    category: 'bureaucracy',
    description: 'description',
    done: ''
  }];

  isadded = false;
  addtoTaskList(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(taskId: number) {
    const taskIndex: any = this.tasks.findIndex((ele: any) => ele.id === taskId);
    this.tasks.splice(taskIndex, 1);
  }
  getTasks() {
    return this.tasks;
  }
  editTask(taskId: number, newData: any) {
    this.tasks.forEach((ele: any) => {
      if (ele.id === taskId) {
        ele.label = newData.label;
        ele.category = newData.category;
        ele.done = newData.done || false;
        ele.description = newData.description;
      }
    });

  }


}
