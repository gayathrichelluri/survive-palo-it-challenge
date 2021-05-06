import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Illnesses from "./components/Illnesses";
import Severity from "./components/Severity";
import Hospitals from "./components/Hospitals";
import styles from "./styles/App.module.css";

class App extends React.Component {
    state = {id: null, patientName: "", illnessName: "", levelOfPain: null, };

    onIllnessClick = (length, patientName, illnessName) => {
        this.setState({id: length, patientName: patientName, illnessName: illnessName});
    }

    onSeverityClick = (level) => {
        this.setState({levelOfPain: level});
    }

    render() {
        return (
            <React.Fragment>
            <div className="ui large top inverted massive borderless menu" id={styles.header}>Survive The Attack</div>
            <div className = "ui container" id={styles.app}> 
                <BrowserRouter>
                    <Switch>
                    <Route exact path = "/" render={() => <Illnesses onIllnessClick = {this.onIllnessClick}/>}/>
                    <Route exact path = "/severity" render={() => <Severity illnessName = {this.state.illnessName} patientName = {this.state.patientName} onSeverityClick = {this.onSeverityClick}/>} />
                    <Route exact path = "/hospitals" render={() => <Hospitals id={this.state.id} patientName={this.state.patientName} illnessName = {this.state.illnessName} levelOfPain = {this.state.levelOfPain} />} />
                    </Switch>
                </BrowserRouter>
            </div>
            </React.Fragment>
            
        );
    }
}

export default App;

// S$L0(#fr0ze)