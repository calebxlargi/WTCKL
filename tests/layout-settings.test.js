import test from 'node:test';
import assert from 'node:assert/strict';
import {createLayoutSettings,normalizeSetting,guestCount,tablePositions,LAYOUT_CONTROLS} from '../src/layout-settings.js';
test('default counts preserve the approved event arrangements',()=>{
 const s=createLayoutSettings();assert.equal(guestCount('banquet',s.banquet),320);assert.equal(guestCount('buffet',s.buffet),192);assert.equal(guestCount('conference',s.conference),180);assert.equal(guestCount('theatre',s.theatre),624);
});
test('settings clamp and round typed values within each room limit',()=>{
 for(const [layout,fields] of Object.entries(LAYOUT_CONTROLS))for(const f of fields){assert.equal(normalizeSetting(layout,f.key,-100),f.min);assert.equal(normalizeSetting(layout,f.key,10000),f.max);assert.equal(normalizeSetting(layout,f.key,NaN),f.value)}
 assert.equal(normalizeSetting('banquet','tables',12.7),13);
});
test('settings are independent and reset creates fresh values',()=>{
 const s=createLayoutSettings();s.banquet.tables=12;s.banquet.chairs=6;assert.equal(guestCount('banquet',s.banquet),72);assert.equal(s.buffet.chairs,8);assert.equal(createLayoutSettings().banquet.tables,32);
});
test('every allowed table count fits the hall and partial rows are centred',()=>{
 for(const [max,cols,dx,dz] of [[32,4,4,4.1],[24,4,4,4.1],[60,5,3.8,2.55]])for(let n=1;n<=max;n++){
 const p=tablePositions(n,cols,dx,dz,-13);assert.equal(p.length,n);for(const v of p){assert.ok(Math.abs(v.x)+1.7<11.43);assert.ok(v.z>-16&&v.z<18)}
 const row=p.slice(Math.floor((n-1)/cols)*cols);assert.ok(Math.abs(row.reduce((s,v)=>s+v.x,0))<.0001);
 }
});
