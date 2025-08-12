'use client';
import Image from 'next/image';
export default function PlantCard({ plant }:{ plant:{ common:string; scientific:string; supports:string[]; role:string[]; bloom:string; image:string; benefit:string; }}){
  return (
    <div className="card">
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <Image src={plant.image || '/logo.png'} alt={plant.common} width={56} height={56}/>
        <div>
          <strong>{plant.common}</strong><div className="tag">{plant.scientific}</div>
        </div>
      </div>
      <div style={{margin:'8px 0'}}>
        {plant.supports.map(s=><span key={s} className="tag">{s}</span>)}
        {plant.role.map(r=><span key={r} className="tag">{r}</span>)}
        <span className="tag">Bloom {plant.bloom}</span>
      </div>
      <p>{plant.benefit}</p>
      <button className="btn">Order Now (placeholder)</button>
    </div>
  );
}
