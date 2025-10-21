import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNameComponent } from './user-name.component';
import { By } from '@angular/platform-browser';

describe('UserNameComponent', () => {
  let component: UserNameComponent;
  let fixture: ComponentFixture<UserNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNameComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input name', () => {
    component.name = 'Shay';
    fixture.detectChanges(); // חשוב לעדכן את התצוגה
    const h2 = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2.textContent).toBe('Shay');
  });
});
