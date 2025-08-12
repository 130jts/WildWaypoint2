'use client';
import React, { useEffect, useState } from 'react';
export default function DonationBar(){
  const goal = 10000;
  const [total,setTotal] = useState(0);
  useEffect(()=>{
    const cached = localStorage.getItem('ww_donation_total');
    if (cached) setTotal(parseFloat(cached));
    const tick = async ()=>{
      try{
        const r = await fetch('/api/donation-total');
        const j = await r.json();
        setTotal(j.total); localStorage.setItem('ww_donation_total', String(j.total));
      }catch{}
    };
    tick();
    const id = setInterval(tick, 10000);
    return ()=> clearInterval(id);
  },[]);
  const pct = Math.min(100, Math.round((total/goal)*100));
  return (
    <div className="card" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div style={{height:12,background:'#eee',borderRadius:8,overflow:'hidden'}}>
        <div style={{width:`${pct}%`,height:'100%',background:'var(--fern)'}}/>
      </div>
      <div style={{marginTop:6,fontSize:14}}><strong>${total.toFixed(2)}</strong> raised (2% of subs) — Goal $10,000</div>
    </div>
  );
}
