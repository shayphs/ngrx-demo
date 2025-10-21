import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-total',
  template: `<h3>Total Orders: {{ total }}</h3>`
})
export class UserTotalComponent {
  @Input() total!: number;
}
