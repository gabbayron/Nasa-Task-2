import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser'

export interface DialogData {
  image: string;
  title: string,
  type: string
}

@Component({
  selector: 'app-daily-img-dialog',
  templateUrl: './daily-img-dialog.component.html',
  styleUrls: ['./daily-img-dialog.component.css']
})
export class DailyImgDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DailyImgDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.image)

}
