import "../../../styles/components/myShifts.scss";


const MyShifts = () => {
  return (
    <div className="my-shifts">
      <h3 title="date-time" className="heading-bold">Today <span className="shift-data">2 shifts, 4 h</span></h3>
      <div title="shift-details" className="shift-details">
        <div className="shift-timing">
          <p className="time">12:00-14:00</p>
          <p className="city">Helsinki</p>
        </div>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default MyShifts