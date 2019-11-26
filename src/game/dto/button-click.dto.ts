import { IsEnum } from 'class-validator';
import { ButtonClickInput } from '../../graphql.schema';

enum ButtonType {
  Orange = 'ORANGE',
  Blue = 'BLUE',
}

export class ButtonClickInputCto extends ButtonClickInput {
  @IsEnum(ButtonType)
  type: string;
}
