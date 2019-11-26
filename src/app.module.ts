import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GameModule } from './game/game.module';
import { DateScalar } from './common/scalars/date.scalar';

@Module({
  imports: [
    GameModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [DateScalar],
})
export class AppModule {}
