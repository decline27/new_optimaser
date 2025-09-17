export interface Policy {
  id: string;
  name: string;
  type: 'peak-shaving' | 'load-shifting' | 'flex-response';
  parameters: Record<string, any>;
}
