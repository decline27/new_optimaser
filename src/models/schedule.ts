export interface Schedule {
  id: string;
  deviceId: string;
  interventions: string[]; // List of intervention IDs
  startTime: Date;
  endTime: Date;
}
