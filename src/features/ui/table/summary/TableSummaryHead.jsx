import styles from "../styles/Tables.module.css";
import PropTypes from "prop-types";

export default function TableSummaryHead({ columns = []}) {
    return (
        <thead className={styles.thead}>
        <tr className={styles.tableMonthTitle}>
            {columns.map((column, index) =>
                <th
                    key={index}
                    data-testid={`summary-head-column-${index}`}
                >
                    {column}
                </th>
            )}
        </tr>
        </thead>
    );
}

TableSummaryHead.propTypes = {
    columns: PropTypes.array,
}
