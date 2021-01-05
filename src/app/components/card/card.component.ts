import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() explanation: string;
  @Input() url: string;
  @Input() title: string;
  @Input() copyright: string;
  @Input() media_type: string;

  constructor(private dialog: MatDialog, private sanitizer: DomSanitizer) { }

  safeUrl

  showSpinner = true
  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
  }

  showMoreInfo() {
    this.dialog.open(DescriptionDialogComponent, {
      data: {
        explanation: this.explanation,
        title: this.title,
        url: this.url,
        type: this.media_type
      }
    })
  }

}
