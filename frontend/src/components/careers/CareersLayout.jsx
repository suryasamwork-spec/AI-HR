import React from 'react';
import CareersHeader from './CareersHeader';
import CareersFooter from './CareersFooter';

const CareersLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1120]">
      <CareersHeader />
      <main className="flex-grow">
        {children}
      </main>
      <CareersFooter />
    </div>
  );
};

export default CareersLayout;
