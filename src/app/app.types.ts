export interface Quiz {
  title: string;
  questions: Array<Question>;
}

export interface Question {
  question: string;
  answers: Array<{ content: string, value: boolean }>;
}
