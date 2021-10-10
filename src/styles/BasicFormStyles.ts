import styled from 'styled-components';

const BasicFormStyles = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    label {
        display: flex;
        gap: 0.5em;
        align-items: center;
        justify-content: space-between;
    }
`;

export default BasicFormStyles;
