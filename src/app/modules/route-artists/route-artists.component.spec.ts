import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteArtistsComponent } from './route-artists.component';

describe('RouteArtistsComponent', () => {
  let component: RouteArtistsComponent;
  let fixture: ComponentFixture<RouteArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteArtistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
