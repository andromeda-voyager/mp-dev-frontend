import { Injectable } from '@angular/core';
import { Book, BookRecommendation } from './book';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const getBooksURL= environment.BASE_API_URL + '/books/search?';
const postRecommendationURL = environment.BASE_API_URL + '/books/recommend';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private bookRecommendedSource = new Subject<Book>();
  recommender: string = "";
  bookRecommended$ = this.bookRecommendedSource.asObservable();

  constructor(private http: HttpClient) { }


  recommendedBook(bookRecommendation: BookRecommendation): Observable<BookRecommendation> {
    this.bookRecommendedSource.next(bookRecommendation.book);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<BookRecommendation>(postRecommendationURL, bookRecommendation, httpOptions)
      .pipe(
        catchError(this.handleError('submit recommendations', bookRecommendation))
      );
  }

  searchBooks(searchQuery: string): Observable<Book[]> {
    return this.http.get<Book[]>(getBooksURL + searchQuery)
      .pipe(
        tap(_ => console.log('search sent to the server')),
        catchError(this.handleError<Book[]>('searchBooks', []))
      );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

