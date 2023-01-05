import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {SharedService} from "../../Services/shared.service";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let dialog: MatDialog;
  let sharedService: SharedService;

  let fixture: ComponentFixture<NavbarComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [NavbarComponent],
      providers: [
        DialogComponent,
        SharedService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open dialog when Add button clicked ', () => {
    jest.spyOn(component, 'add');
    jest.spyOn(dialog, 'open');
    component.dialog = dialog;
    const compiled = fixture.nativeElement;
    const addBtn = compiled.querySelector('#add-btn');
    addBtn.click();
    fixture.detectChanges();
    expect(component.add).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalled();

  });

});
