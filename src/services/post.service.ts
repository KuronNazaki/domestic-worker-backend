import { Injectable } from '@nestjs/common'
import { PostRepository } from '../repositories/post.repository'
import { CreatePostDto } from 'src/dtos/post.dto'
import { Post } from 'src/entities/post.entity'

export abstract class PostService {
  abstract findAll(): Promise<Post[]>
  abstract findOne(id: number): Promise<Post>
  abstract create(dto: CreatePostDto): Promise<Post>
}

@Injectable()
export class PostServiceImp {
  constructor(private readonly postRepository: PostRepository) {}

  async create(dto: CreatePostDto): Promise<Post> {
    return this.postRepository.save(dto)
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } })
  }
}
