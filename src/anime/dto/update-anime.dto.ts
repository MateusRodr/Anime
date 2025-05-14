import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimeDto } from './create-anime.dto';
import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnimeDto extends PartialType(CreateAnimeDto) {

        @IsNotEmpty()
        @IsString()
        title:string;
    
        @IsNotEmpty()
        @IsString()
        titleJapanese:string;
    
        @IsNotEmpty()
        @IsString()
        imageIRL:string;
    
        @IsNotEmpty()
        @IsString()
        synopsis:string;
    
        @IsNotEmpty()
        @IsInt()
        episodes:number;
    
        @IsNotEmpty()
        @IsString()
        status:string;
    
        @IsNotEmpty()
        @IsDecimal()
        score: number;
    
        @IsNotEmpty()
        @IsInt()
        year: number;
}
