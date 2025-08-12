'use client';
import React from 'react';
export default function LayerToggles({
  overlays,onOverlayChange,overlayOpacity,onOverlayOpacityChange,
  species,onSpeciesChange
}:{
  overlays:{relief:boolean; topo:boolean};
  onOverlayChange:(k:'relief'|'topo',v:boolean)=>void;
  overlayOpacity:{relief:number; topo:number};
  onOverlayOpacityChange:(k:'relief'|'topo',v:number)=>void;
  species:Record<string,boolean>;
  onSpeciesChange:(k:string,v:boolean)=>void;
}){
  return (
    <div className="card" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:10,marginBottom:10}}>
      <div><strong>USGS Overlays</strong><br/>
        <label><input type="checkbox" checked={overlays.relief} onChange={e=>onOverlayChange('relief', e.target.checked)}/> Shaded Relief</label><br/>
        <input type="range" min={0} max={1} step={0.05} value={overlayOpacity.relief} onChange={e=>onOverlayOpacityChange('relief', parseFloat(e.target.value))}/>
      </div>
      <div>
        <label><input type="checkbox" checked={overlays.topo} onChange={e=>onOverlayChange('topo', e.target.checked)}/> Topo</label><br/>
        <input type="range" min={0} max={1} step={0.05} value={overlayOpacity.topo} onChange={e=>onOverlayOpacityChange('topo', parseFloat(e.target.value))}/>
      </div>
      <div><strong>Species</strong><br/>
        {Object.entries(species).map(([k,v])=>(
          <label key={k} style={{display:'block'}}><input type="checkbox" checked={v} onChange={e=>onSpeciesChange(k, e.target.checked)}/> {k.replace(/_/g,' ')}</label>
        ))}
      </div>
    </div>
  );
}
