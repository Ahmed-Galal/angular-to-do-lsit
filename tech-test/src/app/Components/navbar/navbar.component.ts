import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedService } from 'src/app/Services/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private sharedService: SharedService) { }
  @Output()
  readonly DarkModeSwitched = new EventEmitter<boolean>();
  isadded = false;
  @Input() taskList: any;

  @Output() saved = new EventEmitter<boolean>();


  ngOnInit(): void {
  }
  DarkModeToggle({ checked }: MatSlideToggleChange) {
    this.DarkModeSwitched.emit(checked);
  }
  add(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      height: '500px',
      data: { data: this.taskList, mode: 'Add' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.isadded = true;
        this.sharedService.isadded = true;
        this.saved.emit(this.isadded);

      }
    });
  }



}
