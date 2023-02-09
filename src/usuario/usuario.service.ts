import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioDto } from './dto/usuario-dto/usuario-dto';
import { Usuario } from './interfaces/usuario/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('Usuario')
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return await this.usuarioModel.find().exec();
  }

  async crear(crearUsuario: UsuarioDto): Promise<Usuario> {
    const nuevoUsuario = new this.usuarioModel(crearUsuario);
    return await nuevoUsuario.save();
  }
}
