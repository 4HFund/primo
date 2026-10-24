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
const categoryName = {bonnets:'Hair essentials',bags:'Everyday carry',sets:'Matching sets',accessories:'Hair accessories'};
function renderProducts(category = 'all') {
  if (!grid) return;
  const shown = products.filter(p => category === 'all' || p.type === category || (category === 'bonnets' && p.type === 'accessories'));
  grid.innerHTML = shown.map(p => {
    const extra = p.id === 'custom-name-bonnet' ? ' I would like to add a name.' : p.id === 'custom-photo-bonnet' ? ' I would like to add a name and photo.' : '';
    const message = 'Hello Primo Collection! I am interested in the ' + p.name + ' (' + format(p.price) + '). Could you confirm availability, colors, and ordering details?' + extra;
    const link = 'https://wa.me/231888238339?text=' + encodeURIComponent(message);
    return `<article class="product-card">
      <div class="product-visual">
        <img loading="lazy" src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <span class="product-initial" style="display:none">PRIMO</span>
        <span class="product-badge">${p.label}</span>
      </div>
      <div class="product-info">
        <div class="product-type">${categoryName[p.type]}</div>
        <h3>${p.name}</h3><p>${p.description}</p>
        <div class="product-bottom">
          <div class="dual-price"><strong>${format(p.price)}</strong><span class="usd-estimate">${usdEstimate(p.price)}</span></div>
          <a href="${link}" target="_blank" rel="noopener" aria-label="Order ${p.name} on WhatsApp">Order</a>
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
