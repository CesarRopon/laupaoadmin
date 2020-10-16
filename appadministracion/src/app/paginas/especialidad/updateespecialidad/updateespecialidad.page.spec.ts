import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateespecialidadPage } from './updateespecialidad.page';

describe('UpdateespecialidadPage', () => {
  let component: UpdateespecialidadPage;
  let fixture: ComponentFixture<UpdateespecialidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateespecialidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateespecialidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
