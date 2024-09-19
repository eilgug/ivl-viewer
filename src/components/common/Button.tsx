'use client';
import React from 'react';
import { Button as ReactButton } from 'react-bootstrap';

const Button: React.FC<{ variant: string, label: string }> = ({ variant, label }) => {
    return (
        <div className='d-grid gap-2'>
            <ReactButton variant={variant} id='submit' type='button'>{label}</ReactButton>
        </div >
    );
};

export default Button;
