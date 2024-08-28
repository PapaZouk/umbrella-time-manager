import "../styles/Container.module.css";
import PropTypes from "prop-types";

export function Container({ fadeIn, children }) {
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
