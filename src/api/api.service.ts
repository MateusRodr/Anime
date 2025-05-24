import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../database/prisma.service';
import { CreateAnimeDto } from '../api/dto/create-api.dto';
import { Cron } from '@nestjs/schedule';
import { UpdateAnimeDto } from './dto/update-api.dto';


@Injectable()
export class ApiService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('*/5 * * * *',{
    name: 'fetchAndStoreAnimeData',
  })
  async fetchAndStoreAnimeData(query: string) {
    console.log('Fetching and storing anime data...');
    try {
      const response = await axios.get('https://api.jikan.moe/v4/anime', {
        params: { q: 'naruto' },
      });

      const animes = response.data.data;

      for (const item of animes) {
        await this.prisma.anime.upsert({
          where: { title: item.title },
          update: {},
          create: {
            title: item.title,
            titleJapanese: item.title_japanese || '',
            imageURL: item.images.jpg.image_url || '',
            synopsis: item.synopsis || '',
            episodes: item.episodes || 0,
            status: item.status || '',
            score: item.score || 0,
            year: item.year || 0,
          },
        });
      }

      return animes;
    } catch (error) {
      throw new NotFoundException('error fetching data from API');
    }
  }

  async create(data: CreateAnimeDto) {
    return this.prisma.anime.create({ data });
  }

  async findAll() {
    return this.prisma.anime.findMany();
  }

  async findOne(id: number) {
     const anime = await this.prisma.anime.findUnique({ where: { id } });
    if (!anime) throw new NotFoundException('Anime not found');
    return anime;
  }

  async update(id: number, data: UpdateAnimeDto) {
    await this.findOne(id); 
    return this.prisma.anime.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.anime.delete({ where: { id } });
  }
}
