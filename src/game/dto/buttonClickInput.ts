import { Field, InputType, registerEnumType } from 'type-graphql';
import { ButtonType } from 'common/enums/button';

// Register enum for type-graphql
registerEnumType(ButtonType, {
  name: 'ButtonType',
  description: 'Orange or Blue',
});

@InputType()
export class ButtonClickInput {
  @Field(type => ButtonType)
  type: ButtonType;
}
