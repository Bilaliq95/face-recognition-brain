import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from "react-tsparticles";
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import Clarifai from 'clarifai';
import './App.css';




 const options={

        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
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
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      };


class App extends React.Component {

 

  constructor(){
    super();
    this.state={
      input:'',
      imageSource:'',
      boxposition:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    };
  }

onSearchChange=(e)=>{
    this.setState({input:e.target.value});
  };

loadUser=(data)=>{
this.setState({
  user:{
    id:data.id,
    name:data.name,
    email:data.email,
    entries:data.entries,
    joined:data.joined
  }
})
}

calculateFaceLocation=(box)=>{
  const clarifaiFace=box.outputs[0].data.regions[0].region_info.bounding_box;
  const image=document.getElementById('inputimage');
  const width= image.width;
  const height= image.height;
  return({
    leftcol:clarifaiFace.left_col*width,
    toprow:clarifaiFace.top_row*height,
    bottomrow:height-(clarifaiFace.bottom_row*height),
    rightcol:width-(clarifaiFace.right_col*width)
  })
}  

displayFaceBox=(boxposition)=>{
  console.log(boxposition);
this.setState({boxposition});

}

onButtonClick=()=>{
  this.setState({imageSource:this.state.input})
     fetch('https://protected-woodland-54067.herokuapp.com/imageurl',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        input:this.state.input
      })
    }).then(response=>response.json()) 
     .then((response)=>{
    if(response)
  {
    fetch('https://protected-woodland-54067.herokuapp.com/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        id:this.state.user.id
      })
    })
    .then(response=>response.json())
    .then(count=>{
      console.log(count.entries);
      this.setState(Object.assign(this.state.user,{entries:count.entries}))
    })
  }
    this.displayFaceBox(this.calculateFaceLocation(response));
  
  }).catch(err=>console.log(err));

};


   particlesInit = (main) => {
    console.log(main);
  };

 particlesLoaded = (container) => {
    console.log(container);
  };

  onRouteChange=(route)=>{
    if(route==='signout')
    {
      this.setState({isSignedIn:false,imageSource:''})
    }
    else if(route==='home')
    {
      this.setState({isSignedIn:true})
    }
     this.setState({route});
  }

  render(){
  return (
    <div className="App">
    <Particles className="particles"
      id="tsparticles"
      init={this.particlesInit}
      loaded={this.particlesLoaded}
      options={options}
    />
    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
    { this.state.route==='home'
    ?
    <div>
    <Logo />
    <Rank name={this.state.user.name} entries={this.state.user.entries} />
    <ImageLinkForm onSearchChange={this.onSearchChange} onButtonClick={this.onButtonClick}/>
    <FaceRecognition box={this.state.boxposition} imageSource={this.state.imageSource}/>
    </div>
    :
    (
      this.state.route==='signin' ?
    <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
    :
    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    )
     }
    </div>
  );
}
}

export default App;
