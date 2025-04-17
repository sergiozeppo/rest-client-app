'use client';

import { useTheme } from '@/Store/Theme';
import Image from 'next/image';

export default function GitHubLogo() {
  const { theme } = useTheme();

  return (
    <Image
      src={`/logos/github-${theme}.svg`}
      alt="GitHub Logo"
      width={30}
      height={30}
    />
  );
}
