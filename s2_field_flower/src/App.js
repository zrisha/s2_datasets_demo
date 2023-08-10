import './App.css';
import Flower from './FieldFlower/FieldFlower';
import fieldCites from './data/field_cites_field_norm.json';
import fieldCitedBy from './data/field_cited_by_field_norm.json';
import SelectField from './SelectField';
import { useState } from 'react';

function App() {
  const [selectedFields, setFields] = useState(['computer sci'])

  const color = {
    primary: { base: "gold", highlight: "darkOrange" },
    secondary: { base: "tomato", highlight: "orangeRed" }
  }
  return (
    <div className="App">
      <header>
        <h3>Field Flowers: Visualizing Citation Patterns</h3>
        <SelectField 
          fields={Object.keys(fieldCites)}
          setFields={setFields}
          selectedFields={selectedFields}
        />
      </header>
      <section>
        {selectedFields.map((elem) => (
            <div className='flower-container'>
              <Flower
                fieldCites = {fieldCites}
                fieldCitedBy = {fieldCitedBy}
                field = {elem}
                color = {color}
                decimal={true}
                key={elem}
              />
              <h3>{elem}</h3>
          </div>
        ))}
        </section>
    </div>
  );
}

export default App;
