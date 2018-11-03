import React, { Component } from 'react';
import CameraRtc from '../Components/CameraRtc';
import axios from 'axios';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.sendToAzure = this.sendToAzure.bind(this);
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

    render() {
        return (
            <div>
                <CameraRtc
                    onTakePicture={this.sendToAzure}
                />
            </div>
        );
    }
}

export default CameraScreen;