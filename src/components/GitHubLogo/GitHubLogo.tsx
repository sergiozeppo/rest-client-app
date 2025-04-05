'use client';

import { useTheme } from '@/Store/Theme';
import Image from 'next/image';

type GitHubLogoProps = {
  width?: number;
  height?: number;
};

export default function GitHubLogo({ width, height }: GitHubLogoProps) {
  const { theme } = useTheme();

  return (
    <Image
      src={
        theme === 'light'
          ? '/logos/github-mark.svg'
          : '/logos/github-mark-white.svg'
      }
      alt="GitHub Logo"
      width={width}
      height={height}
    />
  );
}
