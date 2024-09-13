import TableButton from "./TableButton";
import { CancelIcon, SaveIcon } from "../../icons/Icons";
import PropTypes from "prop-types";

export default function TableEditButtons({ onSave, onCancel }) {
 return (
  <span>
   <TableButton
    onClickHandler={onSave}
    icon={<SaveIcon/>}
    data-testid='save-button'
   />
   <TableButton
    onClickHandler={onCancel}
    icon={<CancelIcon/>}
    data-testid='cancel-button'
   />
  </span>
 );
}

TableEditButtons.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
