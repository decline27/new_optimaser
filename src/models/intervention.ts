export interface Intervention {
  id: string;
  deviceId: string;
  action: 'turn-on' | 'turn-off' | 'set-standby';
  scheduledTime: Date;
  executed: boolean;
}
