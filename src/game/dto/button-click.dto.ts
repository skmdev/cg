import { IsEnum } from 'class-validator';
import { ButtonClickInput, ButtonType } from '../../graphql.schema';

export class ButtonClickInputCto extends ButtonClickInput {
  @IsEnum(ButtonType)
  type: ButtonType;
}
