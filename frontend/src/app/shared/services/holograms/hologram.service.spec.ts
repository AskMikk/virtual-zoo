import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Hologram } from '../../models/hologram.model';
import { HologramService } from './hologram.service';

describe('HologramService', () => {
  let service: HologramService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HologramService]
    });
    service = TestBed.inject(HologramService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all holograms', () => {
    const testHolograms: Hologram[] = [
      { id: 1, name: 'Test1', weight: 100, superpower: 'Flying', extinctSince: null },
      { id: 2, name: 'Test2', weight: 200, superpower: 'Invisibility', extinctSince: null }
    ];

    service.getHolograms().subscribe(holograms => {
      expect(holograms).toEqual(testHolograms);
    });

    const req = httpMock.expectOne('http://localhost:3000/holograms');
    expect(req.request.method).toBe('GET');
    req.flush(testHolograms);
  });

  it('should create a hologram', () => {
    const newHologram: Hologram = {
      name: 'Test',
      weight: 100,
      superpower: 'Flying',
      extinctSince: null
    };

    service.createHologram(newHologram).subscribe(hologram => {
      expect(hologram).toEqual({ ...newHologram, id: 1 });
    });

    const req = httpMock.expectOne('http://localhost:3000/holograms');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newHologram, id: 1 });
  });

  it('should update a hologram', () => {
    const updatedHologram: Hologram = {
      id: 1,
      name: 'Updated',
      weight: 150,
      superpower: 'Flying',
      extinctSince: null
    };

    service.updateHologram(1, updatedHologram).subscribe(hologram => {
      expect(hologram).toEqual(updatedHologram);
    });

    const req = httpMock.expectOne('http://localhost:3000/holograms/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHologram);
  });

  it('should delete a hologram', () => {
    service.deleteHologram(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:3000/holograms/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
}); 