import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnimeService {

  constructor(
    private readonly prisma: PrismaService){}

    async create(data: CreateAnimeDto){
      return await this.prisma.anime.create({data})
    }

  async findAll() {
    return await this.prisma.anime.findMany({
      select: {
        id: true,
        title: true,
        titleJapanese: true,
        imageURL: true,
        synopsis: true,
        episodes: true,
        status: true,
        score: true,
        year: true,
      },
    });
  }

  async findOne(id:number){
    const anime = await this.prisma.anime.findUnique({
      where: { id },
  })
  if(!anime){
    throw new NotFoundException('anime not found')
  }
  return anime;
   }

   async update(id:number, data:UpdateAnimeDto){
    await this.findOne(id);
    return await this.prisma.anime.update({
      where: { id },
      data, 
    });
   }

   async remove(id:number){
    await this.findOne(id);
    return await this.prisma.anime.delete({
      where: { id },
    });
  }
  }