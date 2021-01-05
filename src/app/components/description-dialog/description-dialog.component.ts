import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailyImgDialogComponent } from '../daily-img-dialog/daily-img-dialog.component';

export interface DialogData {
  explanation: string;
  title: string;
  url: string,
  type: string
}

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.css']
})
export class DescriptionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  showFullImage() {
    this.dialog.open(DailyImgDialogComponent, {
      data: {
        image: this.data.url,
        title: this.data.title,
        type: this.data.type,

      }
    })
  }

}
