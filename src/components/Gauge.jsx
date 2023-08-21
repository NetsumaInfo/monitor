
import React from 'react';
import './Gauge.css';
export default class Gauge extends React.Component {


  render() {
    const { min = 0, max = 3000, value = 0 } = this.props;
    const position = ((value - min) / (max - min)) * 100;



    return (            
        
        <div class="gauge">
            <div class="label label-0">0</div>
            <div class="label label-1000">1000</div>
            <div class="label label-2000">2000</div>
            <div class="label label-3000">3000</div>
            <div className="marker" style={{ bottom: `${position}%` }}></div>
        </div>
    )
  }
}