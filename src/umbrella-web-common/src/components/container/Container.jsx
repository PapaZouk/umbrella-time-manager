import styles from "../styles/Container.module.css";
import PropTypes from "prop-types";

export function Container({ fadeIn, children, styleModule = styles }) {
 const containerAppear = fadeIn ? `${styleModule.containerAppear}` : "";
 return (
     <div className={`${styleModule.container} ${containerAppear}`}>
      {children}
     </div>
 );
};

Container.propTypes = {
 fadeIn: PropTypes.bool,
 children: PropTypes.node.isRequired,
 styleModule: PropTypes.object
};
