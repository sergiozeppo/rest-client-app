import styles from './ResponseStatus.module.scss';
import { useFetch } from '@/Store/useFetch';
import getColoringStatus from '@/utils/getColoringStatus/getColoringStatus';
import { getStatusText } from '@/utils/getStatusText/getStatusText';
import { useTranslations } from 'next-intl';

export default function ResponseStatus() {
  const status = useFetch((state) => state.status);
  const statusText = getStatusText(status);
  const time = useFetch((state) => state.time);
  const size = useFetch((state) => state.size);
  const coloringStatus = getColoringStatus({ status, time, size });
  const t = useTranslations('ResponseStatus');
  return (
    <div className={styles.header}>
      {status > 0 ? (
        <>
          <p>
            {t('Status')}:{' '}
            <span
              style={{
                fontWeight: 'bold',
                color: coloringStatus.statusColor,
              }}
            >
              {status} {` "${statusText}"`}
            </span>
          </p>
          <p>
            {t('Size')}:{' '}
            <span
              style={{ fontWeight: 'bold', color: coloringStatus.sizeColor }}
            >
              {size} kb
            </span>
          </p>
          <p>
            {t('Time')}:{' '}
            <span
              style={{ fontWeight: 'bold', color: coloringStatus.timeColor }}
            >
              {time} ms
            </span>
          </p>
        </>
      ) : (
        <>
          <p>{t('Status')}: </p>
          <p>{t('Size')}: </p>
          <p>{t('Time')}: </p>
        </>
      )}
    </div>
  );
}
