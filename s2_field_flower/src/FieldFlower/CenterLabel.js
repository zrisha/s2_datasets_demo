import React from 'react';
import { VictoryLabel } from 'victory';

class CenterLabel extends React.Component {
  render() {
    const { datum, active, color, field } = this.props;
    const text = [ `${datum.xName}`, `${Math.round(datum._y1)}` ];
    const baseStyle = { fill: color.highlight, textAnchor: "middle" };
    const style = [
      { ...baseStyle, fontSize: 12 },
      { ...baseStyle, fontSize: 12 }
    ];

    return active ?
      (
        <VictoryLabel
          text={text} style={style} x={175} y={175} renderInPortal
        />
      ) : 
      <VictoryLabel
        text={() => field ? field.split(' ') : ""} style={style} x={175} y={175} renderInPortal
      />;
  }
}

export default CenterLabel;