import { runSeeders } from 'typeorm-extension';
import { InitialDataSeeder } from './initial-data.seed';
import { AppDataSource } from '../data-source';

export const runSeeds = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    console.log('Running seeds...');
    await runSeeders(AppDataSource, {
      seeds: [InitialDataSeeder],
    });
    console.log('Seeds completed successfully');
  } catch (error) {
    console.error('Seeds failed:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

if (require.main === module) {
  runSeeds();
}
