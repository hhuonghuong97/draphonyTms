import { TrainingsAction, TrainingsActionType } from "./trainings/trainings";
import { UserActions, UserActionTypes } from "./user/user";

export {
    UserActionTypes,
    TrainingsActionType as TrainingActionType
}

export type Action = UserActions | TrainingsAction;
