import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent {
  @Input()
  question: any;
  @Input()
  currentAnswerIndex: number = 0;
  @Input()
  wrongAnswers: any[] = [];
  @Output()
  answerClick = new EventEmitter<any>();

  isArray(value: any): boolean {
    return Array.isArray(value);
  }


}
