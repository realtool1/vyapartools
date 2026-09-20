document.addEventListener('DOMContentLoaded',()=>{initLiveSearch();initMobileMenu();});

function initLiveSearch(){
 const input=document.getElementById('globalSearch');
 if(!input)return;
 const cards=[...document.querySelectorAll('.tool-card')];
 const empty=document.getElementById('searchEmpty');
 input.addEventListener('input',()=>{
   const q=input.value.toLowerCase().trim();
   let shown=0;
   cards.forEach(card=>{
     const hay=(card.textContent+' '+(card.getAttribute('href')||'')).toLowerCase();
     const match=!q||hay.includes(q);
     card.hidden=!match;
     if(match)shown++;
   });
   if(empty)empty.hidden=shown!==0;
 });
}

function initMobileMenu(){
 const btn=document.getElementById('mobileMenuBtn');
 const nav=document.getElementById('navLinks');
 if(!btn||!nav)return;
 btn.addEventListener('click',()=>{
   const open=nav.classList.toggle('mobile-open');
   btn.setAttribute('aria-expanded',String(open));
   btn.textContent=open?'×':'☰';
 });
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
   nav.classList.remove('mobile-open');btn.setAttribute('aria-expanded','false');btn.textContent='☰';
 }));
}

function formatCurrency(val){
 if(isNaN(val)||val===null)return '₹0.00';
 return '₹'+Number(val).toLocaleString('en-IN',{maximumFractionDigits:2,minimumFractionDigits:2});
}

function copyToClipboard(text,btnElement){
 if(!btnElement)return;
 const done=()=>{const old=btnElement.textContent;btnElement.textContent='Copied!';setTimeout(()=>btnElement.textContent=old,1800)};
 if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text,done));}
 else fallbackCopy(text,done);
}
function fallbackCopy(text,done){
 const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();
 try{document.execCommand('copy');done()}finally{area.remove()}
}