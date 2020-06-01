import { Action, TrainingActionType } from "./Action";
import { trainings } from "./trainings/trainings";
import { user, UserActionTypes } from "./user/user";

export interface IAppState {
    user: {
        langCode: "en-US" | "de-DE" | "vi-VN";
        hasSignedIn: boolean;
        accessToken?: string;
        id: string;
    },

    trainings: Array<{}>
};

export const initialState: IAppState = {
    user: {
        id: "",
        langCode: "en-US",
        hasSignedIn: false,
        accessToken: ""
    },

    trainings: []
};


export const reducer = (state: IAppState, action: Action): IAppState => {
    switch(action.type) {
        case UserActionTypes.signin:
        case UserActionTypes.signout:
            return user(state, action);

        case TrainingActionType.dataFetched:
            return trainings(state, action);
    }

    return state;
};
