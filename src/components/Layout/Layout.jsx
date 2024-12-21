import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import s from './Layout.module.scss';

const Layout = ({ children }) => {
  useEffect(() => {
    const container = document.querySelector(`.${s.container}`);
    
    const handleMouseMove = (event) => {
      const { clientX: mouseX, clientY: mouseY } = event;
      const { offsetWidth: width, offsetHeight: height } = container;
      
      const tiltX = ((mouseY / height) - 0.5) * 30; // 30 degrees tilt max on Y-axis
      const tiltY = ((mouseX / width) - 0.5) * 30;  // 30 degrees tilt max on X-axis
      
      // Apply the CSS custom properties to control the tilt
      container.style.setProperty('--tilt-x', `${tiltX}deg`);
      container.style.setProperty('--tilt-y', `${tiltY}deg`);
    };

    // Add the mousemove event listener
    container.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`${s.container} tilt`}>
      <div className={s.stars}>
        {Array.from({ length: 200 }).map((_, index) => (
          <div
            key={index}
            className={s.star}
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </div>
      <Navbar />
      <div className={`${s.content}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
