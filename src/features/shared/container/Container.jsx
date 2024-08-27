import "../styles/Container.module.css";
import PropTypes from "prop-types";

export default function Container({ fadeIn, children }) {
 return (
  <div className={`container ${fadeIn ? "container-appear" : ""}`}>
   {children}
  </div>
 );
}

Container.propTypes = {
 fadeIn: PropTypes.bool,
 children: PropTypes.node.isRequired,
};
