import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
    MailModule,
    UsersModule,
  ],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
