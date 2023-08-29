import { DataSource, Repository } from 'typeorm'
import { Post } from '../entities/post.entity'
import { Injectable } from '@nestjs/common'

export abstract class PostRepository extends Repository<Post> {}

@Injectable()
export class PostRepositoryImp extends PostRepository {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager())
  }
}
