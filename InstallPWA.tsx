'use client';
import { useEffect, useState } from 'react';
export default function InstallPWA(){ const [evt,setEvt]=useState<any>(null); const [ready,setReady]=useState(false);
  useEffect(()=>{ const h=(e:any)=>{e.preventDefault(); setEvt(e); setReady(true);}; window.addEventListener('beforeinstallprompt',h); return()=>window.removeEventListener('beforeinstallprompt',h);},[]);
  if(!ready) return null; return <button className="btn" onClick={async()=>{ await evt.prompt(); setEvt(null); setReady(false); }}>Install app</button>;
}
