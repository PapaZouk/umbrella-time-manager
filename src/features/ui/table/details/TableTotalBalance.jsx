import PropTypes from "prop-types";
import {calculateTotalHoursAndMinutes} from "../../../utils/calculators/calculateBalance";

const defaultTimeValue = {
    balance: 0,
}

export default function TableTotalBalance({ time = defaultTimeValue, styles = '' }) {
    const totalHoursAndMinutes = calculateTotalHoursAndMinutes(time.balance);

     return (
        <td data-testid='total-balance' className={styles["total-balance-cell"]}>
          <span
              className={
                  time.balance < 0
                      ? styles["total-balance-negative"]
                      : styles["total-balance-positive"]
              }
          >
           {time.balance} / {totalHoursAndMinutes}
          </span>
        </td>
    )
}

TableTotalBalance.propTypes = {
    time: PropTypes.object,
    styles: PropTypes.object,
};
