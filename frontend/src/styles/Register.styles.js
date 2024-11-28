import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

export const FormWrapper = styled.div`
    width: 400px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

export const Input = styled.input`
    width: 90%; /* Espaçamento igual para os lados */
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Message = styled.p`
    text-align: center;
    margin: 10px 0;
    color: ${({ error }) => (error ? 'red' : 'green')};
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
