// Générateur de configurations : aucune image n'est générée automatiquement.
const AVATAR_ITEMS=[
 {test:/hache à deux mains/i,id:'hache',label:'Hache à deux mains',hands:2},
 {test:/^bouclier$/i,id:'bouclier',label:'Bouclier',hands:1},
 {test:/^épée(?:\s|$)/i,id:'epee',label:'Épée',hands:1},
 {test:/^lanterne(?:\s|$)/i,id:'lanterne',label:'Lanterne allumée',hands:1}
];
function avatarAvailable(p){
 return (p.equipement||[]).flatMap(n=>{
  if(/prêtée temporairement à gabin/i.test(n))return [];
  const item=AVATAR_ITEMS.find(x=>x.test.test(n));
  return item?[{...item,source:n}]:[];
 }).filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i);
}
function avatarOptions(items){
 return '<option value="">Main libre</option>'+items.map(x=>'<option value="'+x.id+'">'+safe(x.label)+'</option>').join('');
}
function avatarSection(p){
 const items=avatarAvailable(p),opts=avatarOptions(items);
 return '<section class="section avatar-workshop" data-avatar-id="'+safe(p.id)+'"><h3>🖼️ Configurations d’avatar</h3><p class="muted">Sélectionne les objets tenus. Les autres restent rangés. Les images sont à produire et valider séparément.</p><img data-avatar-preview src="./portrait-'+safe(p.id)+'.jpg" alt="Avatar de référence" style="display:block;width:100%;max-width:310px;max-height:460px;object-fit:contain;border-radius:12px;margin:auto" onerror="this.hidden=true"><label>Main droite<select data-avatar-right>'+opts+'</select></label><label>Main gauche<select data-avatar-left>'+opts+'</select></label><p data-avatar-message class="muted" role="status"></p><button type="button" data-avatar-copy>📋 Copier le prompt de génération</button><p class="muted">Image de référence : avatar équipé, mains libres, validé. Joins cette image au prompt.</p></section>';
}
function avatarState(panel){
 const right=panel.querySelector('[data-avatar-right]').value,left=panel.querySelector('[data-avatar-left]').value;
 const id=panel.dataset.avatarId,items=avatarAvailable(window.avatarPeople?.[id]||{});
 const chosen=[right,left].filter(Boolean),axe=chosen.includes('hache');
 const valid=axe?(right==='hache'&&left==='hache'):!(right&&right===left);
 // Une hache à deux mains occupe automatiquement les deux mains.
 const config=axe?'hache-2m':(right||'libre')+'-D__'+(left||'libre')+'-G';
 return {right,left,items,valid,config,id};
}
function updateAvatar(panel){
 const s=avatarState(panel),msg=panel.querySelector('[data-avatar-message]');
 msg.textContent=s.valid?'Configuration : '+s.config:'Combinaison impossible : un objet ne peut pas être tenu deux fois.';
 panel.querySelector('[data-avatar-copy]').disabled=!s.valid;
 const preview=panel.querySelector('[data-avatar-preview]');
 // Seules les images explicitement listées dans le manifeste sont affichées.
 const entry=window.avatarManifest?.[s.id]?.[s.config];
 preview.src=entry?.status==='validated'&&/^images\/avatars\/[a-z0-9/_-]+\.png$/.test(entry.path)?'./'+entry.path:'./portrait-'+s.id+'.jpg';
}
window.avatarPeople={};window.avatarManifest={};
fetch('./images/avatars/manifest.json').then(r=>r.ok?r.json():{}).then(m=>{window.avatarManifest=m;document.querySelectorAll('[data-avatar-id]').forEach(updateAvatar)}).catch(()=>{});
el.addEventListener('change',e=>{
 const panel=e.target.closest('[data-avatar-id]');if(!panel||!e.target.matches('[data-avatar-right],[data-avatar-left]'))return;
 if(e.target.value && e.target.value!=='hache'){const other=panel.querySelector(e.target.matches('[data-avatar-right]')?'[data-avatar-left]':'[data-avatar-right]');if(other.value===e.target.value)other.value='';}
 if(e.target.value==='hache'){
  const other=panel.querySelector(e.target.matches('[data-avatar-right]')?'[data-avatar-left]':'[data-avatar-right]');
  other.value='hache';
 }else{
  const right=panel.querySelector('[data-avatar-right]'),left=panel.querySelector('[data-avatar-left]');
  if(right.value==='hache'||left.value==='hache'){right.value=e.target.value;left.value=''}
 }
 updateAvatar(panel);
});
el.addEventListener('click',async e=>{
 const btn=e.target.closest('[data-avatar-copy]');if(!btn)return;
 const panel=btn.closest('[data-avatar-id]'),s=avatarState(panel),p=window.avatarPeople[s.id];
 if(!s.valid||!p)return;
 const label=id=>s.items.find(x=>x.id===id)?.label||'libre';
 const carried=s.items.filter(x=>x.id!==s.right&&x.id!==s.left).map(x=>x.label);
 const prompt=['Édite exclusivement l’avatar équipé MAINS LIBRES joint de '+p.nom+'. Il est la référence visuelle prioritaire, et non le portrait original.','Produis UNE image plein pied, sans texte, sans grille ni étiquette.','Conserve rigoureusement le visage, la silhouette, la barbe, la fleur, les vêtements, les couleurs, le style 3D, la lumière, le cadrage, les sangles et TOUS les accessoires déjà visibles. Ne redessine pas les accessoires qui ne changent pas de place.','Main droite : '+label(s.right)+'.','Main gauche : '+label(s.left)+'.',s.config==='hache-2m'?'La hache est tenue avec LES DEUX MAINS.':'Chaque objet est tenu avec une seule main.','Objets transportés et rangés, s’ils sont visibles : '+(carried.join(', ')||'aucun')+'.','Déplace uniquement les objets sélectionnés de leur rangement vers les mains, et supprime leur exemplaire rangé. Les autres objets doivent rester à leur place, avec leur forme et leurs détails inchangés. Ne représente aucun objet deux fois. Ne rajoute pas d’objet absent de la fiche.','Inventaire de référence : '+p.equipement.join('; ')+'.','Identifiant de configuration : '+s.config+'.'].join('\n');
 try{await navigator.clipboard.writeText(prompt);panel.querySelector('[data-avatar-message]').textContent='Prompt copié. Joins le portrait original à la génération.'}catch{panel.querySelector('[data-avatar-message]').textContent='Copie impossible sur ce navigateur.'}
});
