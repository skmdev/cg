import { Module } from '@nestjs/common';
import { GameResolvers } from './game.resolvers';

@Module({
  providers: [GameResolvers],
})
export class GameModule {}
