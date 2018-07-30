const React = require('react');

function getLatitude(coordinate) {
  if (!coordinate.includes(',')) return '';
  return coordinate.split(',')[0].trim();
}

function getLongitude(coordinate) {
  if (!coordinate.includes(',')) return '';
  return coordinate.split(',')[1].trim();
}

function setCoordinate({ latitude, longitude }) {
  if (!latitude || !longitude) return '';
  return `${latitude}, ${longitude}`;
}

class Coordinate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: '',
    };
  }

  updateInputValue(event) {
    const coordinate = event.target && event.target.value;
    const latitude = getLatitude(coordinate);
    const longitude = getLongitude(coordinate);

    this.setState({
      coordinate: setCoordinate({ latitude, longitude }),
      latitude,
      longitude,
    });
  }

  render() {
    const {
      coordinate,
      latitude,
      longitude,
    } = this.state;

    return (
      <span>
        <label htmlFor="geo">
          Co-ordinate
          <input id="geo" type="text" tabIndex="10" title="Geo co-ordinate" onChange={event => this.updateInputValue(event)} />
        </label>
        <input type="checkbox" title="Check to disable editability" />
        <span id="geoPreview">{coordinate}</span>
        <br />
        {'['}
        <input type="text" id="geo_lat" value={latitude} />
        {','}
        <input type="text" id="geo_lon" value={longitude} />
        {']'}
        <span className="suggestions" />
      </span>
    );
  }
}

module.exports = Coordinate;
