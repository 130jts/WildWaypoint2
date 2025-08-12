'use client';
import React, { useEffect, useState } from 'react';
import DonationBar from '@/components/DonationBar';
import species from '@/data/species.json';
import tips from '@/data/dailyTips.json';
import Link from 'next/link';

export default function HomePage(){
  const [tip,setTip] = useState<string>('');
  useEffect(()=>{ setTip(tips[Math.floor(Math.random()*tips.length)]); },[]);
  return (
    <main>
      <h1>Nature’s pit stop</h1>
      <p>Track migration, plant natives, and log pit stops. 2% of subscriptions are donated to conservation.</p>
      <DonationBar/>
      <div className="card" style={{marginTop:16}}><strong>Daily tip:</strong> {tip}</div>
      <h2 style={{marginTop:24}}>Migration highlights</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {Object.entries(species).map(([id,s]:any)=>(
          <div key={id} className="card">
            <h3 style={{margin:'4px 0'}}>{s.common}</h3>
            <div className="tag">{s.scientific}</div>
            <p style={{marginTop:8}}>{s.snapshot}</p>
            <Link className="btn" href={`/species/${id}`} style={{display:'inline-block',marginTop:8}}>Learn more</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
