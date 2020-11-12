import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyInterestsComponent } from './my-interests.component';


const interestsoutes: Routes = [
  { path: 'my-interests', component: MyInterestsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(interestsoutes)],
  exports: [RouterModule]
})

export class MyInterestsRoutingModule { }
