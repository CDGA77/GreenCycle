import { registerAs } from '@nestjs/config';

export default registerAs('dataConfig', () => {
  const dataConfig = {
    db: {
      connection: process.env.DB_CONNECTION, // Protocolo de conexión a la base de datos (ej. mongodb)
      host: process.env.DB_HOST, // Host de la base de datos
      name: process.env.DB_NAME, // Nombre de la base de datos
      user: process.env.DB_USER, // Usuario de la base de datos
      password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
    },
    env: process.env.NODE_ENV || 'local', // Entorno de ejecución de la aplicación (por defecto 'local')
  };
  return dataConfig; // Retornar la configuración de la base de datos y el entorno
});
