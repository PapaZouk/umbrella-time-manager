import styles from "../styles/Container.module.css";
import PropTypes from "prop-types";

export function Container({ children, styleModule = styles }) {
 return (
     <div className={`${styleModule.container} ${styleModule.containerAppear}`}>
      {children}
     </div>
 );
};

Container.propTypes = {
 fadeIn: PropTypes.bool,
 children: PropTypes.node.isRequired,
 styleModule: PropTypes.object
};
