import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = process.env.PORT;
  await app.listen(port ?? 5050);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    credentials: true,
  });
  console.log(`Using Port${port}`)

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

}
bootstrap();
