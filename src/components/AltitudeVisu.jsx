
import React from 'react';
import axios from 'axios';
import Gauge from './Gauge';
import Compass from './Compass';
import Circle from './Circle';

export default class AltitudeVisu extends React.Component {
 
  render() {
    const { altitude = 0, his = 0, adi = 0 } = this.props;
    return (
      <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
     <Gauge value={altitude} /> 
    <div style={{ width: 20 }} />
    <Compass value ={his}/>
    <div style={{ width: 20 }} />
    <Circle value ={adi}/>
      </div>
    )
  }
}