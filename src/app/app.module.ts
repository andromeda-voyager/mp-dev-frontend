import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyInterestsModule } from 'src/app/my-interests/my-interests.module';
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ChessModule } from 'src/app/chess/chess.module';
import { RecommendBooksModule } from 'src/app/recommend-books/recommend-books.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyInterestsModule,
    ChessModule,
    MatRippleModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    RecommendBooksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
