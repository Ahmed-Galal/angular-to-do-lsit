import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, DoCheck } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../deletemodal/deletemodal.component';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, DoCheck {

  constructor(
    public dialog: MatDialog
    // tslint:disable-next-line:align
    , private cd: ChangeDetectorRef
    // tslint:disable-next-line:align
    , private sharedService: SharedService
  ) { }

  displayedColumns: string[] = ['Label', 'Category', 'Description',  'Done', 'Action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() isadded = false;
  @Input() taskList: any;
  taskslength = 0;

  ngOnInit(): void {
    this.GetTasks();

  }

  ngDoCheck() {
    if (this.sharedService.isadded) { this.GetTasks(); }
    this.sharedService.isadded = false;

  }
  GetTasks() {
    const tasks = this.sharedService.getTasks();
    this.taskslength = tasks.length;
    this.dataSource = new MatTableDataSource(tasks);
    this.dataSource.paginator = this.paginator;

    this.cd.markForCheck();

  }
  EditTask(element: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: '500px',
      data: { element, mode: 'Edit' },
    }).afterClosed().subscribe((val: any) => {
      if (val === 'save') {
        this.GetTasks();
      }
    });
  }

  CheckDeleteTask(element: any) {
    this.dialog.open(DeleteDialogComponent, {
      width: '20%',
      data: element,
    }).afterClosed().subscribe((val: any) => {
      if (val === 'delete') {
        this.GetTasks();
      }
    });
  }

}



