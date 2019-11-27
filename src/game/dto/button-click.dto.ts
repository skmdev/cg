import { IsEnum } from 'class-validator';
import { ButtonClickInput } from './buttonClickInput';
import { ButtonType } from 'common/enums/button';

export class ButtonClickInputCto extends ButtonClickInput {
  @IsEnum(ButtonType)
  type: ButtonType;
}
