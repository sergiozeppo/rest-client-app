interface ColoringProps {
  status: number;
  time: number;
  size: string;
}

export default function getColoringStatus({
  status,
  time,
  size,
}: ColoringProps) {
  const statusColor =
    status >= 200 && status < 300
      ? 'var(--color-status-green)'
      : 'var(--color-status-red)';
  const timeColor =
    time <= 200
      ? 'var(--color-status-green)'
      : time <= 1000
        ? 'var(--color-status-yellow)'
        : 'var(--color-status-red)';
  const sizeColor =
    +size <= 100
      ? 'var(--color-status-green)'
      : +size <= 500
        ? 'var(--color-status-yellow)'
        : 'var(--color-status-red)';

  return {
    statusColor,
    timeColor,
    sizeColor,
  };
}
