import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/header";
import AvailableShifts from "./components/shifts/availableShifts";
import MyShifts from "./components/shifts/myShifts";
import { navBarItems } from "./constants";
import ShiftsContext from "./store/context/ShiftsContext";
import "./styles/utility/flexbox.scss";
import "./styles/utility/utility.scss";
import { useApp } from "./useApp";

function App() {
  const [shifts, refreshShifts] = useApp();

  const [activeTab, setActiveTab] = useState(navBarItems.MY_SHIFTS);

  return (
    <div className="app-container">
      <ShiftsContext.Provider value={shifts}>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="app-content">
          {activeTab === navBarItems.MY_SHIFTS && <MyShifts refreshAPIResults={refreshShifts} />}
          {activeTab === navBarItems.AVAILABLE_SHIFTS && <AvailableShifts refreshAPIResults={refreshShifts} />}
        </div>
        <Toaster position={"bottom-center"} />
      </ShiftsContext.Provider>
    </div>
  );
}

export default App;
