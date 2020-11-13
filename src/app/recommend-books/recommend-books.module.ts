import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendBooksComponent } from './recommend-books.component';
import { BookComponent } from './book/book.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core';
import { BookSearchComponent } from './book-search/book-search.component';
import { SearchResultsComponent } from './search-results/search-results.component'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    RecommendBooksComponent,
    BookComponent,
    RecommendedComponent, BookSearchComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatRippleModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class RecommendBooksModule { }
