import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoPage } from './tipo.page';

describe('TipoPage', () => {
  let component: TipoPage;
  let fixture: ComponentFixture<TipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
