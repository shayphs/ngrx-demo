import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
  <article class="card">
      <div>
          <ng-content></ng-content>
      </div>
  </article>
  `,
  styleUrls: ['./card.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent { }
