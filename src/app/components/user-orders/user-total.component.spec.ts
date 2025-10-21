import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserTotalComponent } from './user-total.component';
import { By } from '@angular/platform-browser';

describe('UserTotalComponent', () => {
  let component: UserTotalComponent;
  let fixture: ComponentFixture<UserTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTotalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with count = 0', () => {
    expect(component.count).toBe(0);
  });

  it('should animate count when total changes', fakeAsync(() => {
    component.total = 100;
    component.ngOnChanges({
      total: {
        currentValue: 100,
        previousValue: 0,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    tick(250); // מחכים חצי זמן (בערך)
    expect(component.count).toBeGreaterThan(0);
    expect(component.count).toBeLessThan(100);

    tick(300); // הזמן הכולל של האנימציה הוא 500ms
    expect(component.count).toBe(100);
  }));

  it('should not animate if total stays the same', fakeAsync(() => {
    component.count = 50;
    component.total = 50;
    const unsubscribeSpy = spyOn(component, 'ngOnDestroy').and.callThrough();

    component.ngOnChanges({
      total: {
        currentValue: 50,
        previousValue: 50,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.count).toBe(50);
    tick(1000); // גם אחרי זמן, הערך לא משתנה
    expect(component.count).toBe(50);
    expect(unsubscribeSpy).not.toHaveBeenCalled();
  }));

  it('should unsubscribe on destroy', () => {
    component.total = 100;
    component.ngOnChanges({
      total: {
        currentValue: 100,
        previousValue: 0,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    const unsubSpy = spyOn(component['animationSub']!, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });

  it('should render the current count in template', fakeAsync(() => {
    component.total = 50;
    component.ngOnChanges({
      total: {
        currentValue: 50,
        previousValue: 0,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    tick(500);
    fixture.detectChanges();

    const spanEl = fixture.debugElement.query(By.css('.total-count')).nativeElement;
    expect(spanEl.textContent).toContain('50');
  }));
});
