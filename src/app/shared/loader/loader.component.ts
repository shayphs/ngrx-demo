import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-wrapper">
      <div class="loader"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent { }
