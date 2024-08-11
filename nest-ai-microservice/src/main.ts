import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('');
  app.use(bodyParser.json({ limit: '1mb' }));
  app.enableCors({ origin: '*' });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, validateCustomDecorators: true }),
  );

  const documentBuilder = new DocumentBuilder()
    .setTitle('AI Nest API')
    .setDescription('')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('APP_PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
