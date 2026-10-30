export const BM = {
 'VENUE EXPLORER':'PENEROKA RUANG ACARA','LEVEL 2':'ARAS 2',
 'Hall 1 Dewan Tun Hussein Onn':'Dewan 1 Tun Hussein Onn',
 'A WORLD OF OPPORTUNITY':'DUNIA PENUH PELUANG','RIGHT TIME, RIGHT NOW.':'MASA YANG TEPAT, SEKARANG.',
 'Venue reference':'Rujukan dewan','MAKE IT YOUR OCCASION':'CIPTA ACARA PILIHAN ANDA','Explore the setting':'Terokai susun atur',
 'Conference':'Persidangan','Ideas take centre stage':'Ruang untuk perkongsian idea',
 'Theatre':'Teater','A shared perspective':'Pengalaman bersama',
 'Banquet':'Jamuan','An occasion to remember':'Majlis yang penuh kenangan',
 'Buffet':'Bufet','Gather, dine, connect':'Berkumpul, menjamu selera, berhubung',
 'Adjust layout':'Laraskan susun atur','Tables':'Meja','Chairs per table':'Kerusi setiap meja',
 'Dining tables':'Meja makan','Seating rows':'Barisan tempat duduk','Chairs per row':'Kerusi setiap barisan','Buffet stations':'Stesen bufet',
 'Tables slider':'Gelangsar bilangan meja','Chairs per table slider':'Gelangsar kerusi setiap meja',
 'Dining tables slider':'Gelangsar meja makan','Seating rows slider':'Gelangsar barisan tempat duduk',
 'Chairs per row slider':'Gelangsar kerusi setiap barisan','Buffet stations slider':'Gelangsar stesen bufet',
 'Restore default layout':'Pulihkan susun atur asal','BANQUET SETTING':'SUSUN ATUR JAMUAN','CONFERENCE SETTING':'SUSUN ATUR PERSIDANGAN',
 'THEATRE SETTING':'SUSUN ATUR TEATER','BUFFET SETTING':'SUSUN ATUR BUFET',
 'Round tables, thoughtful details and room to celebrate.':'Meja bulat dengan perincian menarik untuk meraikan majlis anda.',
 'Classroom tables with clear sightlines to the stage and screens.':'Meja gaya bilik darjah dengan pandangan jelas ke pentas dan skrin.',
 'An audience-focused setting with generous central and side aisles.':'Susun atur untuk penonton dengan lorong tengah dan sisi yang luas.',
 'A relaxed dining setting with buffet stations and open serving routes.':'Susun atur makan santai dengan stesen bufet dan laluan hidangan yang lapang.',
 'guests in this layout':'tetamu dalam susun atur ini','Evening atmosphere':'Suasana malam',
 'Illustrative event arrangement. Final capacities and layouts are subject to venue confirmation.':'Susun atur acara ini ialah ilustrasi. Kapasiti dan susun atur akhir tertakluk pada pengesahan pihak dewan.',
 'Done · Back to 3D':'Selesai · Kembali ke 3D','THE BALLROOM · INTERIOR VIEW':'DEWAN · PANDANGAN DALAMAN',
 'THE BALLROOM · FROM THE STAGE':'DEWAN · DARI PENTAS','THE BALLROOM · WIDE ANGLE':'DEWAN · SUDUT LEBAR',
 'THE BALLROOM · FLOOR PLAN':'DEWAN · PELAN LANTAI','Interior':'Dalaman','From stage':'Dari pentas','Wide angle':'Sudut lebar','Floor plan':'Pelan lantai',
 'Camera views':'Sudut pandangan','Layout controls':'Kawalan susun atur','Reset view':'Tetapkan semula pandangan','Save image':'Simpan imej','Fullscreen':'Skrin penuh',
 'FLOOR AREA':'KELUASAN LANTAI','CEILING HEIGHT':'KETINGGIAN SILING','LED SCREENS':'SKRIN LED',
 'Drag to explore':'Seret untuk meneroka','Scroll to zoom':'Tatal untuk zum','INTERACTIVE 3D PREVIEW':'PRATONTON 3D INTERAKTIF',
 'Preparing your experience':'Menyediakan pengalaman anda','Close':'Tutup','THE REAL SPACE':'RUANG SEBENAR','Designed around the venue':'Direka berdasarkan dewan sebenar',
 'Architecture and finishes referenced from WTC KL’s official venue gallery. Dimensions and branding from the supplied 2026 fact sheet. This is an illustrative reconstruction, not a surveyed digital twin.':'Seni bina dan kemasan dirujuk daripada galeri dewan rasmi WTC KL. Ukuran dan penjenamaan diambil daripada helaian fakta 2026 yang dibekalkan. Ini ialah pembinaan semula berbentuk ilustrasi, bukan replika digital berdasarkan ukuran tapak.',
 'Visit the official venue gallery':'Lawati galeri rasmi dewan',
 'Interactive 3D view of Tun Hussein Onn ballroom':'Pandangan 3D interaktif Dewan Tun Hussein Onn',
 'Official Tun Hussein Onn ballroom photograph':'Foto rasmi Dewan Tun Hussein Onn',
 'Fullscreen is unavailable in this browser.':'Skrin penuh tidak tersedia dalam pelayar ini.',
 'Your ballroom view has been saved.':'Pandangan dewan anda telah disimpan.',
 'A space for extraordinary':'Ruang untuk merealisasikan','possibilities.':'peluang luar biasa.',
};
const reverse=Object.fromEntries(Object.entries(BM).map(([en,bm])=>[bm,en]));
let language='en';
try{if(localStorage.getItem('wtckl-language')==='bm')language='bm'}catch{}
export const getLanguage=()=>language;
export function t(text){const en=reverse[text]||text;return language==='bm'?(BM[en]||en):en}
export function setLanguage(next){language=next==='bm'?'bm':'en';try{localStorage.setItem('wtckl-language',language)}catch{}}
export function translatePage(root=document.body){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){
   if(node.parentElement?.closest('script,style,svg,[data-no-translate]'))continue;
   const value=node.nodeValue,trim=value.trim();
   if(trim&&(BM[trim]||reverse[trim]))node.nodeValue=value.replace(trim,t(trim));
 }
 for(const element of root.querySelectorAll('[aria-label],[title],[alt]'))for(const attr of ['aria-label','title','alt']){
   const value=element.getAttribute(attr);if(value&&(BM[value]||reverse[value]))element.setAttribute(attr,t(value));
 }
 document.documentElement.lang=language==='bm'?'ms':'en';
 document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
}
