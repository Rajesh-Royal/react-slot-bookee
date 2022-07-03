import "../../../styles/components/myShifts.scss";


const MyShifts = () => {
  return (
    <div className="shifts-container">
      <h3  className="shift-group">Today <span className="shift-data">2 shifts, 4 h</span></h3>
      <div className="shift-details">
        <div className="shift-timing">
          <p className="time">12:00-14:00</p>
          <p className="city">Helsinki</p>
        </div>
        <button className="btn-pink">Cancel</button>
      </div>
    </div>
  )
}

export default MyShifts