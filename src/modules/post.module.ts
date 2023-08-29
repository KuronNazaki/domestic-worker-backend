import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../entities/post.entity'
import { PostController } from 'src/controllers/post.controller'
import { PostService, PostServiceImp } from 'src/services/post.service'
import {
  PostRepository,
  PostRepositoryImp,
} from 'src/repositories/post.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [
    {
      provide: PostService,
      useClass: PostServiceImp,
    },
    {
      provide: PostRepository,
      useClass: PostRepositoryImp,
    },
  ],
  exports: [PostService],
})
export class PostModule {}
