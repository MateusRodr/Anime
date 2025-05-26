import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';


describe('ApiController', () => {
  let apiController: ApiController;
  let apiService: jest.Mocked<ApiService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        {
          provide: ApiService,
          useValue: {   
            fetchAndStoreAnimeData: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    apiController = moduleRef.get<ApiController>(ApiController);
    apiService = moduleRef.get(ApiService);
  });

  describe('search', () => {
    it('should return an array of anime data', async () => {
      const query = 'Naruto';
      const mockResult = [
        {
          id: 1,
          title: 'Naruto',
          imageUrl: 'http://example.com/naruto.jpg',
          sccore: 8.5,
        },
      ];

      apiService.fetchAndStoreAnimeData.mockResolvedValue(mockResult);

      const result = await apiController.search(query);

      expect(result).toEqual(mockResult);
      expect(apiService.fetchAndStoreAnimeData).toHaveBeenCalledWith(query);
    });
  });

  describe('create', () => {
    it('should create an anime entry', async () => {
      const createAnimeDto = {
        title: "Naruto",
        titleJapanese: "ナルト",
        imageURL: 'http://anime.com/naruto.png',
        synopsis: 'A ninja anime',
        episodes: 120,
        status: 'finished',
        score: 8.5,
        year: 2002,
      }
      const mockResult = {
        id: 1,
        ...createAnimeDto,
      };
      apiService.create.mockResolvedValue(mockResult);
      const result = await apiController.create(createAnimeDto);
      expect(result).toEqual(mockResult);
      expect(apiService.create).toHaveBeenCalledWith(createAnimeDto);
    })
    
  })

  describe('findOne', () => {
    it("should return a single anime single entry", async () => {
      const mockResult = {
        id: 1,
        title: 'Naruto',
        titleJapanese: 'ナルト',
        imageURL: 'http://anime.com/naruto.png',
        synopsis: 'A ninja anime',
        episodes: 120,
        status: 'finished',
        score: 8.5,
        year: 2002,

    }
    apiService.findOne.mockResolvedValue(mockResult);
    const result = await apiController.findOne('1');
    expect(result).toEqual(mockResult);
    expect(apiService.findOne).toHaveBeenCalledWith(1);  
  })

  describe("update", () => {
    it("should update an anime entry", async () =>{
      const id = 1;
      const updateAnimeDto = {
        title: "Naruto Shippuden",
        titleJapanese: "ナルト 疾風伝",
        imageURL: 'http://anime.com/naruto-shippuden.png',
        synopsis: 'A ninja anime sequel',
        episodes: 500,
        status: 'finished',
        score: 9.0,
        year: 2007,
      }
      const mockResult = {
        id,
        ...updateAnimeDto,
      };
      apiService.update.mockResolvedValue(mockResult);
      const result = await apiController.update('1', updateAnimeDto);
      expect(result).toEqual(mockResult);
      expect(apiService.update).toHaveBeenCalledWith(id, updateAnimeDto);
    })
  })
  })
  
  describe('remove', () => {
    it('should remove an anime entry', async () => {
      const id = 1;
      const mockResult = {
        id,
        title: 'Naruto',
        titleJapanese: 'ナルト',
        imageURL: 'http://anime.com/naruto.png',
        synopsis: 'A ninja anime',
        episodes: 120,
        status: 'finished',
        score: 8.5,
        year: 2002,
      };
      apiService.remove.mockResolvedValue(mockResult);
      const result = await apiController.remove('1');
      expect(result).toEqual(mockResult);
      expect(apiService.remove).toHaveBeenCalledWith(1);
    });
  })
})