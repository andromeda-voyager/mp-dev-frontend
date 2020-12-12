import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyInterestsComponent } from './interests.component';


const interestsoutes: Routes = [
  { path: 'my-interests', component: MyInterestsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(interestsoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class MyInterestsRoutingModule { }
