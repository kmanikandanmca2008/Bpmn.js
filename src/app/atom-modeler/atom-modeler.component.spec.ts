import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomModelerComponent } from './atom-modeler.component';

describe('AtomModelerComponent', () => {
  let component: AtomModelerComponent;
  let fixture: ComponentFixture<AtomModelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtomModelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomModelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
