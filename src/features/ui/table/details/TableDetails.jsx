import {useState} from "react";
import styles from "../styles/Tables.module.css";
import {calculateBalance} from "../../../utils";
import TableDetailsHead from "./TableDetailsHead.jsx";
import TableTotalBalance from "./TableTotalBalance.jsx";
import TableCheckInCell from "./TableCheckInCell";
import TableCheckOutCell from "./TableCheckOutCell";
import {EndLine} from "../../../shared";
import PropTypes from "prop-types";
import TableDetailsDayOffType from "./TableDetailsDayOffType";
import TableBusinessTrip from "./TableBusinessTrip";

export default function TableDetails({
 sortedTimes,
 onTimesUpdate,
}) {
 const [editingIndex, setEditingIndex] = useState(null);
 const [editingField, setEditingField] = useState(null);
 const [editedCheckIn, setEditedCheckIn] = useState("");
 const [editedCheckOut, setEditedCheckOut] = useState("");

 const handleSave = () => {
  if (editingIndex !== null) {
   const updatedTimes = [...sortedTimes];
   const updatedCheckIn =
    editingField === "checkIn"
     ? editedCheckIn
     : updatedTimes[editingIndex].checkIn;
   const updatedCheckOut =
    editingField === "checkOut"
     ? editedCheckOut
     : updatedTimes[editingIndex].checkOut;

   const updatedBalance = calculateBalance(updatedCheckIn, updatedCheckOut, 8);

   updatedTimes[editingIndex] = {
    ...updatedTimes[editingIndex],
    checkIn: updatedCheckIn,
    checkOut: updatedCheckOut,
    balance: updatedBalance,
   };

   onTimesUpdate(updatedTimes);

   setEditingIndex(null);
   setEditingField(null);
   setEditedCheckIn("");
   setEditedCheckOut("");
  }
 };

 const handleEditClick = (index, field) => {
  setEditingIndex(index);
  setEditingField(field);
  if (field === "checkIn") {
   setEditedCheckIn(sortedTimes[index].checkIn);
  } else if (field === "checkOut") {
   setEditedCheckOut(sortedTimes[index].checkOut);
  }
 };

 const handleInputChange = (event) => {
  if (editingField === "checkIn") {
   setEditedCheckIn(event.target.value);
  } else if (editingField === "checkOut") {
   setEditedCheckOut(event.target.value);
  }
 };

 const handleCancel = () => {
  setEditingIndex(null);
  setEditingField(null);
  setEditedCheckIn("");
  setEditedCheckOut("");
 };

 return (
  <>
   <table data-testid='table-details' className={styles.table}>
    <TableDetailsHead style={styles.thead} />
    <tbody>
     {sortedTimes.map((time, index) => (
      <tr key={index}>
       <td>{time.day}</td>
       {
        time.isBusinessTrip ? <TableBusinessTrip style={styles}/> :
         time.isHoliday ||
         time.isBusinessTrip ||
         time.isSickLeave ||
         time.isUnpaidLeave ||
         time.isMaternityLeave ||
         time.isOccasionalLeave ||
         time.isParentalLeave
           ? <TableDetailsDayOffType style={styles} dayOffType={time.dayOff}/>
           : (
               <>
                <TableCheckInCell
                    time={time}
                    editingIndex={editingIndex}
                    index={index}
                    editedCheckIn={editedCheckIn}
                    editingField={editingField}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    handleEditClick={handleEditClick}
                />
                <TableCheckOutCell
                    time={time}
                    editingIndex={editingIndex}
                    index={index}
                    editedCheckOut={editedCheckOut}
                    editingField={editingField}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    handleEditClick={handleEditClick}
                />
                <TableTotalBalance time={time} styles={styles} />
               </>
           )
       }
      </tr>
     ))}
    </tbody>
   </table>
   <EndLine />
  </>
 );
}

TableDetails.propTypes = {
 sortedTimes: PropTypes.array,
 onTimesUpdate: PropTypes.func,
}
