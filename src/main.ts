import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Crear una instancia de la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Establecer el puerto de la aplicación, por defecto 3000
  const port = process.env.PORT || 3000;

  // Habilitar CORS (Cross-Origin Resource Sharing)
  app.enableCors();

  // Configurar Swagger para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('GreenCycle') // Título de la documentación
    .setDescription(
      'Este proyecto es un sistema de gestión de usuarios que proporciona funciones de autenticación y gestión de roles para administradores y usuarios. Utiliza el framework Nest.js para construir la API backend. La aplicación permite a los usuarios registrarse, iniciar sesión y acceder a recursos protegidos según su rol. Se integra con una base de datos MongoDB para almacenar los datos de usuarios y administradores.',
    ) // Descripción de la API
    .setVersion('1.0') // Versión de la API
    .addTag('library') // Etiqueta para organizar los endpoints en Swagger
    .build();

  // Crear el documento Swagger basado en la configuración
  const document = SwaggerModule.createDocument(app, config);

  // Configurar el módulo Swagger para servir la documentación en la ruta /doc
  SwaggerModule.setup('doc', app, document);

  // Establecer un prefijo global para todas las rutas de la API
  app.setGlobalPrefix('/v1/api');

  // Iniciar la aplicación en el puerto especificado
  await app.listen(port);

  // Mostrar un mensaje en la consola indicando que la aplicación está en funcionamiento
  console.log(`Application is running on: http://localhost:${port}/v1/api`);
}

// Llamar a la función bootstrap para iniciar la aplicación
bootstrap();
