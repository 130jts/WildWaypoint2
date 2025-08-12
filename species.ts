import data from '@/data/species.json';
export interface SpeciesPoint{ lat:number; lon:number; label:string }
export interface SpeciesEntry{ common:string; scientific:string; snapshot:string; facts:string[]; tips:string[]; points: SpeciesPoint[] }
export function getSpeciesById(id:string){ return (data as any)[id] as SpeciesEntry|undefined; }
export default data;
