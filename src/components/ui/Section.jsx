import styles from 'styled-components';

const PageSection = styles.section`
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
`

export default function Section({children, ...props}) {
    return (
        <PageSection {...props}>{children}</PageSection>
    );
}