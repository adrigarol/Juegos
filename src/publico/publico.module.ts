import { Module } from '@nestjs/common';
import { JuegoModule } from 'src/juego/juego.module';
import { PublicoController } from './publico.controller';

@Module({
  imports: [JuegoModule],
  controllers: [PublicoController],
})
export class PublicoModule {}
