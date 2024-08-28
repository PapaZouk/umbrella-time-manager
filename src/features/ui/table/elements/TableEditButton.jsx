import { EditIcon } from "../../icons/Icons";
import TableButton from "./TableButton";
import PropTypes from "prop-types";

export default function TableEditButton({ onEditHandler, ...props }) {
 return <TableButton onClickHandler={onEditHandler} icon={<EditIcon />} {...props}/>;
}

TableEditButton.propTypes = {
 onEditHandler: PropTypes.func.isRequired,
};
