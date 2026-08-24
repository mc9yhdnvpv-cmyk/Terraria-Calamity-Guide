
const DEFAULT_STATE={world:"My Calamity run",playerClass:"Melee",difficulty:"Revengeance",evil:"Corruption",done:{},poi:{},upgrades:{},gear:{weapon:"",armor:"",accessories:"",mobility:"",utility:"",notes:""}};
let state=Object.assign({},DEFAULT_STATE,JSON.parse(localStorage.getItem("tc2")||"{}"));
state.done=state.done||{};state.poi=state.poi||{};state.upgrades=state.upgrades||{};state.gear=Object.assign({},DEFAULT_STATE.gear,state.gear||{});
const enc=encodeURIComponent;
const save=()=>localStorage.setItem("tc2",JSON.stringify(state));
const slug=q=>q.replaceAll(" ","_").replaceAll("/","_");
const searchUrl=(base,q)=>base+"Special:Search?search="+enc(q);
const bossList=()=>BOSS_STAGES.flatMap(s=>s.bosses.map(b=>({stage:s.stage,name:b[0],source:b[1],note:b[2]})));
const nextBoss=()=>bossList().find(b=>!state.done[b.name])||bossList().at(-1);
function pct(){const a=bossList();return Math.round(a.filter(b=>state.done[b.name]).length/a.length*100)}
function currentStage(){let b=nextBoss();return b?.stage||"Complete"}
function wikiButton(q,src="calamity"){const base=src==="vanilla"?TERRA_WIKI:CAL_WIKI;return `<a class="wikiBtn" target="_blank" rel="noopener" href="${searchUrl(base,q)}">Wiki ↗</a>`}
function liveClassLink(){return `<a class="primary" target="_blank" rel="noopener" href="${CAL_CLASS}">Live ${state.playerClass} gear guide ↗</a>`}

