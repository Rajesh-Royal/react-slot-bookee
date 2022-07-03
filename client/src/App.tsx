import { useState } from 'react';
import Header from './components/header';
import { navBarItems } from './constants';
import "./styles/utility/flexbox.scss";
import "./styles/utility/utility.scss";

function App() {
  // useEffect(() => {
  //   getListOfAllShifts().then((data) => {
  //     console.log(data);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }, [])
  const [activeTab, setActiveTab] = useState(navBarItems.MY_SHIFTS);
  
  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-content">
        {/* {activeTab === navBarItems.MY_SHIFTS && <MyShifts />}
        {activeTab === navBarItems.AVAILABLE_SHIFTS && <AvailableShifts />} */}
      </div>
    </div>
  );
}

export default App;
