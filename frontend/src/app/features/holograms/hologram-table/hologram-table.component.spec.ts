import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HologramTableComponent } from './hologram-table.component';
import { HologramService } from '../../../shared/services/holograms/hologram.service';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

const routes: Routes = [
  { path: 'holograms', component: HologramTableComponent },
];

describe('HologramTableComponent', () => {
  let component: HologramTableComponent;
  let fixture: ComponentFixture<HologramTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HologramTableComponent, HttpClientTestingModule],
      providers: [HologramService, provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(HologramTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
