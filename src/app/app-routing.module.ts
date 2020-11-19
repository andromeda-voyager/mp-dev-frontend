import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyInterestsComponent } from './my-interests/my-interests.component';
import { HomeComponent } from './home/home.component';
import { RecommendBooksComponent } from './recommend-books/recommend-books.component';

const routes: Routes = [
  { path: 'hobbies-and-interests', component: MyInterestsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recommend-books', component: RecommendBooksComponent },
  { path: '', redirectTo: '/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }