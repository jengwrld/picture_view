import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-album-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.css']
})
export class PictureDetailComponent implements OnInit {

  title: any = '';
  comment: string = '';

  constructor(public dialogRef: MatDialogRef<PictureDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.title = data.picture.title;
    this.comment = data.picture.comment;
  }

  ngOnInit(): void {
  }

  save() {
    // @ts-ignore
    const albumJSON = JSON.parse(localStorage.getItem('albumJSON'));
    const albumIndex = this.data.picture.albumIndex;
    const pictureIndex = this.data.picture.pictureIndex;
    albumJSON[albumIndex].pictures[pictureIndex].title = this.title;
    albumJSON[albumIndex].pictures[pictureIndex].comment = this.comment;
    localStorage.setItem('albumJSON', JSON.stringify(albumJSON));
    this.dialogRef.close(true);
  }

}
