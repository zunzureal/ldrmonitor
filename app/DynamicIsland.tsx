import React, { useEffect, useState, CSSProperties } from 'react';
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useTheme } from 'next-themes';
import Link from 'next/link';
import styles from './DynamicIsland.module.css'; // Import the CSS module

const DynamicIsland = () => {
  const [visible, setVisible] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`${styles.container} ${visible ? styles.visible : styles.hidden} ${isDark ? styles.dark : styles.light}`}>
      <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <GithubIcon style={{ color: isDark ? '#fff' : '#000' }} />
      </a>
      <Link href="/about" passHref>
        <span className={`${styles.hoverEffect} font-semibold ml-4`}>About</span>
      </Link>
      <Link href="/event" passHref>
        <span className={`${styles.hoverEffect} font-semibold ml-4`}>Event</span>
      </Link>
      <Link href="/cv" passHref>
        <span className={`${styles.hoverEffect} font-semibold ml-4`}>CV</span>
      </Link>
    </div>
  );
};

export default DynamicIsland;