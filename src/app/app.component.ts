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
  QUESTION_CHANGE_DELAY = 2000; // ms

  currentStep = APP_STEPS.WELCOME;
  currentQuestion = 0;
  currentCorrectAnswer = -1;
  currentSelectedAnswer = -1;
  loading = false;
  activeQuiz: Quiz;
  quizzes: Array<Quiz>;
  result: Array<{ question: Question, wasCorrect: boolean }> = [];

  get score(): number {
    return this.result.filter(it => !!it.wasCorrect).length
  }

  get passed(): boolean {
    const minAnsNeedToBeCorrect = Math.ceil(this.activeQuiz.questions.length / 2);
    return this.score >= minAnsNeedToBeCorrect;
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
    this.loading = true;
    this.currentSelectedAnswer = index;

    // user's choosen answer, value says correct or not
    const wasCorrect = question.answers[index].value;

    // to highlight correct answer
    if (wasCorrect) {
      this.currentCorrectAnswer = index;
    } else {
      this.currentCorrectAnswer = question.answers.indexOf(
        question.answers.filter(it => !!it.value)[0]
      );
    }

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

      this.reset();

    }, this.QUESTION_CHANGE_DELAY);
  }

  startOver(): void {
    this.reset();
    this.activeQuiz = null;
    this.result = [];
    this.currentQuestion = 0;
    this.currentStep = APP_STEPS.WELCOME;
  }

  private reset(): void {
    this.loading = false;
    this.currentCorrectAnswer = -1;
    this.currentSelectedAnswer = -1;
  }
}
