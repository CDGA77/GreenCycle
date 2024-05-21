import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/index';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Decoradores de Swagger para documentación
@ApiTags('users') // Etiqueta para el grupo de operaciones relacionadas con usuarios
@ApiBearerAuth() // Especifica que la autenticación se realiza a través de tokens JWT
@Controller('users') // Controlador para las rutas relacionadas con usuarios
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para obtener todos los usuarios
  @ApiOperation({ summary: 'Traer todos los usuarios' }) // Descripción de la operación
  @Get() // Decorador para manejar peticiones HTTP GET a la ruta 'users'
  findAll() {
    // Método que maneja la petición GET
    return this.usersService.findAll(); // Llama al método correspondiente del servicio para obtener todos los usuarios
  }

  // Endpoint para obtener un usuario por su ID
  @ApiOperation({ summary: 'Traer usuario por su id' }) // Descripción de la operación
  @Get(':id') // Decorador para manejar peticiones HTTP GET con un parámetro dinámico ':id'
  findOne(@Param('id') id: string) {
    // Método que maneja la petición GET con un parámetro 'id'
    return this.usersService.findOne(id); // Llama al método correspondiente del servicio para obtener un usuario por su ID
  }

  // Endpoint para crear un nuevo usuario
  @ApiOperation({ summary: 'Crear un usuario' }) // Descripción de la operación
  @Post() // Decorador para manejar peticiones HTTP POST a la ruta 'users'
  create(@Body() createUserDto: CreateUserDto) {
    // Método que maneja la petición POST y recibe los datos del usuario a crear
    return this.usersService.createUser(createUserDto); // Llama al método correspondiente del servicio para crear un usuario
  }

  // Endpoint para actualizar un usuario existente
  @ApiOperation({ summary: 'Actualizar un usuario' }) // Descripción de la operación
  @Put(':id') // Decorador para manejar peticiones HTTP PUT con un parámetro dinámico ':id'
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Método que maneja la petición PUT con un parámetro 'id' y los datos del usuario a actualizar
    return this.usersService.update(id, updateUserDto); // Llama al método correspondiente del servicio para actualizar un usuario
  }

  // Endpoint para eliminar un usuario existente
  @ApiOperation({ summary: 'Eliminar un usuario' }) // Descripción de la operación
  @Delete(':id') // Decorador para manejar peticiones HTTP DELETE con un parámetro dinámico ':id'
  remove(@Param('id') id: string) {
    // Método que maneja la petición DELETE con un parámetro 'id'
    return this.usersService.remove(id); // Llama al método correspondiente del servicio para eliminar un usuario
  }
}
