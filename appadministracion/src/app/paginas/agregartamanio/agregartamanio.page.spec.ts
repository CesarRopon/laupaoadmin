import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregartamanioPage } from './agregartamanio.page';

describe('AgregartamanioPage', () => {
  let component: AgregartamanioPage;
  let fixture: ComponentFixture<AgregartamanioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregartamanioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregartamanioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
