import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {PictureDetailComponent} from "./picture-detail/picture-detail.component";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'album-detail', component: PictureDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
