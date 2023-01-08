import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PictureDetailComponent} from "./picture-detail/picture-detail.component";
import {SlideshowComponent} from "./slideshow/slideshow.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _jsonURL = 'assets/app-data/library/picture-library.json';

  title = 'picture-viewer';
  albums: any[] = [];
  selectedAlbum: any;
  selectedAlbumIndex: number | undefined;
  selectedPictures: any[] = [];

  constructor(private http: HttpClient,
              private _router: Router,
              private _cd: ChangeDetectorRef,
              private dialog: MatDialog) {
    const albumJSON = localStorage.getItem('albumJSON');
    if (!albumJSON) {
      this.getJSON().subscribe(data => {
        this.albums = data.albums;
        localStorage.setItem('albumJSON', JSON.stringify(this.albums));
      });
    } else {
      this.albums = JSON.parse(albumJSON);
    }
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  selectPicture(picture: any, imagePath: any) {
    if (!picture.selected) {
      picture.selected = true;
      picture.imagePath = imagePath;
      this.selectedPictures.push(picture);
    } else {
      picture.selected = false;
      this.selectedPictures = this.selectedPictures.filter(pic => pic.id !== picture.id);
    }

    console.log(this.selectedPictures);

  }

  openPictureDetailView(picture: any, imagePath: any, pictureIndex: number) {
    console.log(picture);
    picture.imagePath = imagePath;
    picture.albumIndex = this.selectedAlbumIndex;
    picture.pictureIndex = pictureIndex;
    this.dialog.open(PictureDetailComponent, {
      data: {picture}
    }).afterClosed().subscribe(saved => {
      if (saved) {
        // @ts-ignore
        this.albums = JSON.parse(localStorage.getItem('albumJSON'));
        // @ts-ignore
        this.selectedAlbum = this.albums[this.selectedAlbumIndex];
        this._cd.detectChanges();
      }
    });
  }

  showSlideShow() {
    this.dialog.open(SlideshowComponent, {
      data: {selectedPictures: this.selectedPictures}
    });
  }

}
