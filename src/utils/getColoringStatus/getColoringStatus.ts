interface ColoringProps {
  status: number;
}

export default function getColoringStatus({ status }: ColoringProps) {
  const statusColor = status >= 200 && status < 300 ? 'green' : 'red';

  return statusColor;
}
