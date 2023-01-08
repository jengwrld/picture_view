import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  pictures: any[] = [];
  selectedIndex = 0;
  constructor(public dialogRef: MatDialogRef<SlideshowComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.pictures = data.selectedPictures.map((pic: any) => pic.imagePath);
    console.log(this.pictures);
  }

  ngOnInit(): void {
  }

}
