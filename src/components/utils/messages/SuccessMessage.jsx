import React from 'react';

export function SuccessMessage({ message }) {
    if (!message) return null;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '10px 15px',
            borderRadius: '5px',
            border: '1px solid #c3e6cb',
            marginTop: '10px',
        }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
            >
                <path d="M12 2a10 10 0 11-10 10 10 10 0 0110-10zm0 2a8 8 0 100 16 8 8 0 000-16zm-1.707 7.707a1 1 0 011.414 0l2.5 2.5a1 1 0 01-1.414 1.414L12 11.414l-1.207 1.207a1 1 0 01-1.414-1.414l2.5-2.5z" />
            </svg>
            {message}
        </div>
    );
}
