import PropTypes from "prop-types";

export default function TableAnnualLeave({ style = '' }) {
    return (
        <td className={style} colSpan={4}>
        URLOP
       </td>
    )
}

TableAnnualLeave.propTypes = {
    style: PropTypes.string,
};
