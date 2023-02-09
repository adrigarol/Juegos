import {
  Body,
  Controller,
  Get,
  Param,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { JuegoService } from 'src/juego/juego.service';

@Controller('publico')
export class PublicoController {
  constructor(private readonly juegoService: JuegoService) {}
  @Get()
  async index(@Res() res) {
    return res.render('publico_index');
  }

  @Get('buscar')
  async busqueda(@Res() res, @Req() req) {
    try {
      const resultado = await this.juegoService.listar();
      const existe = resultado.filter((j) =>
        j.nombre
          .toLocaleLowerCase()
          .includes(req.query.buscar.toLocaleLowerCase()),
      );
      return res.render('publico_index', { juegos: existe });
    } catch (error) {
      res.render('publico_error', {
        error: 'Se ha producido un error buscando los juegos',
      });
    }
  }

  @Get('juegos/:id')
  async mostrarJuego(@Res() res, @Param('id') id: string) {
    try {
      const resultado = await this.juegoService.buscarPorId(id);
      return res.render('publico_juego', { juego: resultado });
    } catch (error) {
      res.render('admin_error', {
        error: 'Se ha producido un error mostrando el juego',
      });
    }
  }
}
