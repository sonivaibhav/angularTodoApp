import {TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Todo App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Todo App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.export-to-csv')?.textContent).toContain('Export to CSV');
  });

  it('should call addTask', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const addButton: HTMLElement = fixture.nativeElement.querySelector('.add-button');
    spyOn(app, 'addTask');
    addButton.click();
    fixture.whenStable().then(() => {
      expect(app.addTask).toHaveBeenCalled();
    });
  });

  it('should reset form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const addButton: HTMLElement = fixture.nativeElement.querySelector('.add-button');
    spyOn(app, 'addTask');
    addButton.click();
    fixture.whenStable().then(() => {
      expect(app.resetForm).toHaveBeenCalled();
    });
  });
});
