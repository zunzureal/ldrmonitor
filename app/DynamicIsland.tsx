import React, { useEffect, useState, CSSProperties } from 'react';
import { GithubIcon } from "@/components/icons";
import { useTheme } from 'next-themes';

const DynamicIsland = () => {
  const [visible, setVisible] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div style={{ ...styles.container, ...(visible ? styles.visible : styles.hidden), ...(isDark ? styles.dark : styles.light) }}>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
        <GithubIcon style={{ color: isDark ? '#fff' : '#000' }} />
      </a>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
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