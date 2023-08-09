import React from 'react';

function Pistil(props){
  const { origin, innerRadius, color } = props;
  const circleStyle = {
    stroke: color.secondary.base, strokeWidth: 2, fill: color.primary.base
  };
  return (
    <g>
      <circle
        cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
      />
    </g>
  );
}


export default Pistil;