'use client';
import React, { useEffect, useState } from 'react';
import DonationBar from '@/components/DonationBar';
import Badge from '@/components/Badge';
import { useSearchParams } from 'next/navigation';

export default function SupportPage(){
  const sp = useSearchParams();
  const status = sp.get('status');
  const [isSub,setIsSub] = useState(false);
  const [isFounder,setIsFounder] = useState(false);

  useEffect(()=>{
    if (status === 'success') {
      if (!localStorage.getItem('ww_founding_member')) localStorage.setItem('ww_founding_member','true');
      localStorage.setItem('ww_subscriber','true');
    }
  },[status]);

  useEffect(()=>{
    setIsSub(localStorage.getItem('ww_subscriber') === 'true');
    setIsFounder(localStorage.getItem('ww_founding_member') === 'true');
  },[]);

  const startCheckout = async (plan:'monthly'|'yearly')=>{
    try{
      const r = await fetch('/api/checkout', { method:'POST', body: JSON.stringify({ plan }) });
      const j = await r.json();
      if (j.url) window.location.href = j.url;
    }catch{}
  };

  return (
    <main>
      <h1>Support & Subscribe</h1>
      <DonationBar/>
      <div className="card" style={{marginTop:12,display:'flex',gap:8,alignItems:'center'}}>
        <button className="btn" onClick={()=>startCheckout('monthly')}>Subscribe – Monthly (test)</button>
        <button className="btn" onClick={()=>startCheckout('yearly')}>Subscribe – Yearly (test)</button>
        <span style={{marginLeft:8}}>Or demo it: <a href="/support?status=success">/support?status=success</a></span>
      </div>
      <div style={{marginTop:16,display:'flex',gap:16,alignItems:'center'}}>
        {isSub && <span className="tag">Subscriber</span>}
        {isFounder && <Badge type="founding" />}
      </div>
    </main>
  );
}
