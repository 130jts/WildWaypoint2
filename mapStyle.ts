const base = process.env.NEXT_PUBLIC_BASE_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const style:any = {
  version:8,
  sources:{
    osm:{ type:'raster', tiles:[base], tileSize:256, attribution:'© OpenStreetMap' },
    usgs_relief:{ type:'raster', tiles:['https://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/tile/{z}/{y}/{x}'], tileSize:256, attribution:'USGS' },
    usgs_topo:{ type:'raster', tiles:['https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}'], tileSize:256, attribution:'USGS' }
  },
  layers:[
    { id:'osm', type:'raster', source:'osm' },
    { id:'usgs_relief', type:'raster', source:'usgs_relief', layout:{ visibility:'none' }, paint:{ 'raster-opacity': 0.6 } },
    { id:'usgs_topo', type:'raster', source:'usgs_topo', layout:{ visibility:'none' }, paint:{ 'raster-opacity': 0.6 } }
  ]
};
export default style;
