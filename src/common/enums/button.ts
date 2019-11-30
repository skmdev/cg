import { registerEnumType } from 'type-graphql';
// For some reason, it is not competitable for enum transforming in type-graphql
// Therefore, separate the enum
export enum ButtonType {
  Orange = 'ORANGE',
  Blue = 'BLUE',
}

// Register enum for type-graphql
registerEnumType(ButtonType, {
  name: 'ButtonType',
  description: 'Orange or Blue',
});
