import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Quiz, Question } from './app.types';

const API_URL = environment.apiUrl + '/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Array<Quiz>> {
    return this.http.get<Array<Quiz>>(API_URL);
  }
}
