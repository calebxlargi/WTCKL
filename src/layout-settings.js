export const LAYOUT_CONTROLS = {
  banquet: [
    {key:'tables',label:'Tables',min:1,max:32,value:32},
    {key:'chairs',label:'Chairs per table',min:2,max:10,value:10},
  ],
  conference: [
    {key:'tables',label:'Tables',min:1,max:60,value:60},
    {key:'chairs',label:'Chairs per table',min:1,max:3,value:3},
  ],
  theatre: [
    {key:'rows',label:'Seating rows',min:1,max:26,value:26},
    {key:'chairs',label:'Chairs per row',min:2,max:24,value:24},
  ],
  buffet: [
    {key:'tables',label:'Dining tables',min:1,max:24,value:24},
    {key:'chairs',label:'Chairs per table',min:2,max:10,value:8},
    {key:'stations',label:'Buffet stations',min:1,max:4,value:4},
  ],
};
export function createLayoutSettings() {
  return Object.fromEntries(Object.entries(LAYOUT_CONTROLS).map(([name,fields])=>[
    name,Object.fromEntries(fields.map(f=>[f.key,f.value])),
  ]));
}
export function normalizeSetting(layout,key,value) {
  const field=LAYOUT_CONTROLS[layout].find(f=>f.key===key);
  const number=Number(value);
  return Math.max(field.min,Math.min(field.max,Number.isFinite(number)?Math.round(number):field.value));
}
export function guestCount(layout,settings) {
  return (layout==='theatre'?settings.rows:settings.tables)*settings.chairs;
}
// Keep the original row spacing and aisles; centre incomplete rows.
export function tablePositions(count,columns,spacingX,spacingZ,startZ) {
  const positions=[];
  for(let i=0;i<count;i++) {
    const row=Math.floor(i/columns),rowSize=Math.min(columns,count-row*columns);
    positions.push({x:(i%columns-(rowSize-1)/2)*spacingX,z:startZ+row*spacingZ});
  }
  return positions;
}
