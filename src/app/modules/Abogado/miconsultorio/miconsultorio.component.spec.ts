import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiconsultorioComponent } from './miconsultorio.component';

describe('MiconsultorioComponent', () => {
  let component: MiconsultorioComponent;
  let fixture: ComponentFixture<MiconsultorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiconsultorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiconsultorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
