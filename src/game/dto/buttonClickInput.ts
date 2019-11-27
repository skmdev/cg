import { Field, InputType, registerEnumType } from 'type-graphql';
import { ButtonType } from 'common/enums/button';

registerEnumType(ButtonType, {
  name: 'ButtonType', // this one is mandatory
  description: 'Orange or Blue', // this one is optional
});

@InputType()
export class ButtonClickInput {
  @Field(type => ButtonType)
  type: ButtonType;
}
