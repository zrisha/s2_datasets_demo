import React from 'react';
import { VictoryLabel } from 'victory';

class CenterLabel extends React.Component {
  render() {
    const { datum, active, color } = this.props;
    const text = [ `${Math.round(datum['cites'] * 100) / 100}%`, 'of citations' ];

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
      ) :  null;
  }
}

export default CenterLabel;