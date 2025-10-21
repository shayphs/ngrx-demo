import { Component, Input, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-total',
  template: `<h3>Total Orders: <span class="total-count">{{ count | number: '1.0-0' }}</span></h3>`,
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
      display: inline-block;
      width: 100px;
      font-weight: 600;
      color: var(--color-text-secondary);
    }
  `],
})
export class UserTotalComponent {
  @Input() total!: number;

    // 'count' מחזיק את הערך המונפש שמוצג למשתמש
  count: number = 0;
  private animationSub: Subscription | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total'] && this.total !== undefined) {
      
      // עוצר כל אנימציה קודמת שעדיין רצה
      if (this.animationSub) {
        this.animationSub.unsubscribe();
      }

      // הגדרת פרמטרים
      // מתחילים מהערך המוצג כרגע
      const start = this.count; 
      const end = this.total;
      
      if (start === end) {
        return;
      }

      // פרמטרי האנימציה
      const duration = 500; // משך זמן האנימציה (באלפיות שנייה)
      const steps = 30; // מספר הצעדים של האנימציה
      const stepDuration = duration / steps;
      const changePerStep = (end - start) / steps;

      let currentStep = 0;

      // הפעלת לולאת הספירה באמצעות interval מ-RxJS
      this.animationSub = interval(stepDuration).subscribe(() => {
        currentStep++;
        
        // חישוב הערך הנוכחי באמצעות פונקציית Easing (מעבר חלק)
        // Easing: שימוש ב-sinusoidal easing (כדי שהספירה תהיה רכה יותר בהתחלה ובסוף)
        const t = currentStep / steps; // t בין 0 ל-1
        const easedT = 0.5 - Math.cos(t * Math.PI) / 2; // EaseInOut effect
        
        this.count = start + (end - start) * easedT;

        if (currentStep >= steps) {
          // מגיע לסוף: מוודא שהערך הסופי מדויק ומפסיק את ה-interval
          this.count = end;
          this.animationSub!.unsubscribe();
          this.animationSub = undefined;
        }
      });
    }
  }

  ngOnDestroy(): void {
    // מונע דליפת זיכרון
    if (this.animationSub) {
      this.animationSub.unsubscribe();
    }
  }
}
