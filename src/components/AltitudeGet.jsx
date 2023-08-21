
import React from 'react';

export default class AltitudeGet extends React.Component {
 
  render() {
    const { altitude = 0, his = 0, adi = 0 } = this.props;
    return (
      <div>
            <h2>Altitude: {altitude}</h2>
            <h2>HIS: {his}</h2>
            <h2>ADI: {adi}</h2>
      </div>
    )
  }
}