import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HologramService } from '../../../shared/services/holograms/hologram.service';
import { Hologram } from '../../../shared/models/hologram.model';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-hologram-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationsComponent,
  ],
  templateUrl: './hologram-form.component.html',
})
export class HologramFormComponent implements OnInit {
  hologramForm: FormGroup;
  isEditMode = false;
  hologramId?: number;

  constructor(
    private fb: FormBuilder,
    private hologramService: HologramService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    this.hologramForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      superpower: ['', Validators.required],
      extinctSince: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.hologramId = +id;
      this.loadHologram(this.hologramId);
    }
  }

  loadHologram(id: number): void {
    this.hologramService.getHologram(id).subscribe((hologram) => {
      this.hologramForm.patchValue({
        name: hologram.name,
        weight: hologram.weight,
        superpower: hologram.superpower,
        extinctSince: hologram.extinctSince,
      });
    });
  }

  onSubmit(): void {
    if (this.hologramForm.valid) {
      const formValue = this.hologramForm.value;
      const hologramData: Hologram = {
        name: formValue.name,
        weight: formValue.weight,
        superpower: formValue.superpower,
        extinctSince: formValue.extinctSince ? formValue.extinctSince : null,
      };

      if (this.isEditMode && this.hologramId) {
        this.hologramService
          .updateHologram(this.hologramId, hologramData)
          .subscribe({
            next: () => {
              this.router.navigate(['/holograms']);
              this.notificationService.show(
                'Hologram updated successfully',
                'success',
              );
            },
            error: (error) => {
              console.error('Error updating hologram:', error);
              this.notificationService.show('Error updating hologram', 'info');
            },
          });
      } else {
        this.hologramService.createHologram(hologramData).subscribe({
          next: () => {
            this.router.navigate(['/holograms']);
            this.notificationService.show(
              'Hologram created successfully',
              'success',
            );
          },
          error: (error) => {
            console.error('Error creating hologram:', error);
            this.notificationService.show('Error creating hologram', 'info');
          },
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/holograms']);
  }

  get nameErrors() {
    const control = this.hologramForm.get('name');
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Name is required';
      }
      if (control.errors['minlength']) {
        return 'Name must be at least 2 characters long';
      }
    }
    return null;
  }

  get weightErrors() {
    const control = this.hologramForm.get('weight');
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Weight is required';
      }
      if (control.errors['min']) {
        return 'Weight cannot be negative';
      }
    }
    return null;
  }

  get superpowerErrors() {
    const control = this.hologramForm.get('superpower');
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Superpower is required';
      }
    }
    return null;
  }
}
