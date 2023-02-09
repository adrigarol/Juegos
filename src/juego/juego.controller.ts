import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Post,
  Res,
  Redirect,
  UseInterceptors,
  UploadedFile,
  Session,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { JuegoService } from './juego.service';
import { diskStorage } from 'multer';

@Controller('juegos')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  @Get()
  async listar(@Res() res, @Session() session) {
    try {
      if (!session.usuario)
        return res.render('auth_login', {
          error: 'El usuario debe iniciar sesión',
        });
      const resultado = await this.juegoService.listar();
      return res.render('admin_juegos', { juegos: resultado });
    } catch (error) {
      res.render('admin_error', {
        error: 'Se ha producido un error mostrando los juegos',
      });
    }
  }

  @Get('editar/:id')
  async editarJuego(@Res() res, @Param('id') id: string, @Session() session) {
    try {
      if (!session.usuario)
        return res.render('auth_login', {
          error: 'El usuario debe iniciar sesión',
        });
      const resultado = await this.juegoService.buscarPorId(id);
      return res.render('admin_juegos_form', { juego: resultado });
    } catch (error) {
      res.render('admin_error', {
        error: 'Se ha producido un error editando el juego',
      });
    }
  }

  @Get('nuevo')
  async nuevoJuego(@Res() res, @Session() session) {
    if (!session.usuario)
      return res.render('auth_login', {
        error: 'El usuario debe iniciar sesión',
      });
    return res.render('admin_juegos_form');
  }

  @Post()
  @Redirect('/juegos', 302)
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  async crear(
    @Body() crearJuegoDto: JuegoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    crearJuegoDto.imagen = file.filename;
    return this.juegoService.insertar(crearJuegoDto);
  }

  @Post('editar/:id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  async editar(
    @Res() res,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() editarJuegoDto: JuegoDto,
  ) {
    try {
      editarJuegoDto.imagen = file.filename;
      await this.juegoService.editar(id, editarJuegoDto);
      res.redirect('/juegos');
    } catch (error) {
      res.render('admin_error', {
        error: 'Se ha producido un error creando el juego',
      });
    }
  }

  @Post(':id')
  @Redirect('/juegos')
  borrar(@Res() res, @Param('id') id: string) {
    try {
      return this.juegoService.borrar(id);
    } catch (error) {
      res.render('admin_error', {
        error: 'Se ha producido un error borrando el juego',
      });
    }
  }
}
