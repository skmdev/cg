
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum ButtonType {
    ORANGE = "ORANGE",
    BLUE = "BLUE"
}

export class ButtonClickInput {
    type?: ButtonType;
}

export class ButtonClickInfo {
    type?: string;
    timestamp?: Date;
}

export abstract class IMutation {
    abstract buttonClick(buttonClickInput?: ButtonClickInput): ButtonClickInfo | Promise<ButtonClickInfo>;
}

export abstract class IQuery {
    abstract health(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract buttonClicked(): ButtonClickInfo | Promise<ButtonClickInfo>;
}
