import data from '@/data/plants.json';
export interface Plant{ common:string; scientific:string; supports:string[]; role:string[]; bloom:string; image:string; benefit:string }
export function getPlantsByState(state:string){ return (data as any)[state] || (data as any)['NC'] || []; }
export default data;
