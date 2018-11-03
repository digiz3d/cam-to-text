import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CameraRtc.css'

const propTypes = {
  onTakePicture: PropTypes.func.isRequired,
};

const defaultProps = {
  onTakePicture: () => true,
};

class CameraRtc extends Component {
  constructor(props) {
    super(props);

    this.cameraFacingMode = this.props.facingMode;

    this.state = { width: 320, height: 0, streaming: false };
    this.width = this.props.width || 0;
    this.height = this.props.height || 0;
    this.streaming = false;
    this.video = null;
    this.canvas = null;
    
    this.clearPhoto = this.clearPhoto.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.setupCamera = this.setupCamera.bind(this);
  }

  componentDidMount() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');

    let that = this;

    this.setupCamera();

    this.video.addEventListener('canplay', function (ev) {
      if (!that.streaming) {
        that.height = that.video.videoHeight / (that.video.videoWidth / that.width);

        that.video.setAttribute('width', that.width);
        that.video.setAttribute('height', that.height);
        that.canvas.setAttribute('width', that.video.videoWidth);
        that.canvas.setAttribute('height', that.video.videoHeight);
        that.streaming = true;
      }
    }, false);

    this.clearPhoto();

    /*
    let test = '';
    navigator.mediaDevices.enumerateDevices()
      .then(function (devices) {
        devices.forEach(function (device) {
          test += device.kind + ": " + device.label + " id = " + device.deviceId + "\n\n";
        });
        //alert(test);
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
      */
  }

  setupCamera(index = 0) {
    let resolutions = [2160, 1440, 1080, 720, 480, 360, 240];
    let res = resolutions[index];

    let that = this;
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: res },
        facingMode: this.props.facingMode
      }, audio: false
    })
      .then(function (stream) {
        that.video.srcObject = stream;
        that.video.play();
        alert("ça a marché pour du " + res + "p")
      })
      .catch(function (err) {
        //alert(err);
        console.log("An error occurred! " + err);
        if (index < resolutions.length) {
          that.setupCamera(index + 1);
        }
      });
  }

  takePicture() {
    var context = this.canvas.getContext('2d');
    if (this.width && this.height) {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);

      //var data = this.canvas.toDataURL('image/png');
      this.canvas.toBlob(this.props.onTakePicture, 'image/png');
    } else {
      this.clearPhoto();
    }
  }

  clearPhoto() {
    let context = this.canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    return (
      <div className="CameraRtc">
        <video id="video" playsinline autoplay></video>
        <canvas id="canvas" style={{ display: "none" }}></canvas>
      </div>
    );
  }
}

export default CameraRtc;

CameraRtc.propTypes = propTypes;
CameraRtc.defaultProps = defaultProps;
CameraRtc.displayName = 'CameraRtc';