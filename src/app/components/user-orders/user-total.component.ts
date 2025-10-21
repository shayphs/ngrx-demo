import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-total',
  template: `<h3>Total Orders: {{ total }}</h3>`,
  styles: [`h3 {
    color: var(--color-secondary);
    font-size: 1.5em;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 8px;
    display: inline-block;
    background-color: rgba(255, 112, 67, 0.1); /* רקע קוראל עדין */
}`],
})
export class UserTotalComponent {
  @Input() total!: number;
}
