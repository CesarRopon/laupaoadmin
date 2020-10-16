import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TamanioPage } from './tamanio.page';

describe('TamanioPage', () => {
  let component: TamanioPage;
  let fixture: ComponentFixture<TamanioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamanioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TamanioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
