import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { CreateArticleDto } from '@app/article/dto/createArticle.dto';
import { ArticleResponseInterface } from '@app/article/types/articleResponse.interface';
import { DeleteResult } from 'typeorm';
import { ArticlesResponseInterface } from '@app/article/types/articlesResponse.interface';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { CommentResponseInterface } from '@app/article/types/commentResponse.interface';
import { AddCommentDto } from '@app/article/dto/addComment.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('feed')
  @UseGuards(AuthGuard)
  public async getFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getFeed(currentUserId, query);
  }

  @Get()
  public async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(BackendValidationPipe)
  public async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.create(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  public async getArticle(
    @Param('slug') slug,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  public async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug,
  ): Promise<DeleteResult> {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(BackendValidationPipe)
  public async updateArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      slug,
      currentUserId,
      updateArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Post(':slug/comments')
  @UseGuards(AuthGuard)
  @UsePipes(BackendValidationPipe)
  public async addComment(
    @User() currentUser: UserEntity,
    @Param('slug') articleSlug,
    @Body('comment') addCommentDto: AddCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.articleService.addComment(
      articleSlug,
      currentUser,
      addCommentDto,
    );
    return this.articleService.buildCommentResponse(comment);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  public async addArticleToFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  public async deleteArticleFromFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }
}
