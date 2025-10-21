import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-name',
  template: `<h2>{{ name }}</h2>`,
  styles: [`
    h2 {
    color: var(--color-text-dark);
    font-size: 2em;
    margin: 0 0 5px 0;
}`],
})
export class UserNameComponent {
  @Input() name!: string;
}
