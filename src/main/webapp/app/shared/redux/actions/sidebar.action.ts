import { Action } from '@ngrx/store';

// Section 2
export const TOGGLE_SIDEBAR = '[SIDEBAR] TOGGLE';
export const AUTHENTICATION_STATE = '[SIDEBAR] AUTH';

// Section 3
export class ToggleSidebar implements Action {
    readonly type = TOGGLE_SIDEBAR;

    constructor(public payload: boolean) {}
}

export class AuthenticationState implements Action {
    readonly type = AUTHENTICATION_STATE;

    constructor(public payload: boolean) {}
}

// Section 4
export type Actions = ToggleSidebar | AuthenticationState;
