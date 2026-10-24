// Product catalog and WhatsApp ordering.
const products=[
{id:'satin-bonnet',name:'Satin Bonnet · Black & Pink',type:'bonnets',description:'A soft satin essential for your hair-care routine.',price:350,label:'Everyday favorite',image:'assets/products/bonnet-colors.jpg'},
{id:'two-in-one',name:'2-in-1 Satin Bonnet',type:'bonnets',description:'A colorful assortment of reversible satin bonnets; ask about available shades.',price:350,label:'Color options',image:'assets/products/bonnet-two-in-one.jpg'},
{id:'print-tote',name:'Statement Tote Bag',type:'bags',description:'A vivid patterned tote for everyday carrying.',price:650,label:'Made to carry',image:'assets/products/tote-reversible.jpg'},
{id:'black-panel-tote',name:'Black & African-Print Tote',type:'bags',description:'A black tote bag with bold African-print detailing, shown from both sides.',price:650,label:'Everyday style',image:'assets/products/tote-pink.jpg'},
{id:'apron-bonnet',name:'Apron + Bonnet Set',type:'sets',description:'A coordinated everyday apron and bonnet set.',price:950,label:'Matching set',image:'assets/products/set-apron.jpg'},
{id:'satin-set',name:'Printed Apron + Bonnet Set',type:'sets',description:'A matching printed apron and bonnet set.',price:1000,label:'Matching set',image:'assets/products/set-satin.jpg'}
,
{id:"scrunchies",name:"Satin Scrunchies",type:"accessories",description:"Colorful satin scrunchies in a variety of shades.",price:150,label:"Everyday accessory",image:'assets/products/scrunchies.jpg'},
{id:"african-flower-tote",name:"African-Print Flower Tote",type:"bags",description:"Black tote with vibrant African-print panel, handles and flower detail.",price:650,label:"Handmade tote",image:'assets/products/african-flower-tote.jpg'},
{id:"bow-bonnet",name:"Satin Bow Bonnet",type:"bonnets",description:"Elegant satin bonnet with an oversized bow; ask about available colors.",price:450,label:"Bow style",image:'assets/products/bow-bonnet.jpg'},
{id:"african-pocket-tote",name:"African-Print Pocket Tote",type:"bags",description:"Black tote with a colorful African-print side panel, pocket and handles.",price:650,label:"Handmade tote",image:'assets/products/african-pocket-tote.jpg'},
{id:"classic-bonnet-assortment",name:"Classic Satin Bonnet",type:"bonnets",description:"Smooth satin bonnet available in vibrant colors.",price:450,label:"Color options",image:'assets/products/classic-bonnet-assortment.jpg'},
{id:"pink-bow-bonnet",name:"Pink Satin Bow Bonnet",type:"bonnets",description:"Pink satin bonnet with a statement bow. Photo shows an example with custom name lettering; ask about personalization pricing.",price:450,label:"Bow style",image:'assets/products/pink-bow-bonnet.jpg'},
{id:"two-tone-bonnet",name:"Two-Tone Satin Bonnet",type:"bonnets",description:"Two-tone satin bonnet with a contrasting gathered edge.",price:400,label:"Two-tone style",image:'assets/products/two-tone-bonnet.jpg'},
{id:"custom-name-bonnet",name:"Personalized Name Bonnet",type:"bonnets",description:"Add a name to a satin bonnet. Confirm spelling and colors before ordering.",price:900,label:"Personalize it",image:'assets/products/custom-name-bonnet.jpg'},
{id:"satin-tie-bonnet",name:"Satin Tie Bonnet",type:"bonnets",description:"Soft satin tie bonnet with long adjustable ties.",price:450,label:"Tie style",image:'assets/products/satin-tie-bonnet.jpg'},
{id:"reversible-color-bonnet",name:"Reversible Satin Bonnet",type:"bonnets",description:"Two-tone reversible satin bonnet; ask about color combinations.",price:400,label:"Reversible",image:'assets/products/reversible-color-bonnet.jpg'},
{id:"custom-photo-bonnet",name:"Personalized Name & Photo Bonnet",type:"bonnets",description:"Personalized satin bonnet featuring a name and photo. Send your details on WhatsApp.",price:1100,label:"Custom design",image:'assets/products/custom-photo-bonnet.jpg'},
{id:"royal-blue-bonnet",name:"Royal Blue Satin Bonnet",type:"bonnets",description:"Royal-blue satin bonnet with a wide, comfortable band.",price:450,label:"Classic style",image:'assets/products/royal-blue-bonnet.jpg'}
];
const grid = document.getElementById('products');
const format = n => 'L$' + n.toLocaleString('en-US');
const lrdPerUsd = 171.4675; // Indicative selling rate, October 23, 2026
const usdEstimate = n => '≈ US$' + (n / lrdPerUsd).toFixed(2);
let activeCategory='all';
const categoryName = {bonnets:'Hair essentials',bags:'Everyday carry',sets:'Matching sets',accessories:'Hair accessories'};
function renderProducts(category = 'all') {
  if (!grid) return;
  activeCategory=category;
  const term=(document.getElementById('product-search')?.value||'').trim().toLowerCase();
  const sort=document.getElementById('product-sort')?.value||'featured';
  const shown = products.filter(p => (category === 'all' || p.type === category || (category === 'bonnets' && p.type === 'accessories')) && (p.name+' '+p.description+' '+categoryName[p.type]).toLowerCase().includes(term));
  if(sort==='low')shown.sort((a,b)=>a.price-b.price);else if(sort==='high')shown.sort((a,b)=>b.price-a.price);else if(sort==='name')shown.sort((a,b)=>a.name.localeCompare(b.name));
  const count=document.getElementById('result-count');if(count)count.textContent=shown.length+' '+(shown.length===1?'piece':'pieces')+' to discover';
  grid.innerHTML = shown.map(p => {
    const extra = p.id === 'custom-name-bonnet' ? ' I would like to add a name.' : p.id === 'custom-photo-bonnet' ? ' I would like to add a name and photo.' : '';
    const message = 'Hello Primo Collection! I am interested in the ' + p.name + ' (' + format(p.price) + '). Could you confirm availability, colors, and ordering details?' + extra;
    const link = 'https://wa.me/231888238339?text=' + encodeURIComponent(message);
    return `<article class="product-card">
      <button class="product-visual product-preview" type="button" data-product="${p.id}" aria-label="View details for ${p.name}">
        <img loading="lazy" src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <span class="product-initial" style="display:none">PRIMO</span>
        <span class="product-badge">${p.label}</span>
      </button>
      <div class="product-info">
        <div class="product-type">${categoryName[p.type]}</div>
        <h3><button class="product-title-button" type="button" data-product="${p.id}">${p.name}</button></h3><a class="product-share-link" href="products/${p.id}.html" aria-label="View and share ${p.name} product page">View & share</a><p>${p.description}</p>
        <div class="product-bottom">
          <div class="dual-price"><strong>${format(p.price)}</strong><span class="usd-estimate">${usdEstimate(p.price)}</span></div>
          <button class="add-bag" type="button" data-add="${p.id}" aria-label="Add ${p.name} to shopping bag">Add +</button>
        </div>
      </div>
    </article>`;
  }).join('');
}
renderProducts();
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => {b.classList.remove('active'); b.setAttribute('aria-pressed','false');});
  button.classList.add('active'); button.setAttribute('aria-pressed','true');
  renderProducts(button.dataset.filter);
}));
const menu = document.querySelector('.menu-button');
const nav = document.getElementById('nav');
if (menu && nav) {
  menu.addEventListener('click', () => {const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const basket=new Map();
const getProduct=id=>products.find(p=>p.id===id);
const wa=text=>'https://wa.me/231888238339?text='+encodeURIComponent(text);
function updateBag(){
 const count=[...basket.values()].reduce((a,b)=>a+b,0);
 document.getElementById('bag-count').textContent=count;
 const list=document.getElementById('bag-items');
 list.innerHTML=[...basket].map(([id,qty])=>{const p=getProduct(id);return p?`<div class="bag-line"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${format(p.price)} each</small><div class="qty"><button data-qty="${id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div></div></div>`:''}).join('')||'<p>Your bag is empty. Explore the collection and add a favorite.</p>';
 const total=[...basket].reduce((n,[id,qty])=>n+getProduct(id).price*qty,0);
 document.getElementById('bag-total').textContent=count?'Estimated items total: '+format(total)+' ('+usdEstimate(total)+') · Shipping not included':'';
 const order=[...basket].map(([id,qty])=>{const p=getProduct(id);return qty+' × '+p.name+' — '+format(qty*p.price)}).join('\n');
 const checkout=document.getElementById('bag-checkout');
 checkout.href=wa('Hello Primo Collection! I would like to order:\n'+order+'\nEstimated items total: '+format(total)+'\nPlease confirm colors, availability, payment and shipping or pickup.');
 checkout.style.display=count?'inline-flex':'none';
}
function addToBag(id){trackShop('add_to_bag',{product_id:id});basket.set(id,(basket.get(id)||0)+1);updateBag();const b=document.getElementById('bag-open');b.classList.add('bag-bump');setTimeout(()=>b.classList.remove('bag-bump'),350)}
function openProduct(id){
 trackShop('view_product',{product_id:id});
 const p=getProduct(id);if(!p)return;
 const extra=p.id==='pink-bow-bonnet'?'<p class="sample-note">Photo shows optional custom lettering. Personalization is priced separately.</p>':'';
 document.getElementById('product-detail').innerHTML=`<div class="detail-grid"><img src="${p.image}" alt="${p.name}" class="detail-image"><div class="detail-copy"><div class="product-type">${categoryName[p.type]}</div><h2>${p.name}</h2><div class="detail-price">${format(p.price)} <span>${usdEstimate(p.price)}</span></div><p>${p.description}</p>${extra}<p class="detail-note">Handmade in Monrovia. Colors, personalization and availability are confirmed directly with Primo Collection. Delivery and shipping costs are quoted separately.</p><button class="detail-add" data-add="${p.id}">Add to bag</button><a class="detail-share" href="products/${p.id}.html">Open shareable product page</a><a class="detail-wa" href="${wa('Hello Primo Collection! I am interested in '+p.name+' ('+format(p.price)+'). Please share available options and ordering details.')}" target="_blank" rel="noopener">Ask about this piece on WhatsApp</a></div></div>`;
 document.getElementById('product-dialog').showModal();
 history.replaceState(null,'','#product='+encodeURIComponent(id));
}
document.getElementById('product-search')?.addEventListener('input',()=>renderProducts(activeCategory));
document.getElementById('product-sort')?.addEventListener('change',()=>renderProducts(activeCategory));
document.addEventListener('click',e=>{
 const preview=e.target.closest('[data-product]');if(preview){openProduct(preview.dataset.product);return}
 const add=e.target.closest('[data-add]');if(add){addToBag(add.dataset.add);return}
 const qty=e.target.closest('[data-qty]');if(qty){const id=qty.dataset.qty;const n=(basket.get(id)||0)+Number(qty.dataset.delta);if(n<=0)basket.delete(id);else basket.set(id,n);updateBag()}
});
document.getElementById('bag-open')?.addEventListener('click',()=>{updateBag();document.getElementById('bag-dialog').showModal()});
document.getElementById('bag-close')?.addEventListener('click',()=>document.getElementById('bag-dialog').close());
document.getElementById('product-close')?.addEventListener('click',()=>document.getElementById('product-dialog').close());
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.getElementById('product-dialog')?.addEventListener('close',()=>{if(location.hash.startsWith('#product='))history.replaceState(null,'','#shop')});
const linked=decodeURIComponent(location.hash.replace('#product=',''));
if(location.hash.startsWith('#product=')&&getProduct(linked))openProduct(linked);
updateBag();

// Analytics-ready event hooks: events are sent only if the owner configures analytics.
function trackShop(name,details={}){if(typeof window.gtag==='function')window.gtag('event',name,details);}
document.getElementById('bag-checkout')?.addEventListener('click',()=>trackShop('begin_whatsapp_order',{item_count:[...basket.values()].reduce((a,b)=>a+b,0)}));
document.addEventListener('click',e=>{const a=e.target.closest('a[href*="wa.me/"]');if(a)trackShop('whatsapp_click',{location:a.closest('.product-dialog')?'product_detail':'page'});});
