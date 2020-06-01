import { IAppState, initialState } from "../reducer";

export enum UserActionTypes {
    signin = "user.signin",
    signout = "user.signout",
    setSettings = "user.setting",
}

export type UserActions =
    {
        type: UserActionTypes.signin;
        accessToken: string;
        langCode: "en-US" | "de-DE" | "vi-VN";
        id: string;
    } | {
        type: UserActionTypes.signout;
    };

export const user = (state: IAppState, action: UserActions): IAppState => {
    switch (action.type) {
        case UserActionTypes.signin:
            return {
                ...state,
                user: {
                    ...state.user,
                    hasSignedIn: true,
                    accessToken: action.accessToken,
                    id: action.id,
                    langCode: action.langCode
                }
            };

        case UserActionTypes.signout:
            return {
                ...state,
                user: {
                    ...initialState.user,
                    langCode: "de-DE"
                }
            };
    }

    return state;
}
