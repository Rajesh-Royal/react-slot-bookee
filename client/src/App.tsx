import { useEffect } from 'react';
import { getListOfAllShifts } from './api/controllers/get-all-shifts';
import "./styles/utility/utility.scss";

function App() {
  useEffect(() => {
    getListOfAllShifts().then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  
  return (
    <div className="App">
      <p className="text-green">this is the green heading</p>
    </div>
  );
}

export default App;
