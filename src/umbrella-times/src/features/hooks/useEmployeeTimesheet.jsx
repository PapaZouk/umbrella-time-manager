import {useState} from "react";
import {initialEmployee,} from "../../resources/initialStates";

export const useEmployeeTimesheet = () => {
 const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
 const [error, setError] = useState("");
 const [isMonthLocked, setIsMonthLocked] = useState(false);

 const handleEmployeeSelect = (employee) => setSelectedEmployee(employee);

 const resetTimesheet = () => {
  setSelectedEmployee(initialEmployee);
  setIsMonthLocked(false);
  setError("");
 };

 return {
  selectedEmployee,
  isMonthLocked,
  handleEmployeeSelect,
 };
};
