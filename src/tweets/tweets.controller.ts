import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTweet(
    @Req() req,
    @Body() body: { content: string; sharedWith: string[] },
  ) {
    return this.tweetsService.create(
      req.user.id,
      body.content,
      body.sharedWith,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyTweets(@Req() req) {
    return this.tweetsService.getUserTweets(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('shared')
  async getSharedTweets(@Req() req) {
    return this.tweetsService.getSharedTweets(req.user.id);
  }
}
