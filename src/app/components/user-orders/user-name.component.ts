import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-name',
  template: `<h2>{{ name }}</h2>`
})
export class UserNameComponent {
  @Input() name!: string;
}
