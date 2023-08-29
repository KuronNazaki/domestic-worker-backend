import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common'
import { ApiPath } from 'src/constants/apiPath.constant'
import { CreatePostDto } from 'src/dtos/post.dto'
import { Post as PostEntity } from 'src/entities/post.entity'
import { PostService } from 'src/services/post.service'
import { Request } from 'express'

@Controller({ path: [ApiPath.BASE, ApiPath.POST].join('/'), version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data: PostEntity[] = await this.postService.findAll()
    return data
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data: PostEntity = await this.postService.findOne(parseInt(id))
    return data
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() request: Request) {
    const body: any = request.body
    const dto: CreatePostDto = {
      title: body.title,
      numberOfLikes: body.numberOfLikes,
    }
    const data: PostEntity = await this.postService.create(dto)
    return data
  }
}
