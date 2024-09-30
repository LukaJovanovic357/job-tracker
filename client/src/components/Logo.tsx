import React from 'react';
import logo from '../assets/images/result.svg';

const Logo: React.FC = () => {
    return (
        <img
            src={logo}
            style={{ height: '80px', marginTop: 'auto' }}
            alt='job-finder logo'
            className='logo'
        />
    );
};

export default Logo;
