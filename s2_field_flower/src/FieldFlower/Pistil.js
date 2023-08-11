import React from 'react';
import { VictoryLabel } from 'victory';
import { useState } from 'react';

function Pistil(props){
  const [hovered, setHovered] = useState(false)
  const { origin, innerRadius, color, citesSelf } = props;

  const baseStyle = { fill: color.secondary.highlight, textAnchor: "middle" };
  const style = [
    { ...baseStyle, fontSize: 12 },
    { ...baseStyle, fontSize: 12 }
  ];

  const circleStyle = {
    stroke: color.secondary.base, strokeWidth: 2, fill: color.primary.base
  };
  
  return <>
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <circle
        cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
      />
    </g>
    {hovered && <VictoryLabel
      text={[`${Math.round((citesSelf*100) * 100) / 100}%`, 'self citation']} style={style} x={175} y={175} renderInPortal
    />}
  </>
}


export default Pistil;