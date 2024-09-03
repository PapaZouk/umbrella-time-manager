import PropTypes from "prop-types";

export default function TableBusinessTrip({ style = '' }) {
    return (
        <td className={style} colSpan={4}>
            WYJAZD SŁUŻBOWY
        </td>
    );
};

TableBusinessTrip.propTypes = {
    style: PropTypes.string,
};
