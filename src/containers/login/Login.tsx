import React from "react";
import { Link } from "react-router-dom";

import { __connect } from "../AppContext";
import { IPageProps } from "../ContainerBase";

interface IState {
    email: string;
    pass: string;
}

class LoginRaw extends React.Component<IPageProps, IState> {
    constructor(props: IPageProps) {
        super(props);

        this.state = {
            email: "",
            pass: ""
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div>{this.props.appState.user.langCode}</div>
                <input value={this.state.email} onChange={(e) => this.setState({ email: e.currentTarget.value })} />
                <button onClick={() => this.setState({ email: "hallo" })}>Change to "Hallo"</button>
                <Link to="/">Go to Home</Link>
            </div>
        )
    }
}

export const Login = __connect(LoginRaw);
