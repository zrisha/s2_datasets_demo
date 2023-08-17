import './App.css';
import Flower from './FieldFlower/FieldFlower';
import fieldCitesS2 from './data/field_cites_field_norm.json';
import fieldCitedByS2 from './data/field_cited_by_field_norm.json';
import fieldCitesMag from './data/field_cites_field_norm_mag.json';
import fieldCitedByMag from './data/field_cited_by_field_norm_mag.json';
import SelectField from './SelectField';
import { Switch } from 'antd';
import { useState } from 'react';

function App() {
  const [selectedFields, setFields] = useState([])
  const [dataset, setDataset] = useState(['s2'])

  const color = {
    primary: { base: "gold", highlight: "darkOrange" },
    secondary: { base: "tomato", highlight: "orangeRed" }
  }

  const onChange = () => {
    const newDataset = dataset == 's2' ? 'mag' : 's2';
    const newFields = newDataset == 's2' ? fieldCitesS2 : fieldCitesMag;
    const newSelected = selectedFields.filter(field => Object.keys(newFields).includes(field))
    setFields(newSelected)
    setDataset(newDataset)
  }
  
  const fieldCites = dataset == 's2' ? fieldCitesS2 : fieldCitesMag;
  const fieldCitedBy = dataset == 's2' ? fieldCitedByS2 : fieldCitedByMag;

  return (
    <div className="App">
      <header>
        <h3>Field Flowers: Visualizing Citation Patterns</h3>
        <div>
          
          <h6>
            <strong>Change Data:</strong> {dataset == 's2' ? 'S2 Sample from 1990-2010' : 'MAG all years'}
          </h6>
          <Switch defaultChecked onChange={onChange}/>
        </div>
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
