import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hologram } from '../../models/hologram.model';

@Injectable({
  providedIn: 'root'
})
export class HologramService {
  private apiUrl = 'http://localhost:3000/holograms';

  constructor(private http: HttpClient) {}

  getHolograms(): Observable<Hologram[]> {
    return this.http.get<Hologram[]>(this.apiUrl);
  }

  getHologram(id: number): Observable<Hologram> {
    return this.http.get<Hologram>(`${this.apiUrl}/${id}`);
  }

  createHologram(hologram: Hologram): Observable<Hologram> {
    return this.http.post<Hologram>(this.apiUrl, hologram);
  }

  updateHologram(id: number, hologram: Hologram): Observable<Hologram> {
    return this.http.put<Hologram>(`${this.apiUrl}/${id}`, hologram);
  }

  deleteHologram(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
