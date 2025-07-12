import React from 'react';

const Footer = () => {
  return (
    <div className='h-20'>
      <footer className='fixed bottom-0 left-0 w-full footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 z-50'>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by RSG
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
