import PropTypes from "prop-types";

export default function TableTraining({ trainingType }) {

    return (
        <td
            data-testid='table-training-data'
            colSpan={4}
        >
            SZKOLENIE: {trainingType.toUpperCase()}
        </td>
    );
};

TableTraining.propTypes = {
    trainingType: PropTypes.string,
};
