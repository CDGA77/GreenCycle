import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common'; // Importa decoradores y módulos de NestJS para el controlador
import { AdminService } from '../services/admin.service'; // Importa el servicio de administrador
import { CreateAdminDto, UpdateAdminDto } from '../dto/index'; // Importa los DTOs para crear y actualizar administradores
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'; // Importa decoradores de Swagger para la documentación

@ApiTags('admin') // Etiqueta de Swagger para agrupar las operaciones bajo "admin"
@ApiBearerAuth() // Define que el controlador requiere autenticación JWT mediante Swagger
@Controller('admin') // Define la ruta base del controlador como "/admin"
export class AdminController {
  constructor(private readonly adminService: AdminService) {} // Inyecta el servicio de administrador en el controlador

  @ApiOperation({ summary: 'Traer todos los administradores' }) // Documentación de Swagger para describir la operación
  @Get() // Decorador para definir la ruta y el método HTTP (GET) para obtener todos los administradores
  findAll() {
    return this.adminService.findAll(); // Llama al método del servicio para obtener todos los administradores
  }

  @ApiOperation({ summary: 'Traer administrador por su id' }) // Documentación de Swagger para describir la operación
  @Get(':id') // Decorador para definir la ruta y el método HTTP (GET) para obtener un administrador por su ID
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id); // Llama al método del servicio para obtener un administrador por su ID
  }

  @ApiOperation({ summary: 'Crear un administrador' }) // Documentación de Swagger para describir la operación
  @Post() // Decorador para definir la ruta y el método HTTP (POST) para crear un nuevo administrador
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto); // Llama al método del servicio para crear un nuevo administrador
  }

  @ApiOperation({ summary: 'Actualizar un administrador' }) // Documentación de Swagger para describir la operación
  @Put(':id') // Decorador para definir la ruta y el método HTTP (PUT) para actualizar un administrador por su ID
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto); // Llama al método del servicio para actualizar un administrador por su ID
  }

  @ApiOperation({ summary: 'Eliminar un administrador' }) // Documentación de Swagger para describir la operación
  @Delete(':id') // Decorador para definir la ruta y el método HTTP (DELETE) para eliminar un administrador por su ID
  remove(@Param('id') id: string) {
    return this.adminService.remove(id); // Llama al método del servicio para eliminar un administrador por su ID
  }
}
