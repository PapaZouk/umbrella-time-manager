import icons from "../../../../../../umbrella-web-common/src/icons/styles/Icons.module.css";
import PropTypes from "prop-types";

export default function TableButton({ onClickHandler, icon, ...props }) {
 return (
  <span>
   <button className={icons.iconButton} onClick={onClickHandler} {...props}>
    {icon}
   </button>
  </span>
 );
}

TableButton.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
};
