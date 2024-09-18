import PropTypes from "prop-types";

export default function TableDetailsDayOffType({ style, dayOffType }) {
    let dataStyle;
    if (dayOffType === "Urlop") {
        dataStyle = style.annualLeaveDays;
    } else if (dayOffType === "Urlop macierzyński") {
        dataStyle = style.maternityLeave;
    } else if (dayOffType === "Bezpłatny urlop") {
        dataStyle = style.unpaidLeave;
    } else if (dayOffType === "Zwolnienie lekarskie") {
        dataStyle = style.sickLeave;
    } else if (dayOffType === "Urlop okazjonalny") {
        dataStyle = style.occasionalLeave;
    } else if (dayOffType === "Urlop wychowawczy") {
        dataStyle = style.parentalLeave;
    } else {
        dataStyle = style.annualLeaveDays;
    }

    return (
        <td data-testid='day-off-type-data' className={dataStyle} colSpan={4}>
            {dayOffType.toUpperCase()}
        </td>
    );
};

TableDetailsDayOffType.propTypes = {
    style: PropTypes.object,
    dayOffType: PropTypes.string,
};
