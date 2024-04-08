import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración de CORS
  app.enableCors({
    origin: '*', // URL del cliente que permitirá el acceso (puede ser '*', pero no se recomienda para producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Habilita el envío de cookies de autenticación
  });

  await app.listen(3000);
  console.log('Listening on port 3000');
}

bootstrap();
