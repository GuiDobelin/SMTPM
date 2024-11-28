import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
`;

export const FormWrapper = styled.div`
    width: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    width: 90%;
    margin: 10px auto; 
    padding: 10px;
    display: block;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

export const Message = styled.p`
    text-align: center;
    color: ${(props) => (props.error ? 'red' : 'green')};
    margin-top: 10px;
    font-size: 14px;
`;

export const SwitchMessage = styled.p`
    text-align: center;
    margin-top: 20px;
    font-size: 14px;

    a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;
    }

    a:hover {
        text-decoration: underline;
    }
`;
