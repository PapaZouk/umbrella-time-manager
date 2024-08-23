import React, { useState, useEffect } from "react";
import styles from "./Tables.module.css";
import icons from "./Icons.module.css";
import { EditIcon, SaveIcon, CancelIcon } from "../ui/Icons.jsx";
import { calculateBalance } from "../../utils/calculateBalance";

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
    <thead className={styles.thead}>
     <tr>
      <th>Dzień</th>
      <th>Przyjście</th>
      <th>Wyjście</th>
      <th>Bilans (min)</th>
     </tr>
    </thead>
    <tbody>
     {sortedTimes.map((time, index) => (
      <tr key={index}>
       <td>{time.day}</td>
       {time.isHoliday ? (
        <td className={styles.holiday} colSpan={4}>
         URLOP
        </td>
       ) : (
        <>
         <td>
          {editingIndex === index && editingField === "checkIn" ? (
           <>
            <input
             type="time"
             value={editedCheckIn}
             onChange={handleInputChange}
            />
            <span>
             <button className={icons["icon-button"]} onClick={handleSave}>
              <SaveIcon className={icons.icon} />
             </button>
             <button className={icons["icon-button"]} onClick={handleCancel}>
              <CancelIcon className={icons.icon} />
             </button>
            </span>
           </>
          ) : (
           <>
            {time.checkIn}
            <button
             className={icons["icon-button"]}
             onClick={() => handleEditClick(index, "checkIn")}
            >
             <EditIcon className={icons.icon} />
            </button>
           </>
          )}
         </td>
         <td>
          {editingIndex === index && editingField === "checkOut" ? (
           <>
            <input
             type="time"
             value={editedCheckOut}
             onChange={handleInputChange}
            />
            <span>
             <button className={icons["icon-button"]} onClick={handleSave}>
              <SaveIcon className={icons.icon} />
             </button>
             <button className={icons["icon-button"]} onClick={handleCancel}>
              <CancelIcon className={icons.icon} />
             </button>
            </span>
           </>
          ) : (
           <>
            {time.checkOut}
            <button
             className={icons["icon-button"]}
             onClick={() => handleEditClick(index, "checkOut")}
            >
             <EditIcon className={icons.icon} />
            </button>
           </>
          )}
         </td>
         <td className={styles["total-balance-cell"]}>
          <span
           className={
            time.balance < 0
             ? styles["total-balance-negative"]
             : styles["total-balance-positive"]
           }
          >
           {time.balance}
          </span>
         </td>
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
