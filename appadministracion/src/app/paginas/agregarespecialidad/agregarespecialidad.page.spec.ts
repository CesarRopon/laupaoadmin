import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarespecialidadPage } from './agregarespecialidad.page';

describe('AgregarespecialidadPage', () => {
  let component: AgregarespecialidadPage;
  let fixture: ComponentFixture<AgregarespecialidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarespecialidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarespecialidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
