import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/Services/shared.service';
@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any
    // tslint:disable-next-line:align
    , private toastr: ToastrService
    // tslint:disable-next-line:align
    , private dialogref: MatDialogRef<DeleteDialogComponent>
    // tslint:disable-next-line:align
    , private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  DeleteTask() {
    this.sharedService.deleteTask(this.editdata.id);
    this.toastr.success('Data Deleted Successfully');
    this.dialogref.close('delete');
  }
}

