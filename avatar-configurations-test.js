// Avatar piloté par les cases d'inventaire. Aucun choix manuel de main.
const avatarHands=new Map();
function avatarItem(n){if(/prêtée temporairement à gabin/i.test(n))return null;if(/hache à deux mains/i.test(n))return 'hache';if(/^bouclier$/i.test(n))return 'bouclier';if(/^épée(?:\s|$)/i.test(n))return 'epee';if(/^torche(?:\s|$)/i.test(n))return 'torche';if(/^lanterne(?:\s|$)/i.test(n))return 'lanterne';return null}
function avatarSection(p){return '<div data-avatar-id="'+safe(p.id)+'"><img data-avatar-preview src="./portrait-'+safe(p.id)+'.jpg" alt="Avatar" style="display:block;width:100%;max-width:310px;max-height:460px;object-fit:contain;border-radius:12px;margin:auto"><p data-avatar-message class="muted" role="status"></p></div>'}
function updateAvatar(panel){
 const id=panel.dataset.avatarId, parent=panel.closest('[data-equip-panel]');if(!parent)return;
 const selected=[...parent.querySelectorAll('[data-equip-name]:checked')].map(b=>b.dataset.equipName).filter(n=>equipMeta(n)?.slot==='mains');
 const ids=selected.map(avatarItem),prev=avatarHands.get(id)||[null,null];let hands=[null,null];
 if(ids.includes('hache'))hands=['hache','hache'];else if(ids.every(Boolean)){
 hands=prev.map((x,i)=>x&&ids.includes(x)&&prev.indexOf(x)===i?x:null);
 for(const x of ids)if(!hands.includes(x)){const i=hands.indexOf(null);if(i>=0)hands[i]=x}
 }
 avatarHands.set(id,hands);
 const config=hands[0]==='hache'?'hache-2m':(hands[0]||'libre')+'-D__'+(hands[1]||'libre')+'-G';
 const reverse=(hands[1]||'libre')+'-D__'+(hands[0]||'libre')+'-G';
 const manifest=window.avatarManifest?.[id]||{},valid=e=>e?.status==='validated'&&/^images\/avatars\/[a-z0-9/_-]+\.png$/.test(e.path);
 let entry=ids.every(Boolean)?manifest[config]:null;if(!valid(entry)&&ids.every(Boolean)&&valid(manifest[reverse])){entry=manifest[reverse];avatarHands.set(id,[hands[1],hands[0]])}
 const img=panel.querySelector('[data-avatar-preview]');img.src=valid(entry)?'./'+entry.path:'./portrait-'+id+'.jpg';
 panel.querySelector('[data-avatar-message]').textContent=valid(entry)?'':selected.length?'Avatar de cette combinaison à produire.':'';
}
window.avatarPeople={};window.avatarManifest={};
fetch('./images/avatars/manifest.json').then(r=>r.ok?r.json():{}).then(m=>{window.avatarManifest=m;document.querySelectorAll('[data-avatar-id]').forEach(updateAvatar)}).catch(()=>{});
