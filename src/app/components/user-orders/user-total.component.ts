import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user-total',
  template: `<h3 [@totalChange]="total">Total Orders: <span>{{ total }}</span></h3>`,
  styles: [`h3 {
    color: var(--color-secondary);
    font-size: 1.5em;
    font-weight: 400;
    padding: 5px 10px;
    border-radius: 8px;
    display: inline-block;
    background-color: rgba(255, 112, 67, 0.1); /* רקע קוראל עדין */
}
    span {
      font-weight: 600;
      color: var(--color-text-secondary);
    }
  `],
  animations: [
    trigger('totalChange', [
      // מכל ערך קודם לכל ערך חדש (כולל שינוי במספרים)
      transition('* => *', [
        // מצב התחלתי
        style({ transform: 'scale(1)' }),

        // שלב 1: התנפחות ושינוי צבע (כדי להדגיש את ה"קפיצה")
        animate('200ms ease-out', style({
          transform: 'scale(1.02)', // גדילה קלה
        })),

        // שלב 2: חזרה לגודל ולצבע המקורי
        animate('300ms ease-in', style({
          transform: 'scale(1)',
        }))
      ])
    ])
  ]
})
export class UserTotalComponent {
  @Input() total!: number;
}
