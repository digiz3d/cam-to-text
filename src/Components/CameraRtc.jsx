import PropTypes from 'prop-types';
import React from 'react';
import './CameraRtc.css'

const propTypes = {
  onTakePicture: PropTypes.func.isRequired,
};

const defaultProps = {
  onTakePicture: () => true,
};

class CameraRtc extends React.Component {
  constructor(props) {
    super(props);

    this.streaming = false;
    this.video = null;
    this.canvas = null;

    this.stream = null;

    this.clearPhoto = this.clearPhoto.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.setupCamera = this.setupCamera.bind(this);
  }
  componentDidUpdate(oldProps) {
    if (oldProps.facingMode !== this.props.facingMode) {
      this.setupCamera();
    }
  }

  componentDidMount() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');

    let that = this;

    this.setupCamera();

    this.video.addEventListener('canplay', function (ev) {
      if (!that.streaming) {
        let dynamicHeight = that.video.videoHeight / (that.video.videoWidth / that.props.width);

        that.video.setAttribute('width', that.props.width);
        that.video.setAttribute('height', dynamicHeight);
        that.canvas.setAttribute('width', that.video.videoWidth);
        that.canvas.setAttribute('height', that.video.videoHeight);
        that.streaming = true;
      }
    }, false);

    this.clearPhoto();
  }

  setupCamera(index = 0) {
    this.video.pause();
    this.video.srcObject = null;
    this.streaming = false;
    if (this.stream && this.stream.getTracks()[0]) {
      this.stream.getTracks()[0].stop();
    }

    let resolutions = [3024, 2160, 1440, 1080, 720, 480, 360, 240];
    let res = resolutions[index];

    let that = this;
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: res },
        facingMode: { exact: this.props.facingMode }
      }, audio: false
    })
      .then(function (stream) {
        that.stream = stream;
        that.video.srcObject = stream;
        that.video.play();
        //alert("ça a marché pour du " + res + "p")
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
    if (this.video.videoWidth && this.video.videoHeight) {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
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
      <div className="CameraRtc" style={{ overflow: "hidden", width: this.props.width, height: this.props.height, ...this.props.style }}>
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