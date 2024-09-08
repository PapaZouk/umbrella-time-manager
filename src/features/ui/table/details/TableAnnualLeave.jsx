import PropTypes from "prop-types";

export default function TableAnnualLeave({ style = '', annualLeaveType }) {
    return (
        <td className={style} colSpan={4}>
            {annualLeaveType.toUpperCase()}
       </td>
    )
}

TableAnnualLeave.propTypes = {
    style: PropTypes.string,
    annualLeaveType: PropTypes.string,
};
