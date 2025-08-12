'use client';
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { circle as turfCircle } from '@turf/turf';
import mapStyle from '@/lib/mapStyle';
import speciesData from '@/data/species.json';

const colors:any = { monarch:'#FFB347', gulf_fritillary:'#8C5E3C', northern_flicker:'#2F7D5A', ruby_throated_hummingbird:'#E67E22' };

export default function Map({ overlays,overlayOpacity,speciesVisibility, exact }:{ overlays:{relief:boolean; topo:boolean}; overlayOpacity:{relief:number; topo:number}; speciesVisibility:Record<string,boolean>; exact:boolean }){
  const ref = useRef<HTMLDivElement|null>(null);
  const mapRef = useRef<maplibregl.Map|null>(null);

  useEffect(()=>{
    const map = new maplibregl.Map({ container: ref.current!, style: mapStyle as any, center: [-98.6, 39.8], zoom: 3 });
    mapRef.current = map;

    for (const [id, s] of Object.entries<any>(speciesData)){
      const visible = (speciesVisibility as any)[id] ?? true;
      if (!visible) continue;
      for (const p of s.points){
        const el = document.createElement('div');
        el.style.width='10px'; el.style.height='10px'; el.style.borderRadius='10px';
        el.style.background = colors[id] || '#333';
        new maplibregl.Marker({ element: el }).setLngLat([p.lon, p.lat]).addTo(map);
      }
    }

    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((pos)=>{
        const { latitude, longitude } = pos.coords;
        if (exact){
          new maplibregl.Marker({color:'#2F7D5A'}).setLngLat([longitude, latitude]).addTo(map);
          map.setCenter([longitude, latitude]); map.setZoom(11);
        } else {
          const circle = turfCircle([longitude, latitude], 4.828, { units:'kilometers' });
          map.on('load', ()=>{
            map.addSource('privacy', { type:'geojson', data: circle as any });
            map.addLayer({ id:'privacy', type:'fill', source:'privacy', paint:{ 'fill-color':'#2F7D5A', 'fill-opacity':0.15 } });
          });
          map.setCenter([longitude, latitude]); map.setZoom(10);
        }
      });
    }

    return ()=> map.remove();
  }, [exact, speciesVisibility]);

  useEffect(()=>{
    const map = mapRef.current; if (!map) return;
    map.setLayoutProperty('usgs_relief','visibility', overlays.relief?'visible':'none');
    map.setLayoutProperty('usgs_topo','visibility', overlays.topo?'visible':'none');
    map.setPaintProperty('usgs_relief','raster-opacity', overlayOpacity.relief);
    map.setPaintProperty('usgs_topo','raster-opacity', overlayOpacity.topo);
  },[overlays, overlayOpacity]);

  return <div ref={ref} style={{width:'100%',height:'100%'}}/>;
}
