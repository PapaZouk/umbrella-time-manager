import styles from "../styles/Container.module.css";
import PropTypes from "prop-types";

export function Container({ fadeIn, children }) {
 const containerAppear = fadeIn ? `${styles.containerAppear}` : "";
 return (
  <div className={`${styles.container} ${containerAppear}`}>
   {children}
  </div>
 );
}

Container.propTypes = {
 fadeIn: PropTypes.bool,
 children: PropTypes.node.isRequired,
};
