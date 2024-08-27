import React from "react";
import PropTypes from "prop-types";

export default function TableAnnualLeave({ style = '' }) {
    return (
        <td className={style} colSpan={4}>
        URLOP
       </td>
    )
}

TableAnnualLeave.propType = {
    style: PropTypes.string,
};
