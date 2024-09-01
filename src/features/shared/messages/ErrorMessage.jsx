import PropTypes from "prop-types";

export function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div
            data-testid='error-message-popup'
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '15px 20px',
                    borderRadius: '5px',
                    border: '1px solid #f5c6cb',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    maxWidth: '80%',
                    animation: 'fadeInOut 5s forwards',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: '24px', height: '24px', marginRight: '15px', flexShrink: 0 }}
                >
                    <path d="M11.983 2a1 1 0 01.893.553l.071.148 9.297 18.603a1 1 0 01-.719 1.406l-.112.02h-18.5a1 1 0 01-.883-1.47l.051-.096 9.296-18.602A1 1 0 0111.983 2zm-.003 14.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm0-9.5a1.25 1.25 0 00-1.243 1.122l-.007.128v6.25a1.25 1.25 0 002.493.128l.007-.128v-6.25a1.25 1.25 0 00-1.25-1.25z" />
                </svg>
                {message}
            </div>
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
};
