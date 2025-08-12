'use client';
import Image from 'next/image';
export default function Badge({ type }:{ type:'founding'|'waypoint' }){
  return (
    <span className="tag" style={{display:'inline-flex',alignItems:'center',gap:6}}>
      <Image src="/icons/waypoint.png" alt="badge" width={18} height={18}/>
      {type==='founding'?'Founding Member':'Waypoint logged'}
    </span>
  );
}
