import TableButton from "./TableButton";
import { CancelIcon, SaveIcon } from "../icons/Icons";
import PropTypes from "prop-types";

export default function TableEditButtons({ onSave, onCancel }) {
 return (
  <span>
   <TableButton
    onClickHandler={onSave}
    icon={<SaveIcon/>}
   />
   <TableButton
    onClickHandler={onCancel}
    icon={<CancelIcon/>}
   />
  </span>
 );
}

TableEditButtons.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
