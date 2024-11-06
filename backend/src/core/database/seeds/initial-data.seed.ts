import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Hologram } from '../../../modules/holograms/entities/hologram.entity';

export class InitialDataSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(Hologram);

    const initialHolograms = [
      {
        name: 'Tyrannosaurus Rex',
        weight: 7000,
        superpower: 'Super Strength',
        extinctSince: new Date('0001-01-01'),
      },
      {
        name: 'Dodo Bird',
        weight: 15,
        superpower: 'Teleportation',
        extinctSince: new Date('1662-01-01'),
      },
      {
        name: "Steller's Sea Cow",
        weight: 4000,
        superpower: 'Underwater Breathing',
        extinctSince: new Date('1768-07-12'),
      },
    ];

    for (const hologram of initialHolograms) {
      const exists = await repository.findOneBy({ name: hologram.name });
      if (!exists) {
        if (!isValidDate(hologram.extinctSince.toISOString())) {
          throw new Error('Invalid date format');
        }
        await repository.save(hologram);
        console.log(`Created hologram: ${hologram.name}`);
      }
    }
  }
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
