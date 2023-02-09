import { Injectable } from '@nestjs/common';
import { Juego } from './interfaces/juego/juego.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JuegoDto } from './dto/juego-dto/juego-dto';
@Injectable()
export class JuegoService {
  constructor(
    @InjectModel('Juego')
    private readonly juegoModel: Model<Juego>,
  ) {}

  async listar(): Promise<Juego[]> {
    return await this.juegoModel.find().exec();
  }

  async buscarPorId(id: string): Promise<Juego> {
    return await this.juegoModel.findById(id).exec();
  }

  async insertar(crearJuegoDto: JuegoDto): Promise<Juego> {
    const nuevoJuego = new this.juegoModel(crearJuegoDto);
    return await nuevoJuego.save();
  }

  async editar(id: string, editarJuegoDto: JuegoDto): Promise<Juego> {
    return await this.juegoModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            nombre: editarJuegoDto.nombre,
            descripcion: editarJuegoDto.descripcion,
            edad: editarJuegoDto.edad,
            jugadores: editarJuegoDto.jugadores,
            tipo: editarJuegoDto.tipo,
            precio: editarJuegoDto.precio,
            imagen: editarJuegoDto.imagen,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  async borrar(id: string): Promise<Juego> {
    return await this.juegoModel.findByIdAndDelete(id).exec();
  }
}
