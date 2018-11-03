import React, { Component } from 'react';
import CameraRtc from '../Components/CameraRtc';
import axios from 'axios';
import './CameraScreen.css';

class CameraScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { width: 0, height: 0, facingMode: "environment" };

        this.sendToAzure = this.sendToAzure.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    flipCamera() {
        this.setState({ facingMode: this.state.facingMode === "user" ? "environment" : "user" });
    }

    sendToAzure(blob) {
        axios.post('https://westeurope.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation=true',
            blob,
            { headers: { "Content-Type": "application/octet-stream", "Ocp-Apim-Subscription-Key": "yourkey" } })
            .then(response => {
                alert(JSON.stringify(response.data));
                console.log(response.data);
            })
            .catch(err => {
                alert('no');
                console.warn(err);
            });
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <React.Fragment>
                <CameraRtc
                    onTakePicture={this.sendToAzure}
                    facingMode={this.state.facingMode}
                    width={this.state.width}
                    height={this.state.height}
                    ref={r => this.cameraRef = r}
                    style={{ borderRadius: 10, position: 'absolute', top: 0, zIndex: 1 }}
                />
                <div className="CameraUI">
                    <div className="BottomButtons">
                        <button onClick={() => this.flipCamera()}>Flip camera</button>
                        <button onClick={() => this.cameraRef.takePicture()}>GO</button>
                        <button onClick={() => this.flipCamera()}>History</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CameraScreen;