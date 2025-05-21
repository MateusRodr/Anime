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
          description: 'A ninja anime',
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
});
