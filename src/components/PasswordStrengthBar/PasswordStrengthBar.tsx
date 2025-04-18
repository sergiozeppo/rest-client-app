'use client';

import { calculatePassStrength } from '@/utils/calculatePassStrength/calculatePassStrength';
import styles from './PasswordStrengthBar.module.scss';

type Props = {
  password: string;
};

export default function PasswordStrengthBar({ password }: Props) {
  const strength = calculatePassStrength(password || '');

  return (
    <div className={styles['strength-meter']}>
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
