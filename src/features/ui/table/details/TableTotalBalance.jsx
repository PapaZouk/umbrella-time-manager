import PropTypes from "prop-types";

const defaultTimeValue = {
    balance: 0,
}

export default function TableTotalBalance({ time = defaultTimeValue, styles = '' }) {
    return (
        <td data-testid='total-balance' className={styles["total-balance-cell"]}>
          <span
           className={
            time.balance < 0
             ? styles["total-balance-negative"]
             : styles["total-balance-positive"]
           }
          >
           {time.balance} / {Number(time.balance / 60).toFixed(2)}
          </span>
         </td>
    )
}

TableTotalBalance.propTypes = {
    time: PropTypes.object,
    styles: PropTypes.string,
};
