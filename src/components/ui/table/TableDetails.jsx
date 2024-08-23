import React, { useState, useEffect } from "react";
import styles from "./Tables.module.css";
import icons from "../Icons.module.css";
import { EditIcon, SaveIcon, CancelIcon } from "../Icons.jsx";
import { calculateBalance } from "../../../utils/calculateBalance.js";
import TableSummaryHead from "./TableSumaryHead.jsx";
import TableAnnualLeave from "./TableAnnualLeave.jsx";
import TableTotalBalance from "./TableTotalBalance.jsx";
import TableEditButtons from "./TableEditButtons.jsx";
import TableEditButton from "./TableEditButton.jsx";
import TableInput from "./TableInput.jsx";

export default function TableDetails({
 timesheetIndex,
 sortedTimes,
 onTimesUpdate,
}) {
 const [editingIndex, setEditingIndex] = useState(null);
 const [editingField, setEditingField] = useState(null);
 const [editedCheckIn, setEditedCheckIn] = useState("");
 const [editedCheckOut, setEditedCheckOut] = useState("");

 const handleSave = () => {
  if (editingIndex !== null) {
   const updatedTimes = [...sortedTimes]; // Use sortedTimes directly
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
   <table className={styles.table}>
    <TableSummaryHead style={styles.thead} />
    <tbody>
     {sortedTimes.map((time, index) => (
      <tr key={index}>
       <td>{time.day}</td>
       {time.isHoliday ? (
        <TableAnnualLeave style={styles.annualLeaveDays} />
       ) : (
        <>
         <td>
          {editingIndex === index && editingField === "checkIn" ? (
           <>
            <TableInput
             editedValue={editedCheckIn}
             handler={handleInputChange}
            />
            <TableEditButtons onSave={handleSave} onCancel={handleCancel} />
           </>
          ) : (
           <>
            {time.checkIn}
            <TableEditButton
             onEditHandler={() => handleEditClick(index, "checkIn")}
            />
           </>
          )}
         </td>
         <td>
          {editingIndex === index && editingField === "checkOut" ? (
           <>
            <TableInput
             editedValue={editedCheckOut}
             handler={handleInputChange}
            />
            <TableEditButtons onSave={handleSave} onCancel={handleCancel} />
           </>
          ) : (
           <>
            {time.checkOut}
            <TableEditButton
             onEditHandler={() => handleEditClick(index, "checkOut")}
            />
           </>
          )}
         </td>
         <TableTotalBalance time={time} styles={styles} />
        </>
       )}
      </tr>
     ))}
    </tbody>
   </table>
   <hr
    style={{ border: "1px solid grey", width: "70%", margin: "20px auto" }}
   />
  </>
 );
}
