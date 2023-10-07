import React from 'react';
import heroImg from '../assets/images/hero/hero.png';

const ComingSoon = () => {
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
      <img className='img-fluid col-lg-6' src={heroImg} alt="Hero" />
      <p className='text-purple fs-3 fw-medium'>Coming Soon...</p>
    </div>
  );
};

export default ComingSoon;
