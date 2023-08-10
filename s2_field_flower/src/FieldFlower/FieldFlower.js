import React from 'react';
import CenterLabel from './CenterLabel';
import Pistil from './Pistil';
import omit from 'lodash/omit'
import {VictoryChart, VictoryPolarAxis, VictoryStack, VictoryBar, VictoryTheme} from 'victory';



class Flower extends React.Component {

  formatData(targetField, otherFields, targetFieldCited, percentFactor) {
    return Object.keys(otherFields).map((field) => {
      const cites = targetField[field] * percentFactor;
      const citedBy =  targetFieldCited[field] * percentFactor;
      return {
        cites,
        citedBy: 100*(citedBy / (cites + citedBy)),
        length: 100 - 100*(citedBy / (cites + citedBy)),
        field
      };
    });
  }

  render() {
    const { color, field, fieldCites, fieldCitedBy, decimal } = this.props;

    const targetField = fieldCites[field];
    const otherFields = omit(targetField, field);
    const targetFieldCited = fieldCitedBy[field];

    const percentFactor = decimal ? 100 : 1;

    const data = this.formatData(targetField, otherFields, targetFieldCited, percentFactor);

    return (
      <VictoryChart
        polar
        label={field}
        animate={{duration: 1500, delay: 200, onLoad: {duration: 1500}, onEnter: {duration: 1500}}}
        theme={VictoryTheme.material}
        innerRadius={(targetField[field] *  percentFactor) * .85}
        padding={55}
        domainPadding={{ y: 10 }}
        events={[{
          childName: "all",
          target: "data",
          eventHandlers: {
            onMouseOver: () => {
              return [
                { target: "labels", mutation: () => ({ active: true }) },
                { target: "data", mutation: () => ({ active: true }) }
              ];
            },
            onMouseOut: () => {
              return [
                { target: "labels", mutation: () => ({ active: false }) },
                { target: "data", mutation: () => ({ active: false }) }
              ];
            }
          }
        }]}
      >
        <VictoryPolarAxis
          dependentAxis
          labelPlacement="vertical"
          style={{ axis: { stroke: "none" } }}
          tickFormat={() => ""}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          style={{
            axisLabel: {fontSize: 9},
            tickLabels: {fontSize: 9}
          }}
          tickValues={Object.keys(otherFields).map((k) => +k)}
          tickFormat={Object.keys(otherFields)}
        />
        <VictoryStack>
          <VictoryBar
            style={{ data: {
              fill: ({ active }) => active ? color.primary.highlight : color.primary.base,
              width: ({datum}) => 2+ datum.cites
            } }}
            data={data}
            x="field"
            y="length"
            labels={() => ""}
            labelComponent={<CenterLabel data={data} color={color.primary}/>}
          />

          <VictoryBar
            style={{ data: {
              fill: (d, a) => a ? color.secondary.highlight : color.secondary.base,
              width: ({datum}) => 2 + datum.cites
            } }}
            data={data}
            x="field"
            y="citedBy"
            labels={() => ""}
            labelComponent={<CenterLabel field={field} data={data} color={color.secondary}/>}
          />
        </VictoryStack>
        <Pistil color={color} innerRadius={(targetField[field] * percentFactor) * .85} />
      </VictoryChart>
    );
  }
 }

export default Flower;
