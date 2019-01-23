import { SideBar } from '../models/sidebar.model';
import * as SidebarActions from '../actions/sidebar.action';

// Section 1
const initialState: SideBar = {
    toggle: false,
    authentication: true
};

// Section 2
export function sidebarReducer(state: SideBar = initialState, action: SidebarActions.Actions) {
    // Section 3
    switch (action.type) {
        case SidebarActions.TOGGLE_SIDEBAR:
            return {
                ...state,
                toggle: action.payload
            };

        case SidebarActions.AUTHENTICATION_STATE:
            return {
                ...state,
                authentication: action.payload
            };
        default:
            return state;
    }
}
