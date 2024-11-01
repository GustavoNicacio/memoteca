import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CebecalhoComponent } from './cebecalho.component';

describe('CebecalhoComponent', () => {
  let component: CebecalhoComponent;
  let fixture: ComponentFixture<CebecalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CebecalhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CebecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
