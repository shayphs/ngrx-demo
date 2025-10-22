import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AnimateCountDirective } from './animate-count.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<span [animateCount]="to" [from]="from" [duration]="duration"></span>`
})
class TestHostComponent {
  to = 100;
  from = 0;
  duration = 400;
}

describe('AnimateCountDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let spanEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimateCountDirective, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
  });

  it('should create the directive and element', () => {
    expect(spanEl).toBeTruthy();
  });

  it('should animate from "from" to "to"', fakeAsync(() => {
    fixture.componentInstance.from = 0;
    fixture.componentInstance.to = 100;
    fixture.componentInstance.duration = 200;
    fixture.detectChanges();

    tick(0); // start
    expect(Number(spanEl.textContent?.replace(/,/g, ''))).toBe(0);

    tick(100); // half duration
    const midValue = Number(spanEl.textContent?.replace(/,/g, ''));
    expect(midValue).toBeGreaterThan(0);
    expect(midValue).toBeLessThan(100);

    tick(100); // end
    const endValue = Number(spanEl.textContent?.replace(/,/g, ''));
    expect(endValue).toBe(100);
  }));
});
