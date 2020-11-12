import { Color } from './color';

export interface GameSettings {

    description: string;
    gameID?: string;
    password: string;
    isPasswordLocked: boolean;
    isPVP: boolean;
    playerColor: Color;
}
