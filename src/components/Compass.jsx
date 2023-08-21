import React from 'react';
import './Compass.css';

export default class Compass extends React.Component {
render() {
    
    const { min = 0, max = 360, value = 0 } = this.props;
    var angle = (value - min) / (max - min) * 360; //no need for calculation  - 90 and inv 90 and 180?
    return (<div class="artificial-horizon">
        <div class="label label-0">0</div>
        <div class="label label-90">90</div>
        <div class="label label-180">180</div>
        <div class="label label-270">270</div>
        <div class="arrow"  style={{ transform: `rotate(${angle}deg)` }}></div>
    </div>
    )
        }

}