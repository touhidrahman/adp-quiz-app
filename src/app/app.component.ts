import { Component, OnInit } from '@angular/core';
import { Quiz } from './app.types';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adp-quiz-app';

  quizzes: Array<Quiz>

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(data => this.quizzes = data);
  }
}
