import "./styles.scss";

import React from "react";
import { Link } from "react-router-dom";

import { UserActionTypes } from "../../appState/Action";
import { DraphonyGrid } from "../../components/DraphonyGrid/DraphonyGrid";
import { ITraining, ITrainingOffer } from "../../models/ITrainings";
import { connect, IPageProps } from "../ContainerBase";

class TrainingOverviewRaw extends React.Component<IPageProps> {
    componentDidMount() {
        // Fetch additional data from the server here.
    }

    render() {
        const items = [
            { id: "1331", name: "JavaScript", description: "Learn awesome stuff like [...a, ...b], or other ..." },
            { id: "2432", name: "React", description: "hooks, Fragments, HOC, etc." }
        ];

        const trainings: Array<ITraining> = [
            { title: "JavaScript", description: "Learn to understand JavaScript Basics", minPrice: 400.00, maxPrice: 600.00, trainerOffers: [] },
            { title: "JavaScript", description: "Learn to understand JavaScript Basics", minPrice: 600.00, trainerOffers: [] }
        ]

        return (
            <div id="trainingsBody">
                <h1>Training Overview</h1>
                {/* <div>
                    {this.props.appState.user.langCode}
                    <DraphonyGrid name="Awesome Grid made by Draphony Dev Team" items={items} />
                </div>
                <button onClick={this.onSignInOut}>
                    {
                        this.props.appState.user.hasSignedIn ? "Signout" : "Signin"
                    }
                </button>
                <Link to="login">Goto Login</Link> */}
                <DraphonyGrid name="Awesome Grid made by Draphony Dev Team" items={items} />
            </div>
        );
    }

    private onSignInOut = () => {
        this.props.appState.user.hasSignedIn ? 
            this.props.dispatch({ type: UserActionTypes.signout }) 
            : this.props.dispatch({ 
                type: UserActionTypes.signin, 
                accessToken: "" + new Date().toISOString(),
                id: "" + new Date(),
                langCode: "en-US"
            });
    }
}

export const TrainingOverview = connect(TrainingOverviewRaw);
