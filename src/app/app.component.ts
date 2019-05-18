import { Component, OnInit } from '@angular/core';
import { Quiz, Question } from './app.types';
import { QuizService } from './quiz.service';

enum APP_STEPS {
  WELCOME,
  QUIZ_ACTIVE,
  SHOW_SCORE,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  APP_STEPS = APP_STEPS;

  title = 'ADP Quiz App';
  QUESTION_CHANGE_DELAY = 0; // ms

  currentQuestion = 0;
  currentStep = APP_STEPS.WELCOME;
  activeQuiz: Quiz;
  quizzes: Array<Quiz>;
  result: Array<{ question: Question, wasCorrect: boolean }> = [];

  get score(): number {
    return this.result.filter(it => !!it.wasCorrect).length
  }

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(data => this.quizzes = data);
  }

  startQuiz(quiz: Quiz): void {
    this.activeQuiz = quiz;
    this.currentStep = APP_STEPS.QUIZ_ACTIVE;
  }

  submitAnswer(question: Question, index: number): void {
    // user's choosen answer
    const wasCorrect = question.answers[index].value;

    this.result.push({
      question,
      wasCorrect,
    });

    setTimeout(() => {
      // if current question is the last in quiz, show result page
      if (this.currentQuestion === (this.activeQuiz.questions.length - 1)) {
        this.currentStep = APP_STEPS.SHOW_SCORE;
      } else {
        // otherwise show next question after timeout
        this.currentQuestion += 1;
      }
    }, this.QUESTION_CHANGE_DELAY);
  }
}
