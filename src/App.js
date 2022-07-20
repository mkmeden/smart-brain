import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import Clarifai from "clarifai";


const app = new Clarifai.App({
  apiKey: "468b1b6a3b724bcf90e16dfc17297bf5",
});

const pa = {

  fpsLimit: 120,

  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 38,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

function App() {






  const particlesInit = async (main) => {

    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };



  const [input, setInput] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const [box, setBox] = React.useState({

    leftCol: '',
    topRow: '',
    rightCol: '',
    bottomRow: ''

  });
  const [route, setRoute] = React.useState('signin');

  const [user, setUser] = React.useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  function loadUser(user) {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    })
  }

  function Router(route) {
    setRoute(route)
  }

  function calculateFaceLocation(data) {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height)


    setBox(prev => (
      {
        ...prev,
        leftCol: clarifyFace.left_col * width,
        topRow: clarifyFace.top_row * height,
        rightCol: width - (clarifyFace.right_col * width),
        bottomRow: height - (clarifyFace.bottom_row * height)
      }
    )
    )


  }


  function onInputChange(event) {
    setInput(event.target.value)
    // console.log(event.target.value)
  }

  function imgcontrol(data)
  {
    setImageURL(data)
  }


  function onButtonSubmit(event) {


    // this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function (response) {
        // response data fetch from FACE_DETECT_MODEL 
        if (response) {


          fetch('https://gentle-tundra-43518.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          }).then(response => response.json())
            .then(data => loadUser({
              ...user,
              entries: data
            }))




        }

        calculateFaceLocation(response)
        // console.log(response)
        /* data needed from the response data from clarifai API, 
           note we are just comparing the two for better understanding 
           would to delete the above console*/

        //  console.log(calculateFaceLocation(response));
      },
      function (err) {
        // there was an error

        console.log('couldnt detect face')
      }
    );

    setImageURL(input)
  }

  // console.log(box)

  return (
    <div className="App">
      <Particles
        className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={pa}
      />


      <Navigation Router={Router} route={route} imgcontrol={imgcontrol}/>
      {
        route === 'home' ?
          <div>
            <Logo />
            <Rank entries={user.entries} name={user.name} />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
            <FaceRecognition imgURL={imageURL} box={box} />
          </div>
          :
          route == 'signin' ?
            <Signin Router={Router} loadUser={loadUser} /> : <Register Router={Router} loadUser={loadUser} />

      }
    </div>
  );
}

export default App;
