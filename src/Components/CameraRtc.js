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

    this.state = { width: 320, height: 0, streaming: false };
    this.width = 320;
    this.height = 0;
    this.streaming = false;
    this.video = null;
    this.canvas = null;
    this.startbutton = null;

    this.clearPhoto = this.clearPhoto.bind(this);
    this.takePicture = this.takePicture.bind(this);
  }

  componentDidMount() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.startbutton = document.getElementById('startbutton');

    let that = this;

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        that.video.srcObject = stream;
        that.video.play();
      })
      .catch(function (err) {
        //alert(err);
        console.log("An error occurred! " + err);
      });

    this.video.addEventListener('canplay', function (ev) {
      if (!that.streaming) {
        that.height = that.video.videoHeight / (that.video.videoWidth / that.width);

        that.video.setAttribute('width', that.width);
        that.video.setAttribute('height', that.height);
        that.canvas.setAttribute('width', that.width);
        that.canvas.setAttribute('height', that.height);
        that.streaming = true;
      }
    }, false);

    this.startbutton.addEventListener('click', function (ev) {
      that.takePicture();
      ev.preventDefault();
    }, false);

    this.clearPhoto();
  }

  takePicture() {
    var context = this.canvas.getContext('2d');
    if (this.width && this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);

      //var data = this.canvas.toDataURL('image/png');
      this.canvas.toBlob(this.props.onTakePicture, 'image/png');
      //this.props.onTakePicture(this.canvas.toBlob('image/png'));
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
        <button id="startbutton">Take photo</button>
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default CameraRtc;

CameraRtc.propTypes = propTypes;
CameraRtc.defaultProps = defaultProps;
CameraRtc.displayName = 'CameraRtc';