import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, UnauthorizedException, HttpStatus, BadRequestException, ParseIntPipe, Query, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt'
import { User } from './entities/user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
  //  agregar amigo
  @Post(':userId/add-friend/:friendId')
  addFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): Promise<void> {
    return this.userService.addFriend(+userId, +friendId);
  }
  // eliminar amigo
  @Delete(':userId/remove-friend/:friendId')
  async removeFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): Promise<void> {
    return this.userService.removeFriend(+userId, +friendId);
  }
 

  // AGREGAR O ELIMINAR UN POST FAVORITO DE UN USUARIO
  @Post(':userId/add-favorite/:postId')
  addToFavorites(@Param('userId') userId: string, @Param('postId') postId: string): Promise<void> {
    console.log("ENTRA")
    return this.userService.addToFavorites(+userId, +postId);
  }
 
  // LOGIN DE USUARIO
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const { email: emailValue, password } = credentials;
    console.log('Iniciando sesión...');
    console.log('Email y contraseña recibidos:', emailValue, password);
    try {
      console.log(`Buscando usuario con email: ${emailValue}...`);
      const user = await this.userService.findUserByEmail(emailValue);
      if (!user) {
        console.log(`El usuario con email ${emailValue} no fue encontrado.`);
        throw new NotFoundException('User not found');
      }
      console.log(
        `Verificando contraseña para el usuario con email: ${emailValue}...`,
      );
      console.log('Usuario encontrado:', user);
      console.log('Contraseña recibida:', password);
      const isPasswordValid = user.password === password
      console.log('Contraseña almacenada en la base de datos:', user.password);
      console.log('¿La contraseña es válida?', isPasswordValid);
      if (!isPasswordValid) {
        console.log(
          `Contraseña incorrecta para el usuario con email: ${emailValue}.`,
        );
        throw new UnauthorizedException('Invalid credentials');
      }
      console.log(
        `Inicio de sesión exitoso para el usuario con email: ${emailValue}.`,
      );
      const { id, username, email } = user;
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          user
        },
      };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        };
      } else {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
      }
    }
  }




  @Post('google')
  async googleSignIn(@Body() googleData: any) {
    return this.userService.googleSignIn(googleData);
  }

  @Post('facebook')
  async facebookSignIn(@Body() facebookData: any) {
    return this.userService.facebookSignIn(facebookData);
  }

  @Post('findCell')
  async findUserByCellphone(@Body() body: { phone: string }): Promise<User> {
    try {
      const { phone } = body;
      return await this.userService.findUserByCellphone(phone);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('findEmail')
  async findUserByEmail(@Body() body: { email: string }): Promise<User> {
    try {
      const { email } = body;
      return await this.userService.findUserByEmail(email);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id/notifications')
  async getUserNotifications(@Param('id') id: string): Promise<any[]> {
    try {
      console.log("entra")
      return await this.userService.getUserNotifications(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id/recentSearches')
  async getUserRecentSearches(@Param('id') id: string) {
    return this.userService.getUserRecentSearches(+id);
  }

  @Post(':id/recentSearches/add') // Cambio en la ruta para diferenciarla
  async addRecentSearch(
    @Param('id') id: string,
    @Body('searchTerm') searchTerm: string,
  ) {
    return this.userService.addRecentSearch(+id, searchTerm);
  }

  @Get(':id/feed')
  async getUserFeed(
    @Param('id') id: string,
    @Query('option') option: string,
    @Query('param1') param1: string,
    @Query('param2') param2: string,
    @Query('param3') param3: string,
  ) {
    return this.userService.getUserFeedWithOptions(+id, option, param1, param2, param3);
  }



  @Get(':id/favorite')
  async getUserFavorites(@Param('id') id: string) {
    return this.userService.getUserFavorites(+id);
  }

  @Get(':id/friends')
  async getUserFriends(@Param('id') id: string) {
    return this.userService.getUserFriends(+id);
  }


  @Get(':id/posts')
  async getUserPosts(@Param('id') id: string) {
    return this.userService.getUserPosts(+id);
  }
  

// AGREGA Y ELIMINA UN LIKE DE UN USUARIO A UN POST
@Post(':id/post/:postId/toggle-like')
async toggleLike(
  @Param('id') userId: string,
  @Param('postId') postId: string,
) {
  try {
    await this.userService.toggleLike(+userId, +postId);
    return { message: 'La acción posteo se realizó exitosamente.' };
  } catch (error) {
    throw new HttpException(
      { message: 'Ocurrió un error al procesar la solicitud.' },
      HttpStatus.UNAUTHORIZED, // Cambiado a 401 Unauthorized
    );
  }
}




  @Patch(':id/update-password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('newPassword') new_password: string,
    @Body('oldPassword') old_password: string,
  ) {
    console.log(`Actualizando contraseña para el usuario con ID ${id}...`);
    try {
      console.log('entra');
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      const isOldPasswordValid = await bcrypt.compare(
        old_password,
        user.password,
      );
      if (!isOldPasswordValid) {
        throw new BadRequestException('La contraseña antigua es incorrecta');
      }
      console.log('sigue');
      const hashedNewPassword = await bcrypt.hash(new_password, 10);
      user.oldPassword = old_password;
      user.password = hashedNewPassword;


      // Mapear los valores al DTO de actualización
      const updateUserDto: UpdateUserDto = {
        // Aquí mapea los campos necesarios del usuario
        password: hashedNewPassword,
        oldPassword: old_password,
      };
      await this.userService.updateUser(id, updateUserDto);
      console.log('a ver');
      return {
        statusCode: HttpStatus.OK,
        message: 'Contraseña actualizada correctamente',
        data: user,
      };
    } catch (error) {
      console.log('problema ');
      console.error('Error al actualizar la contraseña:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al actualizar la contraseña',
      };
    }
  }

 
  @Post(':userId/info-relation')
  async findInfoRelation(
    @Param('userId') userId: number, 
    @Body() requestBody: { relations: string }
  ): Promise<any[]> {
    // Verificar si se proporcionaron relaciones
    if (!requestBody.relations || typeof requestBody.relations !== 'string') {
      throw new Error('Debe proporcionar al menos una relación como una cadena de texto.');
    }
  console.log(requestBody.relations)
    // Convertir las relaciones en un array
    const relationsArray = requestBody.relations.split(',');
  
    // Llamar al servicio para obtener la información relacionada
    return this.userService.findInfoRelation(userId, relationsArray);
  }

  
}
