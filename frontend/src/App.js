import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { apiKey } from './secrets'

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
    selectedPlace: {}       //Shows the infoWindow to the selected place upon a marker
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
            map_link={x.map}
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
          <div style={{fontSize:13, marginTop:-15, marginBottom:-5, width:200, lineHeight:1.4}}>
            <h3>{this.state.selectedPlace.name}</h3>
            <img style={{ height:125, width:200}} src={this.state.selectedPlace.img}/>
            <h5 style={{fontSize:13, width:200, lineHeight:1.4}}>{this.state.selectedPlace.desc}</h5>
            {this.state.selectedPlace.dist ?
          <div style={{fontSize:12, lineHeight:0.2}}>
            <p>Hiking: {this.state.selectedPlace.dist}</p>
            <p>Elevation gain: {this.state.selectedPlace.elev}</p>
            <p>Difficulty: {this.state.selectedPlace.diff}</p>
          </div>
          :<p style={{fontSize:12, lineHeight:1}}>There is no hiking involved in this location.</p>
          }

          <a href={this.state.selectedPlace.map_link} target="_blank">Visit this place</a>
          </div>
        </div>
        
      </InfoWindow>



      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey()
})(MapContainer);