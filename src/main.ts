import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('GreenCycle')
    .setDescription(
      'Este proyecto es un sistema de gestión de usuarios que proporciona funciones de autenticación y gestión de roles para administradores y usuarios. Utiliza el framework Nest.js para construir la API backend. La aplicación permite a los usuarios registrarse, iniciar sesión y acceder a recursos protegidos según su rol. Se integra con una base de datos MongoDB para almacenar los datos de usuarios y administradores.',
    )
    .setVersion('1.0')
    .addTag('library')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('/v1/api');
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/v1/api`);
}
bootstrap();
