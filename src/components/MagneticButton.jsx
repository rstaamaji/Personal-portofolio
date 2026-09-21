// src/components/MagneticButton.jsx
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './MagneticButton.css';

export default function MagneticButton({
  children,
  href,
  to,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  className = '',
  target,
  rel,
  title,
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.25;
    const y = (e.clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  let Component = 'button';
  let props = { onClick, type: 'button', title };

  if (to || (href && href.startsWith('/'))) {
    Component = Link;
    props = { to: to || href, title };
  } else if (href) {
    Component = 'a';
    props = { href, target, rel, title };
  }

  return (
    <Component
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      className={`magnetic-btn magnetic-btn--${variant} ${className}`}
      {...props}
    >
      <span className="magnetic-btn-inner">{children}</span>
    </Component>
  );
}
