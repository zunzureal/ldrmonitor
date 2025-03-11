import React, { useEffect, useState } from 'react';
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useTheme } from 'next-themes';
import Link from 'next/link';

const DynamicIsland = () => {
  const [visible, setVisible] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`fixed z-10 bottom-5 left-1/2 transform -translate-x-1/2 backdrop-blur-md shadow-lg p-4 flex justify-center items-center border border-transparent rounded-full transition-transform duration-500 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${isDark ? 'bg-black bg-opacity-50 border-white border-opacity-20' : 'bg-white bg-opacity-80 border-black border-opacity-20'}`}>
      <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-current">
        <GithubIcon style={{ color: isDark ? '#fff' : '#000' }} />
      </a>
      <Link href="/about" passHref>
        <span className="hover:text-primary font-semibold ml-4">About</span>
      </Link>
      <Link href="/blog" passHref>
        <span className="hover:text-primary font-semibold ml-4">Blog</span>
      </Link>
      <Link href="/chatwithme" passHref>
        <span className="hover:text-primary font-semibold ml-4">AI Chat (Beta)</span>
      </Link>
      <Link href="https://drive.google.com/file/d/1IDZXwjA6Vojgcjw85etdM2xH_OftS_rO/view?usp=sharing" passHref>
        <span className="hover:text-primary font-semibold ml-4">CV</span>
      </Link>
    </div>
  );
};

export default DynamicIsland;