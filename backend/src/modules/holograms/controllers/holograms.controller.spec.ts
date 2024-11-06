import { Test, TestingModule } from '@nestjs/testing';
import { HologramsController } from './holograms.controller';
import { HologramsService } from '../services/holograms.service';
import { mockHologram } from '../test/mock-data';

describe('HologramsController', () => {
  let controller: HologramsController;
  let service: HologramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HologramsController],
      providers: [
        {
          provide: HologramsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockHologram]),
            findOne: jest.fn().mockResolvedValue(mockHologram),
            create: jest.fn().mockImplementation(dto => Promise.resolve({ id: 1, ...dto })),
            update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
            remove: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile();

    controller = module.get<HologramsController>(HologramsController);
    service = module.get<HologramsService>(HologramsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of holograms', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockHologram]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single hologram', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockHologram);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a hologram', async () => {
      const dto = {
        name: 'New',
        weight: 150,
        superpower: 'Invisibility',
        extinctSince: undefined
      };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a hologram', async () => {
      const dto = {
        name: 'Updated',
        weight: 200,
        superpower: 'Flying',
        extinctSince: undefined
      };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a hologram', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
