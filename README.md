# Cam to Text
This project is about photographing some text and getting the text back from Microsoft Azure OCR recognition service.  
This React Web App locally saves the text that you capture using your phone's camera.  
It was originally an exercice I did for school, but I tried to make it better this time.

# Requirement
- An active Azure OCR service *API KEY*
- A web host with SSL
- Node
- Yarn

# Installation
`yarn install`  
modify the CameraScreen.jsx and enter your *API KEY*

# Launching
## Development
`yarn start`

## Production
`yarn build`

# Usage
Build then host the static files on a host with HTTPS enabled (Chrome requires SSL in order to open media devices).  
Open the website with your mobile device. Take a picture of some random text. You can now copy it from your phone
