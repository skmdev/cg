import { Args, Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ButtonClickInfo } from './model/button';
import { ButtonClickInput } from './dto/buttonClickInput';

const pubSub = new PubSub();

@Resolver(of => ButtonClickInfo)
export class GameResolvers {
  @Query(returns => Boolean)
  healthCheck(): boolean {
    return true;
  }

  @Mutation(returns => ButtonClickInfo)
  async buttonClick(
    @Args('buttonClickInput') input: ButtonClickInput,
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

  @Subscription(returns => ButtonClickInfo)
  buttonClicked() {
    return pubSub.asyncIterator('buttonClicked');
  }
}
