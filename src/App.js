import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { apiKey } from './secrets'

const mapStyles = {
  width: '100%',
  height: '100%'
};

let data = [
  {title: "hello", lat: 37.415058, lng: -76.790558, desc: "hello world heheh"},
  {title: "h", lat: 38.415058, lng: -76.790558, desc: "hello world"},
  {title: "e", lat: 39.415058, lng: -76.790558, desc: "hello world gw"},
  {title: "l", lat: 40.415058, lng: -76.790558, desc: "hello world thjwthtwh"},
  {title: "q", lat: 41.415058, lng: -76.790558, desc: "hello world rjttejtrej"},
  {title: "v", lat: 42.415058, lng: -76.790558, desc: "hello world werwetwet"},
]

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
        zoom={6}
        style={mapStyles}
        initialCenter={{
         lat: 35.765174,
         lng: -78.711569
        }}
        >

          {
            data.map((x) => 
            <Marker 
            onClick={this.onMarkerClick}
            name={x.title}
            position={{lat: x.lat, lng: x.lng}}
            text={x.desc}
            />
            )
          }


      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <p>{this.state.selectedPlace.name}</p>
          <p>{this.state.selectedPlace.text}</p>
        </div>
      </InfoWindow>



      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey()
})(MapContainer);