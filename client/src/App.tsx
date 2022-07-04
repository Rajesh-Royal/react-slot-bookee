import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { getListOfAllShifts, ISingleShift } from './api/controllers/get-all-shifts';
import Header from './components/header';
import AvailableShifts from './components/shifts/availableShifts';
import MyShifts from './components/shifts/myShifts';
import { navBarItems } from './constants';
import "./styles/utility/flexbox.scss";
import "./styles/utility/utility.scss";

function App() {
  const [shiftsData, setShiftsData] = useState<ISingleShift[]>([]);
  useEffect(() => {
    getListOfAllShifts().then((allShifts) => {
      setShiftsData(allShifts.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  const [activeTab, setActiveTab] = useState(navBarItems.MY_SHIFTS);
  
  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-content">
        {activeTab === navBarItems.MY_SHIFTS && <MyShifts shiftsData={shiftsData} />}
        {activeTab === navBarItems.AVAILABLE_SHIFTS && <AvailableShifts shiftsData={shiftsData} />}
      </div>
      <Toaster position={'bottom-center'} />
    </div>
  );
}

export default App;
