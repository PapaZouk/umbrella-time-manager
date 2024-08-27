import PropTypes from "prop-types";

export default function TableTotalBalance({ time, styles }) {
    return (
        <td className={styles["total-balance-cell"]}>
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
    time: PropTypes.string,
    styles: PropTypes.shape({
    "total-balance-cell": PropTypes.string.isRequired,
    "total-balance-negative": PropTypes.string.isRequired,
    "total-balance-positive": PropTypes.string.isRequired,
}).isRequired,
};
