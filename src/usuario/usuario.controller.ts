import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { UsuarioDto } from './dto/usuario-dto/usuario-dto';
import { UsuarioService } from './usuario.service';

@Controller('auth')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('login')
  index(@Res() res) {
    return res.render('auth_login');
  }

  @Get('register')
  registrar(@Res() res) {
    return res.render('auth_register');
  }

  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usuarios = await this.usuarioService.listar();

    const user = usuarios.find((u) => u.login === body.login);
    if (user) {
      const [salt, key] = user.password.split(':');
      const hashedBuffer = scryptSync(body.password, salt, 64);
      const keyBuffer = Buffer.from(key, 'hex');
      const match = timingSafeEqual(hashedBuffer, keyBuffer);
      if (match) {
        req.session.usuario = user.login;
        return res.redirect('/juegos');
      } else {
        res.render('auth_login', {
          error: 'Error usuario o contraseña incorecta',
        });
      }
    } else {
      res.render('auth_login', {
        error: 'Error usuario o contraseña incorecta',
      });
    }
  }

  @Post()
  async crearUsuario(@Res() res, @Body() nuevoUsuario: UsuarioDto) {
    try {
      const salt = randomBytes(16).toString('hex');
      const hashedPassword = scryptSync(
        nuevoUsuario.password,
        salt,
        64,
      ).toString('hex');
      nuevoUsuario.password = `${salt}:${hashedPassword}`;
      await this.usuarioService.crear(nuevoUsuario);
      res.redirect('/auth/login');
    } catch (error) {
      res.render('publico_error', { error: 'Error creando el usuario' });
    }
  }

  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    req.session.destroy();
    res.redirect('/publico');
  }
}
