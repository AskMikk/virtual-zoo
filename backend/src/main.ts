import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeeds } from './core/database/seeds/run-seed';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hologram API')
    .setDescription('The hologram API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get('CORS_ORIGIN') || 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await runSeeds();

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
