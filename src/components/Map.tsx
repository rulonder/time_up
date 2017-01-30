import * as React from 'react'
import * as google from 'google'

interface ILocation {
  latitude: number,
  longitude: number
}
interface IProps {
  initialCenter: ILocation
}

interface IState {
  zoom: number
}

export class Map extends React.Component<IProps, IState> {
  state = { zoom: 14 };
  map: any
  marker: any
  render() {
    return <div className="GMap">
      <div className='GMap-canvas' ref="mapCanvas"></div>
    </div>
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    console.log(this.props)
    this.map = this.createMap()
      const marker = this.createMarker(this.props.initialCenter, this.map)
      this.marker = marker
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    this.cleanMarkers()
    google.maps.event.clearListeners(this.map, 'zoom_changed')
    this.map = null
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      gestureHandling: 'greedy',
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  cleanMarkers() {
      this.marker.setMap(null)
      this.marker = null
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.latitude,
      this.props.initialCenter.longitude
    )
  }

  createMarker(position:ILocation, map) {
    const googlePosition = new google.maps.LatLng(
      position.latitude,
      position.longitude
    )
    return new google.maps.Marker({
      position: googlePosition,
      map: map
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.cleanMarkers()
    // update position marker
    this.marker = this.createMarker(nextProps.initialCenter, this.map)
    this.map.setCenter(this.marker.getPosition()); 
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
}
