import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SharedService} from 'src/app/Services/shared.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder
    // tslint:disable-next-line:align
    , @Inject(MAT_DIALOG_DATA) public editdata: any
    // tslint:disable-next-line:align
    , private toastr: ToastrService
    // tslint:disable-next-line:align
    , private dialogref: MatDialogRef<DialogComponent>
    // tslint:disable-next-line:align
    , private sharedService: SharedService
  ) {
  }

  taskform !: FormGroup;

  allTasksCount = 0;
  CategoryList = [
    {name: 'house'},
    {name: 'bureaucracy'},
  ];
  newId = 0;

  ngOnInit(): void {
    this.taskform = this.formbuilder.group({
      label: ['', Validators.required],
      category: [''],
      description: [''],
      done: ['']
    });

    if (this.editdata.element) {
      this.taskform.controls.label.setValue(this.editdata.element.label);
      this.taskform.controls.category.setValue(this.editdata.element.category);
      this.taskform.controls.description.setValue(this.editdata.element.description);
      this.taskform.controls.done.setValue(this.editdata.element.done);
    }
    this.allTasksCount = this.sharedService.getTasks().length;
  }

  SaveTask() {
    if (this.taskform.valid) {
      // add
      if (this.editdata.mode === 'Add') {
        const obj = this.taskform.value;
        this.newId = Number(new Date());
        this.sharedService.addtoTaskList({...obj, id: this.newId});
        this.sharedService.isadded = true;
        this.taskform.reset();
        this.dialogref.close('save');
      } else if (this.editdata.mode === 'Edit') {
        const obj = this.taskform.value;
        this.sharedService.editTask(this.editdata.element.id, obj);
        this.taskform.reset();
        this.dialogref.close('save');
      }
    } else {
      this.toastr.error('All Fields are required');
    }
  }


}
