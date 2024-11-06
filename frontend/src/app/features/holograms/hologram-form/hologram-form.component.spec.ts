import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HologramFormComponent } from './hologram-form.component';
import { HologramService } from '../../../shared/services/holograms/hologram.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

describe('HologramFormComponent', () => {
  let component: HologramFormComponent;
  let fixture: ComponentFixture<HologramFormComponent>;
  let hologramService: jasmine.SpyObj<HologramService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const hologramSpy = jasmine.createSpyObj('HologramService', [
      'getHologram',
      'createHologram',
      'updateHologram',
    ]);
    const notificationSpy = jasmine.createSpyObj('NotificationService', [
      'show',
    ]);

    await TestBed.configureTestingModule({
      imports: [HologramFormComponent, ReactiveFormsModule],
      providers: [
        provideRouter([
          { path: 'holograms', component: HologramFormComponent },
          { path: 'holograms/:id', component: HologramFormComponent },
        ]),
        { provide: HologramService, useValue: hologramSpy },
        { provide: NotificationService, useValue: notificationSpy },
      ],
    }).compileComponents();

    hologramService = TestBed.inject(
      HologramService,
    ) as jasmine.SpyObj<HologramService>;
    notificationService = TestBed.inject(
      NotificationService,
    ) as jasmine.SpyObj<NotificationService>;

    fixture = TestBed.createComponent(HologramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.hologramForm.get('name')?.value).toBe('');
    expect(component.hologramForm.get('weight')?.value).toBe('');
    expect(component.hologramForm.get('superpower')?.value).toBe('');
    expect(component.hologramForm.get('extinctSince')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.hologramForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('Test');
    form.controls['weight'].setValue(100);
    form.controls['superpower'].setValue('Flying');

    expect(form.valid).toBeTruthy();
  });

  it('should validate minimum name length', () => {
    const nameControl = component.hologramForm.controls['name'];
    nameControl.setValue('A');
    expect(nameControl.errors?.['minlength']).toBeTruthy();

    nameControl.setValue('Ab');
    expect(nameControl.errors).toBeNull();
  });

  it('should validate minimum weight', () => {
    const weightControl = component.hologramForm.controls['weight'];
    weightControl.setValue(-1);
    expect(weightControl.errors?.['min']).toBeTruthy();

    weightControl.setValue(0);
    expect(weightControl.errors).toBeNull();
  });

  it('should call createHologram on submit in create mode', () => {
    const testHologram = {
      name: 'Test',
      weight: 100,
      superpower: 'Flying',
      extinctSince: null,
    };

    hologramService.createHologram.and.returnValue(of(testHologram));

    component.hologramForm.patchValue(testHologram);
    component.onSubmit();

    expect(hologramService.createHologram).toHaveBeenCalledWith(testHologram);
    expect(notificationService.show).toHaveBeenCalledWith(
      'Hologram created successfully',
      'success',
    );
  });
});
