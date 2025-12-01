import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse position values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the trailing effect
  // Mass increased to 0.2 to create a slight lag/trail behind the real cursor
  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Offset slightly (10px) to follow "behind" or to the side of the tip
      cursorX.set(e.clientX + 12);
      cursorY.set(e.clientY + 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleLinkHoverStart = () => setIsHovering(true);
    const handleLinkHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
           const newClickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
           newClickables.forEach(el => {
             el.removeEventListener('mouseenter', handleLinkHoverStart);
             el.addEventListener('mouseenter', handleLinkHoverStart);
             el.addEventListener('mouseleave', handleLinkHoverEnd);
           });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      {/* The Spark - Trailing the real arrow */}
      <motion.div
        animate={{ 
          rotate: isHovering ? 180 : 0,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ duration: 0.8, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        className="relative flex items-center justify-center"
      >
        {/* Glowing 4-point star shape */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" 
            fill={isHovering ? "#F43F5E" : "#8B5CF6"} 
            className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;