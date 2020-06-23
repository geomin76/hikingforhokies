import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { apiKey } from './secrets'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const mapStyles = {
  width: '100%',
  height: '100%'
};

let data = [];

async function getData() {
  await fetch("http://ec2-100-26-161-255.compute-1.amazonaws.com:5000/getData")
  .then(res => res.json())
  .then(
    (result) => {
      // console.log(result)
      data = result
    }
  )
}

getData()

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
         lat: 37.227703,
         lng: -80.422073
        }}
        >

          {
            data.map((x) => 
            <Marker 
            onClick={this.onMarkerClick}
            name={x.title}
            position={{lat: x.lat, lng: x.lng}}
            desc={x.desc}
            img={x.link}
            map={x.map}
            dist={x.dist}
            elev={x.elev}
            diff={x.diff}
            />
            )
          }

          {/* css */}

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h3>{this.state.selectedPlace.name}</h3>
          <img src={this.state.selectedPlace.img}></img>
          <p>{this.state.selectedPlace.desc}</p>
          {this.state.selectedPlace.dist ?
        <div>
          <p>Hiking: {this.state.selectedPlace.dist}</p>
          <p>Elevation gain: {this.state.selectedPlace.elev}</p>
          <p>Difficulty: {this.state.selectedPlace.diff}</p>
        </div>
        :<p>There is no hiking involved in this location.</p>
        }

        {/* figure out link */}
        </div>
      </InfoWindow>



      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey()
})(MapContainer);