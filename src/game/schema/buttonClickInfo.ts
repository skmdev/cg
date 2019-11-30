import { Field, ObjectType } from 'type-graphql';
import { ButtonType } from 'common/enums/button';

@ObjectType()
export class ButtonClickInfo {
  @Field(type => ButtonType)
  type: ButtonType;

  @Field(type => Date)
  timestamp: Date;
}
