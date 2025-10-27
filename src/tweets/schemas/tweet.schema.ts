import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Tweet extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  sharedWith: string[];
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
