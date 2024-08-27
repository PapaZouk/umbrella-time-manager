import icons from "../icons/styles/Icons.module.css";
import PropTypes from "prop-types";

export default function TableButton({ onClickHandler, icon }) {
 return (
  <span>
   <button className={icons.iconButton} onClick={onClickHandler}>
    {icon}
   </button>
  </span>
 );
}

TableButton.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
};
