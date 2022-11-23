import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Tenemos que agregar este ValidationPipe para asegurar que todos los endpoints estan protegidos de recibir los datos incorrectos y se debe llamar acá
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
