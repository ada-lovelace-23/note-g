import React from 'react';
import './Content.css'

const Content = ({ children }) => {
    return (
        <div className="contentWrapper">
          {children}
        </div>
    );
};

export default Content;
