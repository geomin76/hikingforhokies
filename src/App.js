import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

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

      <Marker
        onClick={this.onMarkerClick}
        name={'Hello'}
        position={{lat: 35.768096, lng:-78.791373}}
      />

      <Marker
        onClick={this.onMarkerClick}
        name={'Test'}
        position={{lat: 34.768096, lng:-79.791373}}
      />

      <Marker
        onClick={this.onMarkerClick}
        name={'Another'}
        position={{lat: 33.768096, lng:-79.791373}}
      />

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <p>{this.state.selectedPlace.name}</p>
        </div>
      </InfoWindow>



      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCmIRRZ0LEhB3h2mj0yu22-35k2yHw1eA'
})(MapContainer);