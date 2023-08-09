import './App.css';
import Flower from './FieldFlower/FieldFlower';
import fieldCites from './data/field_cites_field_norm.json';
import fieldCitedBy from './data/field_cited_by_field_norm.json';

function App() {
  const color = {
    primary: { base: "gold", highlight: "darkOrange" },
    secondary: { base: "tomato", highlight: "orangeRed" }
  }
  return (
    <div className="App">
          <div style={{width: '100%', margin: '25px', display: 'flex', flexWrap: 'wrap'}}>
            {Object.keys(fieldCites).map((elem) => (
              <div style={{width: '25%'}}>
                <Flower
                  fieldCites = {fieldCites}
                  fieldCitedBy = {fieldCitedBy}
                  field = {elem}
                  color = {color}
                  decimal={true}
                  key={elem}
                />
              </div>
            ))}
          </div>
    </div>
  );
}

export default App;