import { Module } from '@nestjs/common';
import { BoloService } from './bolo.service';
import { BoloController } from './bolo.controller';

@Module({
  providers: [BoloService],
  controllers: [BoloController]
})
export class BoloModule {}
