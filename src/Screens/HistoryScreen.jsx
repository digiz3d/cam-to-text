import React from 'react';

import { getEntries, removeEntries } from '../AppState.js';
import './HistoryScreen.css';
import HistoryIcon from '../Assets/Time.svg';
import LeftIcon from '../Assets/Left.svg';
import DeleteIcon from '../Assets/Delete.svg';

class HistoryScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onClickGoBack = this.onClickGoBack.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickGoBack(e) {
        e.preventDefault();
        this.props.history.push('/');
    }

    onClickDelete(e) {
        e.preventDefault();
        removeEntries();
        this.forceUpdate();
    }

    render() {
        let entries = getEntries();
        return (
            <div className="HistoryScreen">
                <div className="ButtonsContainer">
                    <img
                        className="Button"
                        alt="Back"
                        src={HistoryIcon}
                        style={{ width: 40, height: 40 }}
                    />
                    <img
                        className="Button"
                        onClick={this.onClickDelete}
                        alt="Delete history"
                        src={DeleteIcon}
                    />
                </div>
                <div className="Entries">
                    {
                        entries.reverse().map(entry => <p className="Entry">{entry}</p>)
                    }
                </div>
                <div className="ButtonsContainer">
                    <img
                        className="Button"
                        onClick={this.onClickGoBack}
                        alt="Back"
                        src={LeftIcon}
                    />
                </div>
            </div>
        );
    }
}

export default HistoryScreen;