import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HologramService } from '../../../shared/services/holograms/hologram.service';
import { Hologram } from '../../../shared/models/hologram.model';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-hologram-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NotificationsComponent,
    ThemeToggleComponent,
    PipesModule,
  ],
  templateUrl: './hologram-table.component.html',
})
export class HologramTableComponent implements OnInit {
  isLoading: boolean = true;
  holograms: Hologram[] = [];
  filteredHolograms: Hologram[] = [];
  searchTerm: string = '';
  sortField: keyof Hologram = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  tableHeaders: (keyof Hologram)[] = [
    'name',
    'weight',
    'superpower',
    'extinctSince',
  ];
  selectedHologram?: Hologram;

  constructor(
    private notificationService: NotificationService,
    private hologramService: HologramService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadHolograms();
  }

  loadHolograms() {
    this.hologramService.getHolograms().subscribe(
      (data) => {
        this.holograms = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error loading holograms:', error);
      },
    );
  }

  deleteHologram(id: number) {
    this.hologramService.deleteHologram(id).subscribe(() => {
      this.loadHolograms();
      this.notificationService.show('Hologram successfully removed!', 'delete');
    });
  }

  applyFilters() {
    this.filteredHolograms = this.holograms.filter((hologram) =>
      Object.values(hologram).some((value) =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase()),
      ),
    );
    this.sortHolograms();
  }

  sortHolograms() {
    this.filteredHolograms.sort((a, b) => {
      const aValue = a[this.sortField] ?? '';
      const bValue = b[this.sortField] ?? '';

      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }

  toggleSort(header: keyof Hologram) {
    if (this.sortField === header) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = header;
      this.sortDirection = 'asc';
    }
    this.sortHolograms();
  }

  createHologram(): void {
    this.router.navigate(['/holograms/create']);
  }

  onSubmitHologram(hologram: Partial<Hologram>): void {
    if (this.selectedHologram) {
      this.hologramService
        .updateHologram(this.selectedHologram.id!, hologram as Hologram)
        .subscribe(() => {
          this.loadHolograms();
          this.selectedHologram = undefined;
        });
    } else {
      this.hologramService
        .createHologram(hologram as Hologram)
        .subscribe(() => {
          this.loadHolograms();
          this.selectedHologram = undefined;
        });
    }
  }

  onCancelForm(): void {
    this.selectedHologram = undefined;
  }

  editHologram(id: number): void {
    this.router.navigate(['/holograms/edit', id]);
  }

  getStatistics() {
    if (!this.holograms.length) return null;

    const heaviest = this.holograms.reduce((prev, current) =>
      prev.weight > current.weight ? prev : current,
    );

    const extinctDates = this.holograms
      .filter((h) => h.extinctSince)
      .map((h) => new Date(h.extinctSince!));

    const extinctTimestamps = extinctDates.map((date) => date.getTime());

    const mostRecent = extinctDates.length
      ? this.holograms.find(
          (h) =>
            new Date(h.extinctSince!).getTime() ===
            Math.max(...extinctTimestamps),
        )
      : null;
    const oldest = extinctDates.length
      ? this.holograms.find(
          (h) =>
            new Date(h.extinctSince!).getTime() ===
            Math.min(...extinctTimestamps),
        )
      : null;

    return {
      total: this.holograms.length,
      heaviest,
      mostRecent,
      oldest,
    };
  }

  getDefaultValue(value: any, defaultValue: any): any {
    return value ?? defaultValue;
  }
}
