import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContestacionPage } from './contestacion.page';

describe('ContestacionPage', () => {
  let component: ContestacionPage;
  let fixture: ComponentFixture<ContestacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContestacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
