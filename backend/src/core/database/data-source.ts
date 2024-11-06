import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const isProduction = configService.get<string>('NODE_ENV') === 'production';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: !isProduction,
  logging: !isProduction,
  ssl: isProduction,
  migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
  migrationsRun: true,
};

export const AppDataSource = new DataSource(options); 