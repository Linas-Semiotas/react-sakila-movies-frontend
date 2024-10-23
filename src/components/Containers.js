import React from 'react';
import '../styles/Components.css';

export const AppLayout= ({ children }) => {
    return (
        <div className="app-layout">
            {children}
        </div>
    );
};

export const AppContainer = ({ children }) => {
    return (
        <div className="app-container">
            {children}
        </div>
    );
};

export const MainContainer = ({ children, title, padding = "29px", textAlign = "none" }) => {
    return (
        <div>
            {title && <div className='page-title'>{title}</div>}
            <div className="main-container" style={{ padding: padding, textAlign : textAlign }}>
                {children}
            </div>
        </div>
    );
};

export const MainContainerMedium = ({ children, title, padding = "29px" }) => {
    return (
        <div>
            {title && <div className='page-title'>{title}</div>}
            <div className="main-container-medium" style={{ padding: padding }}>
                {children}
            </div>
        </div>
    );
};

export const MainContainerSmall = ({ children, title }) => {
    return (
        <div>
            <div className='page-title'>{title}</div>
            <div className="main-container-small">
                {children}
            </div>
        </div>
    );
};

export const InsideContainer = ({ children }) => {
    return (
        <div>
            <div className="main-container">
                {children}
            </div>
        </div>
    );
};