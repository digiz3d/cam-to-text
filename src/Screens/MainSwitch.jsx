import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CameraScreen from './CameraScreen.jsx';
import NotFoundScreen from './NotFoundScreen.jsx';
import HistoryScreen from './HistoryScreen.jsx';

class MainSwitch extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route path="/" component={CameraScreen} />
                    <Route exact path="/history" component={HistoryScreen} />
                    <Route component={NotFoundScreen} />
                </React.Fragment>
            </Router>
        );
    }
}

export default MainSwitch;