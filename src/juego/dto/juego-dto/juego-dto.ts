import { Edicion } from 'src/juego/interfaces/juego/edicion.interface';

export class JuegoDto {
  readonly nombre: string;
  readonly descripcion: string;
  readonly edad: number;
  readonly jugadores: number;
  readonly tipo: string;
  readonly precio: number;
  imagen: string;
  readonly Ediciones: [Edicion];
}
