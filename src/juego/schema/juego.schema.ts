/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const hoy=new Date();

const edicionSchema= new mongoose.Schema({
  edicion:{
    type: String
},
anyo:{
    type:Number,
    min: 2000,
    max: hoy.getFullYear()
}
})

export const JuegoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 6,
  },
  descripcion: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
  jugadores: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['rol', 'escape', 'dados', 'fichas', 'cartas', 'tablero'],
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
  },
  Ediciones:[edicionSchema]
});
