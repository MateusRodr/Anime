import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateAnimeDto } from '../api/dto/create-api.dto';
import { UpdateAnimeDto } from './dto/update-api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}


  @Get('getData')
  search(@Query('q') query:string){
    return this.apiService.fetchAndStoreAnimeData(query);
  }

  @Post()
  create(@Body() createApiDto: CreateAnimeDto) {
    return this.apiService.create(createApiDto);
  }

  @Get('/anime')
  findAll() {
    return this.apiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateAnimeDto) {
    return this.apiService.update(+id, updateApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiService.remove(+id);
  }
}
