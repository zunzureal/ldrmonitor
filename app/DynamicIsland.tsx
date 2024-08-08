import React, { useEffect, useState } from 'react';
import { GithubIcon } from "@/components/icons";

const DynamicIsland = () => {
  const [visible, setVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setVisible(true);
    // Check if the user prefers dark mode
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    // Add an event listener to handle changes in the user's color scheme preference
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    darkModeMediaQuery.addEventListener('change', handleChange);

    // Clean up the event listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div style={{ ...styles.container, ...(visible ? styles.visible : styles.hidden), ...(isDarkMode ? styles.dark : styles.light) }}>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
        <GithubIcon style={{ color: isDarkMode ? '#fff' : '#000' }} />
      </a>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '20px', // Adjusted to float above the bottom
    left: '50%',
    transform: 'translateX(-50%)', // Center horizontally
    backdropFilter: 'blur(10px)', // Blur effect
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '10px 20px', // Adjusted padding
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0)', // Fully transparent border
    borderRadius: '10px', // Added border radius for rounded corners
    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out', // Animation properties
  },
  visible: {
    transform: 'translateX(-50%) translateY(0)', // Final position
    opacity: 1,
  },
  hidden: {
    transform: 'translateX(-50%) translateY(100%)', // Start position (off-screen)
    opacity: 0,
  },
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light mode background
    border: '1px solid rgba(0, 0, 0, 0.2)', // Light mode border
  },
  dark: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark mode background
    border: '1px solid rgba(255, 255, 255, 0.2)', // Dark mode border
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
};

export default DynamicIsland;