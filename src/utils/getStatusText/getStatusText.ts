import { statusTextMap } from '@/lib/HTTPStatusCodes';

export const getStatusText = (code: number) =>
  statusTextMap.get(code) ?? 'Unknown Status';
