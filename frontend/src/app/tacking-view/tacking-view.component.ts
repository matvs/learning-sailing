import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { AnswersComponent } from '../answers/answers.component';

@Component({
  selector: 'app-tacking-view',
  templateUrl: './tacking-view.component.html',
  styleUrl: './tacking-view.component.scss',
  standalone: true,
  imports: [PanelModule, ButtonModule, CommonModule, AnswersComponent]
})
export class TackingViewComponent implements OnInit {
  currentQuestionIndex = 0;
  currentAnswerIndex = 0;
  wrongAnswers: any[] = [];
  correctAnswers: any[] = [];
  questions: any[] = [
  {id: 1,question: 'Komendy przy zwrocie przez sztag', answer: [
    '„Przygotować do zwrotu przez sztag”',
    '„Sztag”',
    '„Lewy foka szot luzuj”',
    '„Prawy foka szot wybieraj”',
  ]},
  {id:2, question: 'Komendy przy zwrocie przez rufe', answer: [
    '„Przygotować do zwrotu przez Rufe',
    'Rufa',
    '„Lewy foka szot luz”',
    '„Prawy foka szot wybierz”',
  ]},
  {id:3, question: 'Jak nazywa sie lodka z dwoma zaglami', answer: 'Slup'},
  ]

  ngOnInit(): void {
    this.questions = this.shuffle(this.questions);
    for(const question of this.questions) {
      if (Array.isArray(question.answer)) {
        question.displayedAnswers = []
        for (const answer of question.answer) {
          question.displayedAnswers.push(this.getAnswersPlusRandomAnswers(4, question, question.answer.indexOf(answer)));
        }
      } else {
        question.displayedAnswers = this.getAnswersPlusRandomAnswers(4, question);
      }
      
    }
  }

  getNRandomAnswers(n: number, exclude: any[]): any[] {
    const answers = this.getAllAnswers(this.questions);
    const randomAnswers: any[] = [];
    let i = 0;
    while (i < n) {
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      if (!exclude.includes(randomAnswer) && !randomAnswers.includes(randomAnswer)) {
        randomAnswers.push(randomAnswer);
        i++;
      }
    }

    return randomAnswers;
  
  }

  getAnswersPlusRandomAnswers(n: number, question: any, index = 0): any[] {
    let randomAnswers;
    let answers;
    if (Array.isArray(question.answer)) {
      randomAnswers = this.getNRandomAnswers(n, [question.answer[index]]);
      answers = randomAnswers.concat([question.answer[index]]);
    } else {
      randomAnswers = this.getNRandomAnswers(n, [question.answer]);
      answers = randomAnswers.concat([question.answer]);
    }

    return this.shuffle(answers);
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  getAllAnswers(questions: any[]): any[] {
    const answers: any[] = [];
    for (const question of questions) {
      if (Array.isArray(question.answer)) {
        for (const answer of question.answer) {
          answers.push(answer);
        }
      } else {
        answers.push(question.answer);
      }
      
    }
    return answers;
  }

  getQuestionById(id: number): any {
    return this.questions.find(question => question.id === id);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  onAnswerClick(answer: any): void {
    const question = this.questions[this.currentQuestionIndex];
    if (Array.isArray(question.answer)) {
      if (question.answer[this.currentAnswerIndex] === answer) {
        this.correctAnswers.push(answer);
        this.currentAnswerIndex++;
        this.wrongAnswers = []
        if (this.currentAnswerIndex === question.answer.length) {
          this.currentAnswerIndex--;
        }
      } else {
        this.wrongAnswers.push(answer);
      }
    } else {
      if (question.answer === answer) {
        this.correctAnswers.push(answer);
        this.wrongAnswers = []
      } else {
        this.wrongAnswers.push(answer);
      }
    }
  }

  getAllIds(): number[] {
    return this.questions.map(question => question.id);
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    this.currentAnswerIndex = 0;
    this.wrongAnswers = []
  }
}
