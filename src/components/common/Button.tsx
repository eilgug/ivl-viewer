'use client';
import React from 'react';
import { Button as ReactButton } from 'react-bootstrap';

const Button: React.FC<{ variant: string, label: string, handleClick?: () => void }> = ({ variant, label, handleClick }) => {
    return (
        <div className='d-grid gap-2'>
            <ReactButton variant={variant} id='submit' type='button' onClick={() => handleClick ? handleClick() : null}>{label}</ReactButton>
        </div >
    );
};

export default Button;
