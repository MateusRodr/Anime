import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [ApiModule, AnimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
