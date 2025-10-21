import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[animateCount]',
  standalone: true // If using standalone components; otherwise, add to NgModule.
})
export class AnimateCountDirective implements OnChanges, OnDestroy {
  @Input() to: number = 0; // Target value
  @Input() from: number = 0; // Starting value (optional, defaults to 0)
  @Input() duration: number = 400; // ms
  @Input() steps: number = 21; // Number of steps for smoothness

  private currentValue: number = 0;
  private animationFrameId: number | null = null;
  private startTime: number | null = null;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['to'] && this.to !== undefined) {
      this.from = changes['to'].isFirstChange() ? this.from : this.currentValue; // Start from current on updates
      if (this.from === this.to) return;
      this.cancelAnimation(); // Stop any ongoing animation
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    this.startTime = performance.now();
    this.animate();
  }

  private animate(): void {
    if (!this.startTime) return;

    const elapsed = performance.now() - this.startTime;
    const t = Math.min(elapsed / this.duration, 1); // t between 0 and 1
    const easedT = 0.5 - Math.cos(t * Math.PI) / 2; // Your sinusoidal easing

    this.currentValue = this.from + (this.to - this.from) * easedT;
    this.updateElement();

    if (t < 1) {
      this.animationFrameId = requestAnimationFrame(() => this.animate());
    } else {
      this.currentValue = this.to; // Ensure exact end value
      this.updateElement();
      this.cancelAnimation();
    }
  }

  private updateElement(): void {
    this.el.nativeElement.textContent = Math.round(this.currentValue).toLocaleString(); // Or use your number pipe logic
  }

  private cancelAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.startTime = null;
  }

  ngOnDestroy(): void {
    this.cancelAnimation();
  }
}