function renderDashboard(){
 const b=nextBoss(); const completed=bossList().filter(x=>state.done[x.name]).length;
 document.querySelector("#dashboard").innerHTML=`
 <div class="card hero">
   <div class="kicker">${state.world.toUpperCase()}</div>
   <div class="row"><div><div class="big">${b.name}</div><div class="muted">Recommended next boss • ${currentStage()}</div></div><span class="badge green">${pct()}%</span></div>
   <div class="progressbar"><i style="width:${pct()}%"></i></div>
   <div class="actions">${wikiButton(b.name,b.source)} ${liveClassLink()}</div>
 </div>
 <h2 class="sectionTitle">What to do next</h2>
 <div class="task"><div class="taskBody"><div class="kicker">1 • PREPARE</div><div class="taskTitle">Check your ${state.playerClass} loadout</div><p class="muted">Compare your weapon, armor, accessories, mobility and buffs against the live Calamity class-setup tier before ${b.name}.</p><div class="actions">${liveClassLink()}</div></div></div>
 <div class="task"><div class="taskBody"><div class="kicker">2 • TARGET</div><div class="taskTitle">${b.name}</div><p class="muted">${b.note}</p><div class="actions">${wikiButton(b.name,b.source)}</div></div></div>
 <div class="task"><div class="taskBody"><div class="kicker">3 • EXPLORE</div><div class="taskTitle">Check unfinished POIs</div><p class="muted">${POIS.filter(p=>!state.poi[p[0]]).slice(0,3).map(p=>p[0]).join(" • ")||"Your POI list is complete."}</p><button class="secondary" onclick="showView('explore')">Open POIs</button></div></div>
 <h2 class="sectionTitle">Run summary</h2>
 <div class="card"><span class="pill">${state.playerClass}</span><span class="pill">${state.difficulty}</span><span class="pill">${state.evil}</span><p class="muted">${completed} of ${bossList().length} progression targets checked off.</p></div>
 <div class="card"><div class="warning">Gear accuracy note</div><p class="muted">Calamity changes frequently. Specific item recommendations are intentionally pulled through the live official wiki instead of being frozen into the app.</p></div>`;
}
function renderProgress(){
 let html=`<div class="row"><div><h2 class="sectionTitle">Boss progression</h2><div class="muted">Check bosses as you defeat them.</div></div><span class="badge green">${pct()}%</span></div>`;
 for(const s of BOSS_STAGES){
   const n=s.bosses.filter(b=>state.done[b[0]]).length;
   html+=`<div class="stageHeader"><h3>${s.stage}</h3><span>${n}/${s.bosses.length}</span></div>`;
   for(const b of s.bosses) html+=`<div class="boss"><input type="checkbox" data-boss="${b[0].replaceAll('"',"&quot;")}" ${state.done[b[0]]?"checked":""}><div><div class="bossTitle">${b[0]}</div><div class="bossMeta">${b[2]}</div><span class="pill">${b[1]==="vanilla"?"Terraria":"Calamity"}</span></div>${wikiButton(b[0],b[1])}</div>`;
 }
 document.querySelector("#progress").innerHTML=html;
 document.querySelectorAll("[data-boss]").forEach(x=>x.onchange=e=>{state.done[e.target.dataset.boss]=e.target.checked;save();renderAll()});
}
function renderLoadout(){
 const fields=[["weapon","Weapon(s)"],["armor","Armor"],["accessories","Accessories"],["mobility","Mobility / wings / hook"],["utility","Potions / ammo / utility"],["notes","Build notes"]];
 let html=`<h2 class="sectionTitle">${state.playerClass} loadout</h2><div class="card"><div class="taskTitle">Live recommendation source</div><p class="muted">Use the current official class-setup page to compare exact items for your present tier.</p><div class="actions">${liveClassLink()} <a class="secondary" target="_blank" href="${CAL_PROG}">Progression guide ↗</a></div></div><div class="gearGrid">`;
 for(const [k,label] of fields) html+=`<div class="gear"><div class="gearTitle">${label}</div><textarea data-gear="${k}" placeholder="Track what you're using...">${state.gear[k]||""}</textarea></div>`;
 html+=`</div><h2 class="sectionTitle">Permanent / utility upgrades</h2><div class="card">`;
 for(const u of UPGRADES) html+=`<label class="upgrade"><input type="checkbox" data-upgrade="${u.replaceAll('"',"&quot;")}" ${state.upgrades[u]?"checked":""}><span>${u}</span></label>`;
 html+="</div>";
 document.querySelector("#loadout").innerHTML=html;
 document.querySelectorAll("[data-gear]").forEach(x=>x.oninput=e=>{state.gear[e.target.dataset.gear]=e.target.value;save()});
 document.querySelectorAll("[data-upgrade]").forEach(x=>x.onchange=e=>{state.upgrades[e.target.dataset.upgrade]=e.target.checked;save()});
}
function renderExplore(){
 let html=`<h2 class="sectionTitle">Points of interest</h2><div class="card"><p class="muted">Use this as your exploration checklist. Wiki links open the correct official source when possible.</p></div>`;
 for(const p of POIS) html+=`<div class="poi"><input type="checkbox" data-poi="${p[0]}" ${state.poi[p[0]]?"checked":""}><div class="poiBody"><div class="poiTitle">${p[0]}</div><div class="bossMeta">${p[2]}</div><span class="pill">${p[1]}</span><div class="actions">${p[1]==="custom"?"":wikiButton(p[0],p[1]==="vanilla"?"vanilla":"calamity")}</div></div></div>`;
 document.querySelector("#explore").innerHTML=html;
 document.querySelectorAll("[data-poi]").forEach(x=>x.onchange=e=>{state.poi[e.target.dataset.poi]=e.target.checked;save();renderDashboard()});
}
function renderWiki(){
 document.querySelector("#wiki").innerHTML=`<h2 class="sectionTitle">Wiki hub</h2>
 <div class="searchCard"><input id="wikiQuery" placeholder="Search item, boss, biome, material..."><div class="actions"><button class="primary" id="searchCal">Calamity Wiki</button><button class="secondary" id="searchTerra">Terraria Wiki</button></div></div>
 <div class="card"><div class="taskTitle">Quick links</div><div class="searchResults">
 <a target="_blank" href="${CAL_CLASS}">Calamity class setups ↗</a>
 <a target="_blank" href="${CAL_PROG}">Calamity mod progression ↗</a>
 <a target="_blank" href="${CAL_WIKI}Bosses">Calamity bosses ↗</a>
 <a target="_blank" href="${TERRA_WIKI}Guide:Class_setups">Terraria class setups ↗</a>
 </div></div>`;
 const q=()=>document.querySelector("#wikiQuery").value.trim();
 document.querySelector("#searchCal").onclick=()=>q()&&window.open(searchUrl(CAL_WIKI,q()),"_blank");
 document.querySelector("#searchTerra").onclick=()=>q()&&window.open(searchUrl(TERRA_WIKI,q()),"_blank");
}
function renderAll(){renderDashboard();renderProgress();renderLoadout();renderExplore();renderWiki()}
function showView(id){document.querySelectorAll(".view,.bottomnav button").forEach(x=>x.classList.remove("active"));document.querySelector("#"+id).classList.add("active");document.querySelector(`.bottomnav button[data-view="${id}"]`).classList.add("active");scrollTo(0,0)}
document.querySelectorAll(".bottomnav button").forEach(b=>b.onclick=()=>showView(b.dataset.view));
const sheet=document.querySelector("#settingsSheet"),backdrop=document.querySelector("#sheetBackdrop");
function openSettings(){sheet.classList.add("show");backdrop.classList.add("show");worldName.value=state.world;classSelect.value=state.playerClass;difficultySelect.value=state.difficulty;evilSelect.value=state.evil}
function closeSettings(){sheet.classList.remove("show");backdrop.classList.remove("show")}
settingsBtn.onclick=openSettings;closeSettingsBtn=document.querySelector("#closeSettings");closeSettingsBtn.onclick=closeSettings;backdrop.onclick=closeSettings;
worldName.oninput=e=>{state.world=e.target.value||"My Calamity run";save();renderDashboard()};
classSelect.onchange=e=>{state.playerClass=e.target.value;save();renderAll()};
difficultySelect.onchange=e=>{state.difficulty=e.target.value;save();renderDashboard()};
evilSelect.onchange=e=>{state.evil=e.target.value;save();renderDashboard()};
exportBtn.onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="terraria-companion-backup.json";a.click();URL.revokeObjectURL(a.href)};
importFile.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state=Object.assign({},DEFAULT_STATE,JSON.parse(r.result));save();renderAll();closeSettings();alert("Backup imported.")}catch{alert("That backup file could not be read.")}};r.readAsText(f)};
resetBtn.onclick=()=>{if(confirm("Reset all Terraria Companion data on this device?")){localStorage.removeItem("tc2");location.reload()}};
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
renderAll();
