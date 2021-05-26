import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css'],
})
export class InviteDialogComponent implements OnInit {
  name!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: string,
    private dialogRef: MatDialogRef<InviteDialogComponent>
  ) {
    this.name = data;
  }
  ngOnInit(): void {}
  play(): void {
    this.dialogRef.close(true);
  }
  dismiss(): void {
    this.dialogRef.close(false);
  }
}
