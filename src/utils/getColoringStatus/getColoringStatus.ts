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
  const statusColor = status >= 200 && status < 300 ? 'green' : 'red';
  const timeColor = time <= 200 ? 'green' : time <= 1000 ? 'yellow' : 'red';
  const sizeColor = +size <= 100 ? 'green' : +size <= 500 ? 'yellow' : 'red';

  return {
    statusColor,
    timeColor,
    sizeColor,
  };
}
