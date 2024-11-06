import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HologramsService } from './holograms.service';
import { Hologram } from '../entities/hologram.entity';
import { mockHologram } from '../test/mock-data';

const mockHologramRepository = {
  find: jest.fn().mockResolvedValue([mockHologram]),
  findOneBy: jest.fn().mockResolvedValue(mockHologram),
  save: jest
    .fn()
    .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
};

describe('HologramsService', () => {
  let service: HologramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HologramsService,
        {
          provide: getRepositoryToken(Hologram),
          useValue: mockHologramRepository,
        },
      ],
    }).compile();

    service = module.get<HologramsService>(HologramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all holograms', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockHologram]);
    expect(mockHologramRepository.find).toHaveBeenCalled();
  });

  it('should find one hologram', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockHologram);
    expect(mockHologramRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a hologram', async () => {
    const dto = {
      name: 'New',
      weight: 150,
      superpower: 'Invisibility',
      extinctSince: undefined,
    };
    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockHologramRepository.save).toHaveBeenCalledWith(dto);
  });
});
