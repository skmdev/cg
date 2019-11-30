import { Field, InputType } from 'type-graphql';
import { ButtonType } from 'common/enums/button';

@InputType()
export class ButtonClickInput {
  @Field(type => ButtonType)
  type: ButtonType;
}
