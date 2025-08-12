export async function detectState(): Promise<string>{
  if (!('geolocation' in navigator)) return 'NC';
  const coords = await new Promise<GeolocationPosition>((res,rej)=>navigator.geolocation.getCurrentPosition(res,rej));
  const { latitude, longitude } = coords.coords;
  try{
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`, { headers:{'Accept-Language':'en'} });
    const j = await r.json();
    return (j.address?.state_code || j.address?.ISO3166-2-lvl4 || 'NC').replace('US-','');
  }catch{return 'NC'}
}
