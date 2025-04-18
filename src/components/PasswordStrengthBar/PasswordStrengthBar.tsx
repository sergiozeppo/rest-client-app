'use client';

import { calculatePassStrength } from '@/utils/calculatePassStrength/calculatePassStrength';
import styles from './PasswordStrengthBar.module.scss';

type Props = {
  password: string;
};

export default function PasswordStrengthBar({ password }: Props) {
  const strength = calculatePassStrength(password || '');

  const isHidden = strength === 0;

  return (
    <div
      className={styles['strength-meter']}
      style={{
        visibility: isHidden ? 'hidden' : 'visible',
        height: '8px',
      }}
    >
      {[...Array(5)].map((_, i) => {
        const segmentClass = i < strength ? styles[`strength-${strength}`] : '';
        return (
          <div
            key={i}
            className={`${styles['strength-segment']} ${segmentClass}`}
          />
        );
      })}
    </div>
  );
}
