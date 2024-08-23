import React from 'react';
import styles from './Icons.module.css';

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

export const SaveIcon = ({ className = '', color = '#28a745' }) => (
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
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const CancelIcon = ({ className = '', color = '#dc3545' }) => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
