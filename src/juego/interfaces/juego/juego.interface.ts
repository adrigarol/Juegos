import { Edicion } from './edicion.interface';

export interface Juego {
  nombre: string;
  descripcion: string;
  edad: number;
  jugadores: number;
  tipo: string;
  precio: number;
  imagen: string;
  Ediciones: [Edicion];
}
