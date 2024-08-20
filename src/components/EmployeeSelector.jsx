import styles from './styles/EmployeeSelector.module.css';
import { employeesData } from '../resources/employeesData';

export default function EmployeeSelector({ onEmployeeSelect }) {
    const employees = employeesData();

    function handleChange(event) {
        const selectedName = event.target.value;
        const selectedEmployee = employees.find(employee => employee.name === selectedName);
        onEmployeeSelect(selectedEmployee);
    }

    return (
        <div className={styles.container}>
        <label className={styles.label}>Wybierz pracownika</label>
        <select className={styles.select} onChange={handleChange}>
            <option value="">Wybierz...</option>
            {employees.map((employee) => (
                <option
                    key={employee.name}
                    value={employee.name}
                >
                    {`${employee.name} ${employee.surname}`}
                </option>
            ))}
        </select>
    </div>
    );
}
