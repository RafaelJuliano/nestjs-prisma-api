import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/User.repository';
import { NotFoundError } from '../common/errors/NotFoundError';

describe('UsersService', () => {
  let mockedRepository: Record<string, jest.Mock<any, any, any>>
  let service: UsersService;
  const user = {
    id: 1,
    name: 'John',
    email: 'john@mail.com',
    admin: false,
    createdAt: new Date()
  }

  beforeEach(async () => {
    mockedRepository = {
      create: jest.fn().mockResolvedValue(user),
      findAll: jest.fn().mockResolvedValue([user]),
      findOne: jest.fn().mockResolvedValue(user),
      update: jest.fn().mockResolvedValue(user),
      remove: jest.fn().mockResolvedValue(user),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: UsersRepository, useValue: mockedRepository
      }]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        name: 'John',
        email: 'john@mail.com',
        admin: false
      }
      const result = await service.create(createUserDto)
      expect(mockedRepository.create).toHaveBeenCalledWith(createUserDto)
      expect(result).toStrictEqual(user)
    })
  })

  describe('findAll', () => {
    it('should list all users', async () => {
      const result = await service.findAll()
      expect(mockedRepository.findAll).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual([user])
    })
  })

  describe('findOne', () => {
    it('should find a user', async () => {
      const id = 1
      const result = await service.findOne(id)
      expect(mockedRepository.findOne).toHaveBeenCalledWith(id)
      expect(result).toStrictEqual(user)
    })

    it('should throw error if user does not exists', async () => {
      mockedRepository.findOne.mockResolvedValue(undefined)
      await expect(service.findOne(2)).rejects.toThrow(NotFoundError)
    })
  })

  describe('update', () => {
    const updateUserDto = {
      name: 'John',
      email: 'john@mail.com'
    }

    it('should update a user', async () => {
      const id = 1
      const result = await service.update(id, updateUserDto)
      expect(mockedRepository.findOne).toHaveBeenCalledWith(id)
      expect(mockedRepository.update).toHaveBeenCalledWith(id, updateUserDto)
      expect(result).toStrictEqual(user)
    })

    it('should throw error if user does not exists', async () => {
      const id = 1
      mockedRepository.findOne.mockResolvedValue(undefined)
      await expect(service.update(id, updateUserDto)).rejects.toThrow(NotFoundError)
      expect(mockedRepository.findOne).toHaveBeenCalledWith(id)
      expect(mockedRepository.update).toHaveBeenCalledTimes(0)
    })
  })

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = 1
      const result = await service.remove(id)
      expect(mockedRepository.findOne).toHaveBeenCalledWith(id)
      expect(mockedRepository.remove).toHaveBeenCalledWith(id)
      expect(result).toStrictEqual(user)
    })

    it('should throw error if user does not exists', async () => {
      const id = 1
      mockedRepository.findOne.mockResolvedValue(undefined)
      await expect(service.remove(id)).rejects.toThrow(NotFoundError)
      expect(mockedRepository.findOne).toHaveBeenCalledWith(id)
      expect(mockedRepository.remove).toHaveBeenCalledTimes(0)
    })
  })
});
