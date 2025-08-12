'use client';
import React from 'react';
const colors:any = { monarch:'#FFB347', gulf_fritillary:'#8C5E3C', northern_flicker:'#2F7D5A', ruby_throated_hummingbird:'#E67E22' };
export default function SpeciesLegend(){
  return (
    <div className="card" style={{marginTop:8,display:'flex',gap:12,flexWrap:'wrap'}}>
      {Object.entries(colors).map(([k,c])=>(
        <div key={k} style={{display:'flex',gap:6,alignItems:'center'}}>
          <span style={{width:12,height:12,borderRadius:12,background:c,display:'inline-block'}}/>
          <small>{k.replace(/_/g,' ')}</small>
        </div>
      ))}
    </div>
  );
}
