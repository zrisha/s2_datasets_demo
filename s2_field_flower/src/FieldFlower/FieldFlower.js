import React from 'react';
import CenterLabel from './CenterLabel';
import Pistil from './Pistil';
import omit from 'lodash/omit'
import {VictoryChart, VictoryPolarAxis, VictoryStack, VictoryBar, VictoryTheme} from 'victory';
import sortBy from 'lodash/sortBy';



class Flower extends React.Component {

  formatData(targetField, otherFields, targetFieldCited, percentFactor) {
    return Object.keys(otherFields).map((field) => {
      const cites = targetField[field] * percentFactor;
      const citedBy =  targetFieldCited[field] * percentFactor;
      return {
        cites,
        citedBy: 100 * (citedBy / (cites + citedBy)),
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
    let data = this.formatData(targetField, otherFields, targetFieldCited, percentFactor);
    data = sortBy(data, o => o.field)

    return (
      <VictoryChart
        polar
        label={field}
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
          tickFormat={Object.keys(otherFields).sort()}
        />
        <VictoryStack>
          <VictoryBar
            style={{ data: {
              fill: color.primary.base,
              width: ({datum}) => 2 + datum.cites
            } }}
            data={data}
            x="field"
            y="length"
            labels={() => ""}
            labelComponent={<CenterLabel valKey='length' field={field} color={color.secondary}/>}
          />

          <VictoryBar
            style={{ data: {
              fill: color.secondary.base,
              width: ({datum}) => 2 + datum.cites
            } }}
            data={data}
            x="field"
            y="citedBy"
            labels={() => ""}
            labelComponent={<CenterLabel valKey='citedBy'  field={field} color={color.secondary}/>}
          />
          
        </VictoryStack>
        <Pistil
          color={color} 
          citesSelf={targetField[field]}
          innerRadius={(targetField[field] * percentFactor) * .85} />
      </VictoryChart>
    );
  }
 }

export default Flower;
