import { statusTextMap } from '@/maps/HTTPStatusCodes';

export const getStatusText = (code: number) =>
  statusTextMap.get(code) ?? 'Unknown Status';
