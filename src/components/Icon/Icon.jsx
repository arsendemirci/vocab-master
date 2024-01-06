import React from 'react';
import { icons } from 'constants';


function Icon(props) {
    let { width, height, color } = props;
    width = width ?? 20;
    height = height ?? 20;
    return (
        <svg width={width} height={height} viewBox={icons[props.icon].viewBox}>
            <path fill="currentColor" d={icons[props.icon].d}></path>
        </svg>
    )
};



export default Icon;