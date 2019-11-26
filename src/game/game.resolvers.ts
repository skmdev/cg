import { Args, Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ButtonClickInfo } from '../graphql.schema';

import { ButtonClickInputCto } from './dto/button-click.dto';

const pubSub = new PubSub();

@Resolver('Game')
export class GameResolvers {
  @Query('health')
  healthCheck(): boolean {
    return true;
  }

  @Mutation('buttonClick')
  async buttonClick(
    @Args('buttonClickInput') input: ButtonClickInputCto,
  ): Promise<ButtonClickInfo> {
    const buttonClickInfo: ButtonClickInfo = {
      type: input.type,
      timestamp: new Date(),
    };

    pubSub.publish('buttonClicked', {
      buttonClicked: buttonClickInfo,
    });
    return buttonClickInfo;
  }

  @Subscription('buttonClicked')
  buttonClicked() {
    return pubSub.asyncIterator('buttonClicked');
  }
}
