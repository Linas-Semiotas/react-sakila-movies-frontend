import React from 'react';
import { MainContainer } from '../../components/Containers';

const RegisterSuccess = () => {
    return (
        <MainContainer title="Registration" textAlign='center'>
            <p  className="success-message">User created successfully</p>
        </MainContainer>
    );
};

export default RegisterSuccess;