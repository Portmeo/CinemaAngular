import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, ReplaySubject } from 'rxjs';

import { LayoutComponent } from './layout.component';
import db from '@assets/mocks/db.json';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let store: MockStore;
  const initialState = {
    errors: {
      message: 'testing',
      code: 0
    },
    actors: {
      list: db.actors
    },
    companies: {
      list: db.companies
    },
    movies: {
      list: db.movies
    },
    layout: {
      title: 'test'
    }
  };
  let methodSpy: jasmine.Spy;
  const enventSubject = new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: enventSubject.asObservable(),
    url: 'test/url'
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    methodSpy = spyOn(component, 'showMenuButton');
    fixture.detectChanges();
  });

  it('should create', () => {
    enventSubject.next(new NavigationEnd(1, 'regular', 'redirectUrl'));
    expect(component).toBeTruthy();
  });

  it('should getErrors', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    component.getErrors();
  });

});
