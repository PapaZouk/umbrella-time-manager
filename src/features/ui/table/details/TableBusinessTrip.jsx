import PropTypes from "prop-types";

export default function TableBusinessTrip({ style = '' }) {
    return (
        <td
            data-testid='table-business-trip-data'
            className={style.businessTrip}
            colSpan={4}
        >
            WYJAZD SŁUŻBOWY
        </td>
    );
};

TableBusinessTrip.propTypes = {
    style: PropTypes.string,
};
