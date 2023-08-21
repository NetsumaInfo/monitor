import React from 'react';
export default class Circle extends React.Component {
    render() {
        const { adi = 0 } = this.props;
        const percentage = (adi + 100) / 200;
        const blue = Math.round(percentage * 255);
        const green = Math.round((1 - percentage) * 255);
        const background = `linear-gradient(to bottom, rgb(0, 0, ${blue}) 0%, rgb(0, ${green}, 0) 100%)`;
        return (
        <div id="horizon" style={{width: '200px',  height: '200px', borderRadius: '50%',background}} >
        </div>  )
    }
}