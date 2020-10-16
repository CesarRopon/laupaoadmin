import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuprincipalPage } from './menuprincipal.page';

describe('MenuprincipalPage', () => {
  let component: MenuprincipalPage;
  let fixture: ComponentFixture<MenuprincipalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuprincipalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuprincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
