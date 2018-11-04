import React from 'react';
import { addEntry } from '../AppState.js';
import CameraRtc from '../Components/CameraRtc.jsx';
import axios from 'axios';

import FlipCameraIcon from '../Assets/Arrows.svg';
import ShootIcon from '../Assets/Diaphragm.svg';
import HistoryIcon from '../Assets/Time.svg';

import './CameraScreen.css';

class CameraScreen extends React.Component {
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

    sendToAzure(picture) {
        /*
        This request used to be :
        
        axios.post('https://westeurope.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation=true',
            picture,
            { headers: { "Content-Type": "application/octet-stream", "Ocp-Apim-Subscription-Key": "yourkey" } })
        
        But now, I prefer using a proxy that automatically add the API KEY
        */
        axios.post('https://cam-to-text-function-app.azurewebsites.net/ocr', // this is the server proxy that hides the OCR API KEY
            picture,
            { headers: { "Content-Type": "application/octet-stream" } })
            .then(response => {
                let phrase = "";
                response.data.regions.forEach(region => {
                    region.lines.forEach(line => {
                        line.words.forEach(word => {
                            phrase += word.text + " ";
                        });
                        phrase += "\n";
                    });
                });

                if (phrase) {
                    addEntry(phrase);
                    this.props.history.push('/history');
                }
                else {
                    alert('>_<');
                }
            })
            .catch(err => {
                alert(':(');
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
                    style={{ position: 'absolute', top: 0, zIndex: 1 }}
                />
                <div className="CameraUI">
                    <div className="BottomButtons">
                        <img
                            className="Button"
                            onClick={(e) => {
                                e.preventDefault(); this.flipCamera();
                            }}
                            alt="Flip Camera"
                            src={FlipCameraIcon}
                        />
                        <img
                            className="ShootButton"
                            onClick={(e) => {
                                e.preventDefault(); this.cameraRef.takePicture();
                            }}
                            alt="Capture"
                            src={ShootIcon}
                        />
                        <img
                            className="Button"
                            onClick={(e) => { e.preventDefault(); this.props.history.push('/history'); }}
                            alt="History"
                            src={HistoryIcon}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CameraScreen;