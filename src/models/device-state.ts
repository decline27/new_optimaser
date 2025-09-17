export interface DeviceState {
  id: string;
  status: 'on' | 'off' | 'standby';
  power: number; // Watts
  lastUpdated: Date;
}
