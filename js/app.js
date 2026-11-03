(function () {
 const $ = (s) => document.querySelector(s);
 const menu=$('#menuBtn'),nav=$('#nav');
 menu.addEventListener('click',()=>{const open=nav.classList.toggle('opened');menu.setAttribute('aria-expanded',String(open))});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('opened')));
 const sections=[...document.querySelectorAll('main section[id]')];
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-18% 0px -72% 0px'});
 sections.forEach(s=>observer.observe(s));
 const config=window.KT_CONFIG||{};
 function setLink(selector,url,label){const el=$(selector);if(/^https:\/\//.test(url||'')){el.href=url;el.target='_blank';el.rel='noopener noreferrer';el.classList.remove('disabled-link');el.removeAttribute('aria-disabled');el.textContent=label+' ↗'}else{el.addEventListener('click',ev=>ev.preventDefault())}}
 setLink('#publicFormLink',config.feishuCheckinFormUrl,'打开飞书签到表单');
 setLink('#staffLink',config.feishuStaffAppUrl,'进入工作人员管理平台');
 const rounds=[
  {title:'初赛 · 胜者组',id:'A',matches:[['M1','①号','②号','胜者 → M5','败者 → L1'],['M2','③号','④号','胜者 → M5','败者 → L1'],['M3','⑤号','⑥号','胜者 → M6','败者 → L2'],['M4','⑦号','⑧号','胜者 → M6','败者 → L2']]},
  {title:'胜者组 · 晋级',id:'B',matches:[['M5','M1 胜者','M2 胜者','胜者 → M7','败者 → L3'],['M6','M3 胜者','M4 胜者','胜者 → M7','败者 → L4'],['M7','M5 胜者','M6 胜者','胜者 → M8','败者 → L6']]},
  {title:'败者组 · 复活',id:'C',matches:[['L1','M1 败者','M2 败者','胜者 → L3','败者淘汰'],['L2','M3 败者','M4 败者','胜者 → L4','败者淘汰'],['L3','M5 败者','L1 胜者','胜者 → L5','败者淘汰'],['L4','M6 败者','L2 胜者','胜者 → L5','败者淘汰']]},
  {title:'决赛阶段',id:'D',matches:[['L5','L3 胜者','L4 胜者','胜者 → L6','败者 → 第四名'],['L6','M7 败者','L5 胜者','胜者 → M8','败者 → 第三名'],['M8','M7 胜者','L6 胜者','胜者 → 冠军','败者 → 亚军']]}
 ];
 const siteData={}; // 日后可按项目添加经过审批的签表数据
 function makeText(tag,cls,value){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=value;return el}
 function renderBracket(){const mount=$('#bracketMount');mount.replaceChildren();rounds.forEach(round=>{const column=makeText('div','round-column','');column.appendChild(makeText('h3','round-title',round.title));round.matches.forEach(match=>{const card=makeText('article','match-card','');const top=makeText('div','match-top','');top.append(makeText('strong','',match[0]),makeText('span','', '待录入'));const versus=makeText('div','match-players','');versus.append(makeText('span','',match[1]),makeText('span','vs','VS'),makeText('span','',match[2]));const bottom=makeText('div','match-bottom',match[3]+' · '+match[4]);card.append(top,versus,bottom);column.appendChild(card)});mount.appendChild(column)})}
 $('#categorySelect').addEventListener('change',renderBracket);renderBracket();
})();
