import path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GameModule } from './game/game.module';
import { DateScalar } from './common/scalars/date.scalar';
import { NextModule } from './lib/nextjs';

const dev = process.env.NODE_ENV !== 'production';
const dir = dev ? path.join(process.cwd(), './src/client') : '';

@Module({
  imports: [
    GameModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    NextModule.forRoot({ dev, dir }),
  ],
  providers: [DateScalar],
})
export class AppModule {}
