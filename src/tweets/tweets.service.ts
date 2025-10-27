import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tweet } from './schemas/tweet.schema';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<Tweet>,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}

  async create(authorId: string, content: string, sharedWith: string[]) {
    const tweet = await this.tweetModel.create({
      authorId,
      content,
      sharedWith,
    });

    // Notify shared users (mock email)
    const users = await Promise.all(
      sharedWith.map((id) => this.usersService.findById(id)),
    );
    for (const user of users) {
      if (user)
        await this.mailService.sendEmail(
          user.email,
          'New Tweet Shared With You!',
          `Content: "${content}"`,
        );
    }

    return tweet;
  }

  async getUserTweets(userId: string) {
    return this.tweetModel
      .find({ authorId: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getSharedTweets(userId: string) {
    return this.tweetModel
      .find({ sharedWith: userId })
      .sort({ createdAt: -1 })
      .exec();
  }
}
