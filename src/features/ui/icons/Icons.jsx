import styles from './styles/Icons.module.css';
import PropTypes from "prop-types";

export const EditIcon = ({ className = '', color = '#000' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke={color}
    className={`${styles.icon} ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 17.25V21h3.75l10.35-10.35-3.75-3.75L3 17.25zM14.75 6.75l3.75 3.75 2.25-2.25-3.75-3.75-2.25 2.25 2.25 2.25z"
    />
  </svg>
);

EditIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const SaveIcon = ({ className = '', color = '#28a745' }) => (
  <svg data-testid='save-icon'
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke={color}
    className={`${styles.icon} ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

SaveIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const CancelIcon = ({ className = '', color = '#dc3545' }) => (
  <svg data-testid='cancel-icon'
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke={color}
    className={`${styles.icon} ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

CancelIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const ErrorIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: '24px', height: '24px', marginRight: '15px', flexShrink: 0 }}
    >
      <path d="M11.983 2a1 1 0 01.893.553l.071.148 9.297 18.603a1 1 0 01-.719 1.406l-.112.02h-18.5a1 1 0 01-.883-1.47l.051-.096 9.296-18.602A1 1 0 0111.983 2zm-.003 14.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm0-9.5a1.25 1.25 0 00-1.243 1.122l-.007.128v6.25a1.25 1.25 0 002.493.128l.007-.128v-6.25a1.25 1.25 0 00-1.25-1.25z" />
    </svg>
);
