import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JuegoModule } from './juego/juego.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicoModule } from './publico/publico.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    JuegoModule,
    MongooseModule.forRoot('mongodb://mymongodb/juegos'),
    PublicoModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
