'use client';
import React from 'react';
export default function PrivacyToggle({ exact, onChange }:{ exact:boolean; onChange:(v:boolean)=>void }){
  return (
    <div className="card" style={{display:'inline-flex',gap:12,alignItems:'center'}}>
      <label><input type="checkbox" checked={exact} onChange={e=>onChange(e.target.checked)}/> Show exact location</label>
      {!exact && <span className="tag">3‑mile blur</span>}
    </div>
  );
}
