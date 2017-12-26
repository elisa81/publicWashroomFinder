import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: [],
      selectFilter: 'all',
      filterArr: '',
      washroomJSX: ''
    }
    
  }

  componentWillMount() {
    console.log(this.props.washrooms);
    this.setState({
      washroomJSX: this.props.washrooms.map((info, i) => {
        return (
          <Marker
            key={i}
            name={info.NAME}
            address={info.ADDRESS}
            time={info.WINTERHOURS}
            type={info.TYPE}
            access={info.WHEELCHAIR}
            maintainer={info.MAINTAINER}
            onClick={this.onMarkerClick}
            position={{
              lat: info.LATITUDE,
              lng: info.LONGITUDE
            }}
            icon={{
              url: './poop.png'
            }}
          />
        )
      })
    })

  }

  // FUNCTIONS

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  changeFilter = () => {
    this.setState({
      selectFilter: this.refFilter.value
    }, () => {
      // console.log(this.state.selectFilter)

      let filValue = this.refFilter.value;
      let findLocation = this.props.washrooms.filter(function (loc) {
        return filValue === 'All' ? loc.LOCATION : loc.LOCATION === filValue;
      })
      this.setState({
        filterArr: findLocation
      }, () => {

        let filteredJSX = this.state.filterArr.map((filteredInfo, i) => {
          return (
            <Marker
              key={i}
              name={filteredInfo.NAME}
              address={filteredInfo.ADDRESS}
              time={filteredInfo.WINTERHOURS}
              type={filteredInfo.TYPE}
              access={filteredInfo.WHEELCHAIR}
              maintainer={filteredInfo.MAINTAINER}
              onClick={this.onMarkerClick}
              position={{
                lat: filteredInfo.LATITUDE,
                lng: filteredInfo.LONGITUDE
              }}
              icon={{
                url: './poop.png'
              }}
            />
          )
        })
        // console.log(this.state.filterArr)
        this.setState({
          washroomJSX: filteredJSX
        },() => {
          console.log(this.state.washroomJSX)
        })
      })
    })
  }

  // END

  render() {

    return (
      <div>
          <div className="container text-right" id="options-bar">
          <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>Filter by location:
          <select
            // className="form-control btn-primary"
            onChange={this.changeFilter}
            ref={(select) => { this.refFilter = select }}>
            <option value="All">All</option>
            <option value="Downtown" >Downtown</option>
            <option value="Stanley Park">Stanley Park</option>
            <option value="Chinatown">Chinatown</option>
            <option value="Kitsilano">Kitsilano</option>
            <option value="Mt Pleasant">Mt. Pleasant</option>
            <option value="East Van">East Vancouver</option>
            <option value="South Van">South Vancouver</option>
          </select>
           
          {/* <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>Wheelchair: 
          <select> 
            <option>All</option>
            <option>No</option>
            <option>Yes</option>
          </select> */}
          </div>

            <Map google={this.props.google}
              style={{ height: '72%' }}
              zoom={16}
              initialCenter={{
                lat: 49.2851,
                lng: -123.1147
              }}
            >

              <Marker onClick={this.onMarkerClick}
                name={'BrainStation'}
              />

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                <div>
                  <h2 className="info-window-header">{this.state.selectedPlace.name}</h2>
                  <h4 className="info-window-address">{this.state.selectedPlace.address}</h4>
                  <h4>{this.state.selectedPlace.time}</h4>
                  <p>{this.state.selectedPlace.type}</p>
                  <p>Maintenance: {this.state.selectedPlace.maintainer}</p>
                  <div className={(this.state.selectedPlace.access === 'Yes') ? "alert alert-success" : "alert alert-danger"}>

                    <h4>{this.state.selectedPlace.access}</h4>
                    <img src="./disable.png" style={{ height: '25px' }} alt="" />
                  </div>
                  </div>
              </InfoWindow>
              {this.state.washroomJSX}
              {/* {this.filteredJSX} */}
            </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCwX1X4jmbvPa5Idhk-ur9PusUZqpMrv48"
})(MapContainer)