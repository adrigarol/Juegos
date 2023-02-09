/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});
