/* Local frozen-source evidence atlas. No remote requests or external dependencies. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const D = window.LINEAGE;
  if (!D || !Array.isArray(D.nodes) || !Array.isArray(D.edges)) {
    $('load-error').classList.remove('hidden');
    $('load-error').textContent = 'The local graph release is unavailable. Place the generated data.js beside this page, then reload. No network source is used.';
    return;
  }
  if (!window.Plotly) {
    $('load-error').classList.remove('hidden');
    $('load-error').textContent = 'The bundled Plotly file could not be loaded. Restore ../../advanced-viz/dashboard/vendor/plotly.min.js, then reload.';
    return;
  }
  const arr = value => Array.isArray(value) ? value : value && typeof value === 'object' ? Object.values(value) : [];
  const nodes = D.nodes, byId = new Map(nodes.map(n => [String(n.id), n]));
  const edges = D.edges.filter(e => byId.has(String(e.source)) && byId.has(String(e.target)));
  const ideas = arr(D.ideas), claims = arr(D.claims || D.kappa_claims);
  const prNodes = nodes.filter(n => n.type === 'pr');
  const byPr = new Map(prNodes.map(n => [Number(n.pr ?? n.number ?? String(n.id).replace(/^pr:/, '')), n]));
  const dayOf = n => (n.created_at || (typeof n.day === 'string' ? n.day : '') || '').slice(0, 10);
  const days = [...new Set(prNodes.map(dayOf).filter(Boolean))].sort();
  const colors = {pr:'#53d8fb', idea:'#64e0a9', account:'#c1a2ff', event:'#ffb454'};
  const symbols = {pr:'circle', idea:'diamond', account:'square',event:'diamond-open'};
  const layerNames = {reference:'Frozen-text reference',semantic:'Audited technical relation',membership:'Curated membership',participation:'Attributed idea participation',authorship:'Recorded authorship',communication:'Recorded communication'};
  const S = {selected:byPr.get(186)?.id || nodes[0]?.id, layer:'audited', lens:'focus', direction:'both', hops:1, dim:2, cutoff:days.length - 1, future:false, state:'all', edge:null, relationDirection:'both', page:0, series:'all', claim:null, authorScope:'shown', spec:'body', timer:null};
  let shown = {nodes:[],edges:[],eligibleNodes:[],eligibleEdges:[]};
  const short = (s, n=72) => String(s ?? '').length > n ? String(s).slice(0,n-1)+'…' : String(s ?? '');
  const human = s => String(s ?? 'unknown').replaceAll('_',' ').replaceAll('-', ' ');
  const fmt = n => Number.isFinite(Number(n)) ? Number(n).toLocaleString(undefined,{maximumFractionDigits:4}) : String(n ?? 'unknown');
  const label = n => n ? n.type === 'pr' ? `#${n.pr ?? n.number ?? String(n.id).replace(/^pr:/,'')}` : (n.label || n.author || n.id) : 'Unknown node';
  const fullLabel = n => n ? n.type === 'pr' ? `${label(n)} ${n.title || n.label || ''}` : (n.label || n.id) : 'Unknown node';
  const esc = str => String(str ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const make = (tag, text, cls) => {const e=document.createElement(tag); if(text !== undefined)e.textContent=String(text); if(cls)e.className=cls;return e;};
  const add = (parent, tag, text, cls) => {const e=make(tag,text,cls); parent.append(e);return e;};
  const clear = e => e.replaceChildren();
  function safeLink(parent, text, url) { if(!url)return;try {const u=new URL(url,window.location.href);if(!['http:','https:'].includes(u.protocol))return;const a=add(parent,'a',text,'source-link');a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';return a;}catch{return;} }
  function button(parent,text,handler,cls='table-button'){const b=add(parent,'button',text,cls);b.type='button';b.addEventListener('click',handler);return b;}
  function metadata(parent, fields){const dl=add(parent,'dl',undefined,'metadata');fields.forEach(([k,v])=>{if(v===null||v===undefined||v==='')return;add(dl,'dt',k);add(dl,'dd',typeof v==='object'?JSON.stringify(v):v);});return dl;}
  function empty(parent, text){add(parent,'p',text,'empty');}
  const selected = () => byId.get(String(S.selected));
  const stateOf = n => n.merged_at || n.merged || n.state === 'merged' ? 'merged' : n.state || 'unknown';
  const eligiblePr = n => n.type !== 'pr' || ((!dayOf(n) || !days[S.cutoff] || dayOf(n)<=days[S.cutoff]) && (S.state === 'all' || stateOf(n)===S.state));
  const futureEdge = e => typeof e.future_at_opening==='boolean'?e.future_at_opening:e.opening_order === 'source_opened_after_target_body_is_retrospective';
  function inLayer(e) {if(S.layer==='reference'&&e.layer==='reference'){return S.spec==='all'||(S.spec==='url'?e.url_body_pair!==false:S.spec==='title'?e.body_pair||arr(e.fields).some(f=>f==='title'||f==='body'):e.body_pair!==false);}return S.layer === 'audited' ? ['semantic','membership','authorship','participation'].includes(e.layer) : e.layer===S.layer;}
  function anchorOf(e) {if(e.parent_pr&&byPr.has(Number(e.parent_pr)))return byPr.get(Number(e.parent_pr));const n=byId.get(String(e.layer === 'membership' ? e.source : e.target));if(n?.type==='event')return byPr.get(Number(n.parent_pr))||n;return n;}
  function eligibleEdge(e){if(['participation','communication'].includes(e.layer)){const ev=evidenceItems(e);const prs=ev.map(v=>byPr.get(Number(v.source_pr||v.source_url?.match(/\/pull\/(\d+)/)?.[1]))).filter(Boolean);return !prs.length||prs.some(eligiblePr);}return eligiblePr(anchorOf(e));}
  function graphScope(){
    let pool = edges.filter(e=>inLayer(e) && (S.future || !futureEdge(e)) && eligibleEdge(e));
    if(S.lens==='audit')pool=pool.filter(e=>[e.source,e.target].every(id=>{const n=byId.get(String(id));return n.type!=='pr'||n.audited||ideas.some(i=>(i.participating_prs||[]).map(Number).includes(Number(n.pr)));}));
    const eligibleIds=new Set(pool.flatMap(e=>[String(e.source),String(e.target)]));
    prNodes.filter(eligiblePr).forEach(n=>{if(S.lens!=='audit' || n.audited)eligibleIds.add(String(n.id));});
    if(S.lens!=='reference' && S.layer==='membership')nodes.filter(n=>n.type==='idea').forEach(n=>eligibleIds.add(String(n.id)));
    let ids;
    if(S.lens==='focus'){
      ids=new Set([String(S.selected)]);let frontier=new Set(ids);
      for(let step=0;step<S.hops;step++){
        const next=new Set();
        for(const e of pool){const a=String(e.source),b=String(e.target);if(S.direction!=='ancestors'&&frontier.has(a)&&!ids.has(b))next.add(b);if(S.direction!=='descendants'&&frontier.has(b)&&!ids.has(a))next.add(a);}
        next.forEach(id=>ids.add(id));frontier=next;
      }
    } else ids=new Set(eligibleIds);
    if(S.selected)ids.add(String(S.selected));
    const viewEdges=pool.filter(e=>ids.has(String(e.source))&&ids.has(String(e.target)));
    shown={nodes:nodes.filter(n=>ids.has(String(n.id))),edges:viewEdges,eligibleNodes:nodes.filter(n=>eligibleIds.has(String(n.id))),eligibleEdges:pool};
  }
  function renderCounts(){
    clear($('graph-counts'));
    const pieces=[['Objects',shown.nodes.length,shown.eligibleNodes.length,nodes.length],['Relations',shown.edges.length,shown.eligibleEdges.length,edges.filter(inLayer).length]];
    pieces.forEach(([name,a,b,c])=>{const p=add($('graph-counts'),'span');add(p,'strong',fmt(a));p.append(` shown / ${fmt(b)} eligible / ${fmt(c)} total ${name.toLowerCase()}`);});
    const context=shown.nodes.filter(n=>n.type==='pr'&&!eligiblePr(n)).length;
    if(context)add($('graph-counts'),'span',`${context} contextual PR${context===1?'':'s'} outside cohort`,'hidden-context');
    $('selection-summary').textContent=`Selected ${selected()?.type || 'object'}: ${fullLabel(selected())}`;
    $('map-title').textContent=S.lens==='reference'?'The broad reference map':S.lens==='audit'?'The audited sample':'A contribution and its neighbors';
    $('reference-control').classList.toggle('hidden',S.layer!=='reference');
    $('direction').options[1].textContent=S.layer==='reference'?'Referenced PRs / incoming':'Incoming / sources';
    $('direction').options[2].textContent=S.layer==='reference'?'Citing PRs / outgoing':'Outgoing / targets';
    $('cohort-date').textContent=days[S.cutoff] || 'all dates';
    const typeCounts=['pr','idea','account','event'].map(type=>({type,count:shown.nodes.filter(n=>n.type===type).length})).filter(t=>t.count).map(({type,count})=>`${count} ${{pr:count===1?'PR':'PRs',idea:count===1?'idea':'ideas',account:count===1?'account':'accounts',event:count===1?'event':'events'}[type]}`).join(', ');
    $('graph-scope').textContent=S.lens==='focus'?`${S.hops}-hop ${S.direction==='both'?'two-direction':S.direction==='ancestors'?'incoming':'outgoing'} neighborhood of ${label(selected())}: ${typeCounts}. This bounded view follows the selected relation layer.`:S.lens==='audit'?`Purposive audit overview: ${typeCounts}. Unannotated PRs are not zero-idea PRs.`:`Eligible reference overview: ${typeCounts}. Use a focused neighborhood to inspect a particular contribution.`;
    [186,633,417].forEach(pr=>$(`case-${pr}`).setAttribute('aria-pressed',String(S.lens==='focus'&&Number(selected()?.pr)===pr)));
    $('temporal-warning').textContent=S.future ? 'Later-opened antecedents are included. These may reflect edits, revision-specific reuse or retrospective attribution. Opening-order reversals are not evidence of time travel or historical causal cycles.' : 'Later-opened antecedents are excluded. Remaining references still come from frozen current text; this is not a historical graph. Exact current-text appearance is unknown.';
  }
  let lanePositions=new Map(),laneTypes=[];
  function prepareDisplayLanes(){lanePositions=new Map();laneTypes=[];if(S.dim!==2||S.lens==='reference'||shown.nodes.length>38)return;laneTypes=['account','pr','event','idea'].filter(type=>shown.nodes.some(n=>n.type===type));laneTypes.forEach((type,column)=>{const rows=shown.nodes.filter(n=>n.type===type).sort((a,b)=>String(a.created_at||'').localeCompare(String(b.created_at||''))||String(a.id).localeCompare(String(b.id)));rows.forEach((n,index)=>lanePositions.set(String(n.id),[column,(rows.length-1)/2-index,0]));});}
  function coords(n){const time=(Date.parse(n.created_at)||0)/86400000;const family=Number.isFinite(Number(n.family_y))?Number(n.family_y):0;return S.dim===3?[time,family,{pr:0,idea:1,account:2,event:3}[n.type]??0]:lanePositions.get(String(n.id))||[Number(n.x)||0,Number(n.y)||0,0];}
  function wrappedLabel(n,maxChars=24){const words=String(label(n)).split(/\s+/),lines=[];let line='';for(const word of words){if((line+' '+word).trim().length>maxChars&&line){lines.push(line);line=word;}else line=(line+' '+word).trim();}if(line)lines.push(line);return lines.slice(0,4).map((v,i)=>esc(i===3&&lines.length>4?v+'…':v)).join('<br>');}
  function nodeHover(n){return `${esc(fullLabel(n))}<br>${esc(n.type)}${n.author?' · '+esc(n.author):''}<br>${esc(dayOf(n)||'No opening timestamp')}${n.type==='pr'&&!eligiblePr(n)?'<br>Context outside selected cohort':''}<extra></extra>`;}
  async function renderGraph(){
    prepareDisplayLanes();const graph=$('graph'),is3=S.dim===3,compact=graph.clientWidth<430,traces=[];const annotations=[];
    const maxLaneRows=Math.max(1,...laneTypes.map(type=>shown.nodes.filter(n=>n.type===type).length));
    graph.style.height=`${is3?(compact?430:510):lanePositions.size?Math.max(compact?350:380,Math.min(740,maxLaneRows*(compact?62:57)+145)):(compact?420:540)}px`;
    const edgeGroups=new Map();shown.edges.forEach(e=>{const group=e.layer+(futureEdge(e)?':future':'');if(!edgeGroups.has(group))edgeGroups.set(group,[]);edgeGroups.get(group).push(e);});
    for(const [group,rows] of edgeGroups){
      const x=[],y=[],z=[],mx=[],my=[],mz=[],ids=[],hover=[];const context=['membership','authorship','participation'].includes(rows[0].layer);const color=group.endsWith(':future')?'#ffb454':context?'#6f91aa':'#a4d8ed';
      for(const e of rows){const a=coords(byId.get(String(e.source))),b=coords(byId.get(String(e.target)));x.push(a[0],b[0],null);y.push(a[1],b[1],null);z.push(a[2],b[2],null);mx.push((a[0]+b[0])/2);my.push((a[1]+b[1])/2);mz.push((a[2]+b[2])/2);ids.push({edge:e.id});hover.push(`${esc(label(byId.get(String(e.source))))} → ${esc(label(byId.get(String(e.target))))}<br>${esc(human(e.kind))}<br>${esc(layerNames[e.layer]||e.layer)}<extra></extra>`);
        if(!is3&&shown.edges.length<=160&&String(e.source)!==String(e.target))annotations.push({x:a[0]+.83*(b[0]-a[0]),y:a[1]+.83*(b[1]-a[1]),ax:a[0]+.65*(b[0]-a[0]),ay:a[1]+.65*(b[1]-a[1]),xref:'x',yref:'y',axref:'x',ayref:'y',text:'',showarrow:true,arrowhead:2,arrowsize:.9,arrowwidth:context?1.2:1.8,arrowcolor:color});
      }
      const line={type:is3?'scatter3d':'scatter',mode:'lines',x,y,line:{color,width:shown.edges.length>160?1:context?1.6:2.4},opacity:shown.edges.length>160?.6:1,hoverinfo:'skip',showlegend:false};if(is3)line.z=z;else if(context)line.line.dash='dot';traces.push(line);
      const hit={type:is3?'scatter3d':'scatter',mode:'markers',x:mx,y:my,customdata:ids,hovertemplate:hover,marker:{size:is3?3:6,color,opacity:shown.edges.length>160?.35:.65},showlegend:false};if(is3)hit.z=mz;traces.push(hit);
    }
    for(const type of ['pr','idea','account','event']){
      const group=shown.nodes.filter(n=>n.type===type);if(!group.length)continue;
      const p=group.map(coords);const trace={type:is3?'scatter3d':'scatter',mode:'markers+text',x:p.map(a=>a[0]),y:p.map(a=>a[1]),customdata:group.map(n=>({node:n.id})),text:group.map(n=>shown.nodes.length<=38||n.id===S.selected?(lanePositions.size?wrappedLabel(n,compact?12:24):esc(short(label(n),type==='pr'?18:28))):''),textposition:lanePositions.size?'bottom center':'top center',textfont:{size:compact?10:lanePositions.size?12:11,color:colors[type]},hovertemplate:group.map(nodeHover),marker:{size:group.map(n=>n.id===S.selected?(is3?11:23):(is3?6:lanePositions.size?type==='pr'?15:17:type==='pr'?11:13)),color:colors[type],symbol:symbols[type],opacity:group.map(n=>eligiblePr(n)?1:.45),line:{width:1.5,color:'#000'}},showlegend:false};if(is3){trace.z=p.map(a=>a[2]);trace.marker.opacity=1;}else trace.cliponaxis=false;traces.push(trace);
    }
    const base={paper_bgcolor:'#000',plot_bgcolor:'#000',font:{family:'-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif',color:'#f4f7fb',size:12},margin:{t:20,r:15,b:25,l:25},showlegend:false,hoverlabel:{bgcolor:'#080e13',bordercolor:'#53d8fb',font:{color:'#f4f7fb',size:12}},modebar:{bgcolor:'#080e13',color:'#b5c3d3',activecolor:'#53d8fb'},uirevision:`${S.dim}:${S.lens}:${S.layer}:${S.selected}`,dragmode:is3?'orbit':'pan'};
    if(is3){const families=new Map();shown.nodes.forEach(n=>{if(n.family_y!==undefined)families.set(Number(n.family_y),n.family||`Lane ${n.family_y}`);});const ticks=[...families.entries()].sort((a,b)=>a[0]-b[0]);const axisStyle={backgroundcolor:'#000',showbackground:true,gridcolor:'#2a3b4d',zerolinecolor:'#486278',color:'#b5c3d3',linecolor:'#486278',tickfont:{color:'#b5c3d3',size:10}};base.scene={bgcolor:'#000',xaxis:{...axisStyle,title:'PR opening / event date (UTC)',tickvals:days.map(d=>Date.parse(d)/86400000),ticktext:days.map(d=>d.slice(5))},yaxis:{...axisStyle,title:'Family lane (analytical grouping)',tickvals:ticks.map(x=>x[0]),ticktext:ticks.map(x=>short(x[1],24))},zaxis:{...axisStyle,title:'Object type',tickvals:[0,1,2,3],ticktext:['PR','Curated idea','Account','Recorded event'],range:[-.25,3.3]},camera:{eye:{x:1.5,y:-1.5,z:1.1}},aspectmode:'manual',aspectratio:{x:1.7,y:1.2,z:1}};}
    else {base.xaxis={visible:false,showgrid:false,zeroline:false};base.yaxis={visible:false,showgrid:false,zeroline:false};if(lanePositions.size){base.margin={t:44,r:compact?32:70,b:55,l:compact?32:70};base.xaxis.range=compact?[-.65,Math.max(.65,laneTypes.length-.35)]:[-.35,Math.max(.35,laneTypes.length-.65)];const ys=[...lanePositions.values()].map(p=>p[1]);base.yaxis.range=[Math.min(...ys)-.9,Math.max(...ys)+.55];laneTypes.forEach((type,column)=>annotations.push({x:column,y:1.09,xref:'x',yref:'paper',text:(compact?{pr:'PRs',idea:'Ideas',account:'Accounts',event:'Events'}:{pr:'PR containers',idea:'Curated ideas',account:'Accounts',event:'Recorded events'})[type],showarrow:false,font:{color:colors[type],size:compact?10:12}}));base.shapes=laneTypes.slice(1).map((_,index)=>({type:'line',xref:'x',yref:'paper',x0:index+.5,x1:index+.5,y0:0,y1:1,line:{color:'#182c3b',width:1,dash:'dot'},layer:'below'}));}base.annotations=annotations;}
    await Plotly.react(graph,traces,base,{responsive:true,displayModeBar:true,displaylogo:false,modeBarButtonsToRemove:['toImage','lasso2d','select2d','autoScale2d'],scrollZoom:false});
    if(graph.removeAllListeners)graph.removeAllListeners('plotly_click');
    graph.on('plotly_click',evt=>{const hit=evt.points?.find(p=>p.customdata)?.customdata;if(hit?.node)selectNode(hit.node);else if(hit?.edge)inspectEdge(hit.edge);});
    $('axis-caption').textContent=is3?'3D coordinates: PR opening / recorded event date × curated family lane × object type. Idea/account dates are display anchors, not origination dates. Distance has no causal or geographic meaning. Direction and source text are available in the table.':lanePositions.size?'2D display lanes separate accounts, PR containers, recorded events and curated ideas. Within each lane, opening / event dates order objects from top to bottom; spacing is for legibility, not elapsed time or scientific distance. Arrows point source → target.':'2D uses stable topology coordinates; distance does not measure scientific similarity or causality. In large overviews, arrowheads are omitted for legibility and responsiveness; inspect source → target in tooltips and the relation table.';
    $('graph-empty').classList.toggle('hidden',shown.edges.length>0);
    $('graph-empty').textContent='No eligible relation is shown for this selection and layer. Try both directions, a wider opening cohort, or another relation layer. A missing extracted edge does not establish independence.';
    $('export-svg').disabled=is3;$('export-png').disabled=!is3;
  }
  function evidenceItems(record){if(!record)return [];let list=arr(record.evidence);if(record.evidence?.excerpt)list=[record.evidence];if(record.excerpt)list=[record];if(!list.length&&record.evidence_excerpt)list=[{...record,excerpt:record.evidence_excerpt}];return list.filter(x=>x&&typeof x==='object'&&x.excerpt);}
  function renderEvidence(parent, record, title){
    const items=evidenceItems(record);if(!items.length){add(parent,'p','No exact excerpt is attached to this record. The relation metadata is not independent scientific verification.','warning-inline');return;}
    items.forEach((ev,i)=>{const card=add(parent,'div',undefined,'evidence-card');if(title||items.length>1)add(card,'h4',title || `Evidence ${i+1}`);add(card,'blockquote',ev.excerpt,'excerpt');safeLink(card,'Open attributed source',ev.source_url||record.source_url);const timing=ev.timing||{};add(card,'p',timing.qualification || (ev.temporal_visibility==='current_body_unknown'?'Frozen current body; exact text availability at PR opening is unknown.':'Source timing and edit history must be assessed separately.'),'evidence-timing');if(timing.timestamp)add(card,'p',`Recorded event time: ${timing.timestamp}`,'evidence-meta');add(card,'p',`Field: ${ev.source_field || record.source_field || 'not supplied'} · ${human(ev.statement_attribution||record.annotation_basis||'attributed source statement')}`,'evidence-meta');if(ev.source_head_sha)add(card,'p',`Snapshot PR head (does not version body): ${ev.source_head_sha}`,'evidence-meta');if(record.source_revision_claimed)add(card,'p',`Cited construction revision: ${record.source_revision_claimed}`,'evidence-meta');if(ev.snapshot_id)add(card,'p',`Frozen snapshot: ${ev.snapshot_id}`,'evidence-meta');if(ev.source_pointer)add(card,'p',`Local receipt: ${Array.isArray(ev.source_pointer)?ev.source_pointer.join('; '):ev.source_pointer}`,'evidence-meta');});
  }
  function renderSelected(){
    const n=selected(),p=$('selected-node');clear(p);if(!n){empty(p,'Select an object in the graph or search.');return;}
    $('selected-type').textContent=n.type==='idea'?'Curated idea':n.type==='account'?'Account':n.type==='event'?'Recorded event':'PR';
    $('selected-type').style.color=colors[n.type];
    add(p,'h3',fullLabel(n),'node-title');const idea=ideas.find(i=>i.id===n.id);
    if(idea?.technical_definition)add(p,'p',idea.technical_definition,'node-definition');
    metadata(p,[['Author account',n.author||n.actor],['Opened',n.type==='pr'?n.created_at:null],['Recorded event',n.type==='event'?n.created_at:null],['Parent PR',n.parent_pr?`#${n.parent_pr}`:null],['Snapshot state',n.type==='pr'?stateOf(n):null],['Curated family',n.family||idea?.family],['Stable ID',n.id]]);
    if(n.type==='pr')add(p,'p','This PR is a mutable container. Current text, pinned revisions and earlier reviews may describe different constructions.','control-hint');
    if(n.time_qualification)add(p,'p',n.time_qualification,'evidence-timing');
    if(n.metrics){const d=add(p,'details');add(d,'summary','Release graph metrics');renderObject(d,n.metrics);}
    safeLink(p,n.type==='account'?'Open public account':'Open source record',n.url||n.html_url);
    if(!eligiblePr(n))add(p,'p','This selected PR is retained as context outside the current cohort.','warning-inline');
    const assess=$('node-assessment');clear(assess);add(assess,'h3','Keep these assessments separate');
    const grid=add(assess,'div',undefined,'status-grid');
    const pairs=[['Global novelty',idea?.global_novelty||n.global_novelty||'unknown'],['Study replay',n.independent_verification||idea?.independent_verification||'not independently replayed'],['Potential',idea?.potential_score??'unassessed'],['Implementability',idea?.implementability_score??'unassessed'],['Source claim',n.audited||idea?'audited wording; not verified':'not semantically audited'],['Repository adoption',n.type==='pr'?(stateOf(n)==='merged'?'merged in snapshot':stateOf(n)==='unknown'?'unknown':'not merged in snapshot'):'not an idea-level measure']];
    pairs.forEach(([k,v])=>{const item=add(grid,'div',undefined,'status-item');add(item,'strong',k);item.append(String(v));});
  }
  function renderRelationsDesk(){
    const pick=$('relation-picker');clear(pick);
    let candidates=edges.filter(e=>inLayer(e) && (S.relationDirection!=='outgoing'&&String(e.target)===String(S.selected)||S.relationDirection!=='incoming'&&String(e.source)===String(S.selected)));
    candidates.sort((a,b)=>(a.layer==='semantic'?-1:0)-(b.layer==='semantic'?-1:0)||String(a.id).localeCompare(String(b.id)));
    let chosen=candidates.find(e=>e.id===S.edge);
    if(!chosen&&S.edge){const e=edges.find(e=>e.id===S.edge);if(e){candidates.unshift(e);chosen=e;}}
    if(!chosen){chosen=candidates[0];S.edge=chosen?.id||null;}
    if(!candidates.length){const o=add(pick,'option','No relation in this layer');o.value='';pick.disabled=true;}else {pick.disabled=false;candidates.forEach(e=>{const o=add(pick,'option',`${label(byId.get(String(e.source)))} → ${label(byId.get(String(e.target)))} · ${human(e.kind)}`);o.value=e.id;});pick.value=chosen?.id||'';}
    $('relation-count').textContent=`${candidates.length} inspectable relation${candidates.length===1?'':'s'} in this layer. Source inspection includes relations hidden by cohort or timing filters.`;
    const p=$('relation-evidence');clear(p);
    if(!chosen){empty(p,'No source-backed relation is attached in this layer. Change the relation layer to inspect another type of evidence.');return;}
    const a=byId.get(String(chosen.source)),b=byId.get(String(chosen.target));
    add(p,'h3',`${label(a)} → ${label(b)}`,'relation-title');add(p,'p',`${human(chosen.kind)} · ${layerNames[chosen.layer]||chosen.layer}`,'node-subtitle');
    const row=add(p,'div');button(row,`Select ${short(label(a),25)}`,()=>selectNode(a.id),'inline-link');row.append(' / ');button(row,`Select ${short(label(b),25)}`,()=>selectNode(b.id),'inline-link');
    if(!shown.edges.some(e=>e.id===chosen.id))add(p,'p','This relation is outside the currently shown graph. Its frozen evidence remains inspectable.','warning-inline');
    if(futureEdge(chosen))add(p,'p','The antecedent PR opened later than the target PR. This current-text relation cannot be dated to target opening.','warning-inline');
    if(chosen.source_current_body_matches_antecedent===false)add(p,'p','Version mismatch: the antecedent is a pinned earlier construction, not the source PR’s frozen current body. In #376 → #417, the cited R822 scope must not be replaced by #376’s later split-centre / signed-admission scope. Earlier verification does not verify the current-body claim.','qualification');
    if(chosen.qualification)add(p,'p',chosen.qualification,'evidence-timing');
    metadata(p,[['Relation ID',chosen.id],['Source contribution',chosen.source_contribution_id],['Target contribution',chosen.target_contribution_id],['Basis',human(chosen.annotation_basis||chosen.extraction||chosen.confidence||'source metadata')],['Timing',human(chosen.temporal_visibility||evidenceItems(chosen)[0]?.temporal_visibility||'unknown')],['Cited revision',chosen.source_revision_claimed]]);
    renderEvidence(p,chosen);arr(chosen.supporting_evidence).forEach(ev=>renderEvidence(p,ev,'Supporting excerpt'));
  }
  function inspectEdge(id){S.edge=id;renderRelationsDesk();renderRelationTable();}
  function selectNode(id){if(!byId.has(String(id)))return;S.selected=String(id);S.edge=null;S.page=0;const n=selected();if(n.type==='idea'&&!['audited','membership','participation'].includes(S.layer))S.layer='membership';if(n.type==='account'&&!['audited','authorship','communication','participation'].includes(S.layer))S.layer='authorship';if(n.type==='event'&&!['audited','semantic','authorship'].includes(S.layer))S.layer='semantic';$('edge-layer').value=S.layer;$('node-search').value='';$('search-results').classList.add('hidden');render();}
  function renderRelationTable(){
    const body=$('relations-table').querySelector('tbody');clear(body);const all=[...shown.edges].sort((a,b)=>String(a.layer).localeCompare(String(b.layer))||String(a.id).localeCompare(String(b.id)));const pages=Math.max(1,Math.ceil(all.length/40));S.page=Math.min(S.page,pages-1);
    all.slice(S.page*40,S.page*40+40).forEach(e=>{const tr=add(body,'tr');if(e.id===S.edge)tr.className='selected-row';const a=byId.get(String(e.source)),b=byId.get(String(e.target));button(add(tr,'td'),short(fullLabel(a),60),()=>selectNode(a.id));button(add(tr,'td'),human(e.kind),()=>inspectEdge(e.id));button(add(tr,'td'),short(fullLabel(b),60),()=>selectNode(b.id));add(tr,'td',layerNames[e.layer]||e.layer);const td=add(tr,'td');add(td,'span',futureEdge(e)?'Later-opened antecedent':human(e.temporal_visibility||evidenceItems(e)[0]?.temporal_visibility||'timing not supplied'));button(td,'Inspect evidence',()=>inspectEdge(e.id),'inline-link');});
    if(!all.length){const td=add(add(body,'tr'),'td','No relations under the current graph controls. Missing extraction is not evidence of scientific independence.');td.colSpan=5;}
    $('relation-table-count').textContent=`${all.length} shown relations`;$('relation-page').textContent=`Page ${S.page+1} of ${pages} · 40 rows per page`;$('relation-prev').disabled=S.page===0;$('relation-next').disabled=S.page>=pages-1;
  }
  function relatedPRs(){const n=selected();if(!n)return [];if(n.type==='pr')return [n];if(n.type==='event')return [byPr.get(Number(n.parent_pr))].filter(Boolean);if(n.type==='idea'){const ids=ideas.find(i=>i.id===n.id)?.participating_prs||[];return ids.map(p=>byPr.get(Number(p))).filter(Boolean);}return prNodes.filter(p=>p.author===(n.author||n.label||String(n.id).replace(/^account:/,'')));}
  function renderTrajectory(){
    const p=$('trajectory');clear(p);const n=selected();if(!n)return;
    const prs=relatedPRs();const prsSet=new Set(prs.map(p=>Number(p.pr)));const account=n.type==='account'?(n.author||n.label):null;
    const relevant=ideas.filter(i=>i.id===n.id||(account?(i.per_pr_evidence||[]).some(r=>evidenceItems(r).some(ev=>ev.source_actor_login===account)):(i.participating_prs||[]).some(pr=>prsSet.has(Number(pr)))));
    if(!relevant.length)empty(p,'No technique-specific idea annotation covers this object in the purposive audit. Its reference or authorship edges do not supply a novelty assessment.');
    relevant.forEach(i=>{const div=add(p,'div',undefined,'trajectory-item');button(div,i.label,()=>selectNode(i.id));if(i.reused_concepts_vs_new_modification)add(div,'p',i.reused_concepts_vs_new_modification);const roles=(i.per_pr_evidence||[]).filter(r=>n.type==='idea'||(account?evidenceItems(r).some(ev=>ev.source_actor_login===account):prsSet.has(Number(r.pr))));roles.forEach(r=>{const row=add(div,'p');button(row,`#${r.pr}`,()=>selectNode(byPr.get(Number(r.pr))?.id),'inline-link');row.append(` — ${human(r.semantic_role)}; ${account?'attributed source actor':'source-relative'} role`);});if(i.limits)add(div,'p',i.limits);});
    const notes=arr(D.audit_notes).filter(a=>(a.prs||[]).some(pr=>prsSet.has(Number(pr))));notes.forEach(a=>{const d=add(p,'div',undefined,'note-card');add(d,'h3','Version / timing qualification');add(d,'p',a.finding);add(d,'p',a.consequence);});
    if(prs.length>1){const div=add(p,'details');add(div,'summary',`${prs.length} participating PR openings`);prs.sort((a,b)=>String(a.created_at).localeCompare(String(b.created_at))).forEach(pr=>{const r=add(div,'div',undefined,'trajectory-item');button(r,fullLabel(pr),()=>selectNode(pr.id));add(r,'span',`${pr.created_at||'Opening unknown'} · Current-text appearance unknown`,'trajectory-time');});}
  }
  function setupClaims(){const sel=$('claim-series');clear(sel);const all=add(sel,'option','All audited series');all.value='all';[...new Set(claims.map(c=>c.series||'Unspecified series'))].forEach(s=>{const o=add(sel,'option',human(s));o.value=s;});}
  async function renderClaims(){
    const selectedPrs=new Set(relatedPRs().map(n=>Number(n.pr)));const available=claims.filter(c=>S.series==='all'||(c.series||'Unspecified series')===S.series);const groups=new Map();available.forEach(c=>{const key=c.series||'Unspecified series';if(!groups.has(key))groups.set(key,[]);groups.get(key).push(c);});
    const relatedClaims=claims.filter(c=>selectedPrs.has(Number(c.pr)));$('claim-selection-note').textContent=relatedClaims.length?`${relatedClaims.length} retained audited claim${relatedClaims.length===1?'':'s'} belong to the selected object’s PR records; these points are enlarged.`:`No retained numerical claim covers ${label(selected())} in this audit. The series overview below remains available; missingness is not a negative result.`;
    const picker=$('claim-picker');clear(picker);available.forEach(c=>{const o=add(picker,'option',`#${c.pr} · ${human(c.series)} · κ ${c.value_decimal_text??c.value}`);o.value=c.id;});picker.disabled=!available.length;
    const palette=['#53d8fb','#64e0a9','#c1a2ff','#ffb454','#f59bd7'];const traces=[...groups].map(([series,list],idx)=>({type:'scatter',mode:'markers',name:human(series),x:list.map(c=>c.pr_opened_at||byPr.get(Number(c.pr))?.created_at),y:list.map(c=>Number(c.value_decimal_text??c.value)),customdata:list.map(c=>c.id),marker:{color:palette[idx%palette.length],size:list.map(c=>selectedPrs.has(Number(c.pr))?15:11),symbol:idx%2?'diamond':'circle',line:{color:'#000',width:1.2}},hovertemplate:list.map(c=>`#${c.pr}<br>κ = ${esc(c.value_decimal_text??c.value)}<br>${esc(human(series))}<br>Source-reported; current-text appearance unknown<extra></extra>`)}));
    await Plotly.react($('claim-plot'),traces,{paper_bgcolor:'#000',plot_bgcolor:'#000',font:{family:'-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif',color:'#f4f7fb',size:11},margin:{t:20,r:18,b:90,l:72},xaxis:{title:'PR opening (navigation date only)',type:'date',gridcolor:'#23394a',color:'#b5c3d3',linecolor:'#486278'},yaxis:{title:'Conditional κ',tickformat:'.2g',gridcolor:'#23394a',color:'#b5c3d3',zeroline:false},legend:{orientation:'h',y:-.3,yanchor:'top',font:{size:11,color:'#f4f7fb'},bgcolor:'#000'},hoverlabel:{bgcolor:'#080e13',bordercolor:'#53d8fb',font:{size:12,color:'#f4f7fb'}},uirevision:'claims'}, {responsive:true,displayModeBar:false});
    const plot=$('claim-plot');if(plot.removeAllListeners)plot.removeAllListeners('plotly_click');plot.on('plotly_click',e=>{S.claim=e.points?.[0]?.customdata;renderClaimDetails();});
    if(!available.some(c=>c.id===S.claim))S.claim=(available.find(c=>selectedPrs.has(Number(c.pr)))||available[0])?.id;picker.value=S.claim||'';renderClaimDetails();
  }
  function renderClaimDetails(){
    $('claim-picker').value=S.claim||'';
    const p=$('claim-details');clear(p);const c=claims.find(c=>c.id===S.claim);if(!c){empty(p,'No unambiguous audited numerical claim is available for this series. See exclusions below.');return;}
    const heading=add(p,'div',undefined,'claim-details-heading');button(heading,`#${c.pr} · ${human(c.series)}`,()=>selectNode(byPr.get(Number(c.pr))?.id),'inline-link');add(heading,'span',`κ = ${c.value_decimal_text??c.value}`,'claim-value');
    add(p,'p',c.quantity||'Source-reported conditional claim','control-hint');renderEvidence(p,c.headline_evidence,'Exact numerical claim');const detail=add(p,'details');add(detail,'summary','Assumptions and source version');renderEvidence(detail,c.assumption_evidence,'Stated assumptions');arr(c.inherited_assumption_evidence).forEach(ev=>renderEvidence(detail,ev,'Inherited assumptions from cited proposal'));if(c.assumption_link_qualification)add(detail,'p',c.assumption_link_qualification,'warning-inline');if(c.candidate_selection)add(detail,'p',c.candidate_selection);add(detail,'p',c.plot_qualification||'The study has not independently replayed this claim.');
  }
  function recordList(parent, records, labelKey){
    if(!records.length){empty(parent,'No records supplied in this release.');return;}
    records.forEach((r,index)=>{const d=add(parent,'div',undefined,'note-card');if(typeof r!=='object'){add(d,'p',r);return;}add(d,'h3',r[labelKey]||r.title||r.name||r.id||`Record ${index+1}`);Object.entries(r).filter(([k])=>!['id','title','name',labelKey,'evidence','supporting_evidence'].includes(k)&&!k.toLowerCase().includes('email')).forEach(([k,v])=>{if(v===null||v===undefined)return;if(typeof v==='object'){const det=add(d,'details');add(det,'summary',human(k));renderObject(det,v);}else add(d,'p',`${human(k)}: ${v}`);});if(evidenceItems(r).length){const det=add(d,'details');add(det,'summary','Exact source evidence');renderEvidence(det,r);}});
  }
  function renderObject(parent, object){
    if(object===null||object===undefined){add(parent,'p','Not supplied');return;}
    if(typeof object!=='object'){add(parent,'p',object);return;}
    if(Array.isArray(object)){if(!object.length){add(parent,'p','No records');return;}if(object.length>30)add(parent,'p',`Showing the first 30 of ${object.length} records; complete data are in the downloadable hierarchy and CSV files.`,'control-hint');object.slice(0,30).forEach(x=>{if(typeof x==='object'){const d=add(parent,'div',undefined,'note-card');renderObject(d,x);}else add(parent,'p',x);});return;}
    const simple=[],nested=[];Object.entries(object).filter(([k])=>!k.toLowerCase().includes('email')).forEach(([k,v])=>{if(v!==null&&typeof v==='object')nested.push([k,v]);else simple.push([human(k),v??'unknown']);});metadata(parent,simple);nested.forEach(([k,v])=>{const det=add(parent,'details');add(det,'summary',human(k));let ready=false;det.addEventListener('toggle',()=>{if(det.open&&!ready){ready=true;renderObject(det,v);}});});
  }
  function authorRecords(){if(Array.isArray(D.authors))return D.authors;if(D.authors&&typeof D.authors==='object'){if(Array.isArray(D.authors.authors))return D.authors.authors;return Object.entries(D.authors).filter(([,v])=>v&&typeof v==='object').map(([login,v])=>({login,...v}));}return [];}
  function renderAuthors(){
    const records=authorRecords();const allowed=new Set(shown.nodes.filter(n=>n.type==='account').flatMap(n=>[n.id,n.label,n.author,String(n.id).replace(/^account:/,'')]));shown.nodes.filter(n=>n.author).forEach(n=>allowed.add(n.author));
    const login=r=>r.login||r.author||r.account||r.id||r.name;
    const rows=records.filter(r=>S.authorScope==='all'||allowed.has(login(r))).sort((a,b)=>Number(b.prs??b.pr_count??b.pr_volume??b.authored_prs??0)-Number(a.prs??a.pr_count??a.pr_volume??a.authored_prs??0));
    const table=$('authors-table'),head=table.querySelector('thead'),body=table.querySelector('tbody');clear(head);clear(body);
    const preferred=['prs','pr_count','pr_volume','active_days','audited_idea_participation','evidenced_idea_participation','citing_pr_pairs','cited_antecedent_pairs','cross_account_citing_pairs_per_pr','reference_counterparties','reference_projection_betweenness','responses_sent','responses_received','response_counterparties','authored_prs','authored_pr_count','merged_prs','reference_in_degree','reference_out_degree','in_degree','out_degree','betweenness','max_k_core','k_core','comments_sent','reviews_sent'];
    const keys=[...new Set(records.flatMap(r=>Object.keys(r)))].filter(k=>!['login','author','account','id','name','url'].includes(k)&&!k.toLowerCase().includes('email')&&records.some(r=>typeof r[k]==='number'));
    keys.sort((a,b)=>(preferred.indexOf(a)<0?999:preferred.indexOf(a))-(preferred.indexOf(b)<0?999:preferred.indexOf(b)));
    const headings={prs:'Authored PRs (volume)',audited_idea_participation:'Ideas in authored PRs (sample)',evidenced_idea_participation:'Ideas with attributed source roles (sample)',citing_pr_pairs:'Citing PR pairs',cited_antecedent_pairs:'Antecedent PR pairs cited',reference_projection_betweenness:'Reference projection betweenness'};
    const tr=add(head,'tr');add(tr,'th','Account');keys.forEach(k=>add(tr,'th',headings[k]||human(k)));
    rows.forEach(r=>{const tr=add(body,'tr'),td=add(tr,'td');const n=nodes.find(n=>n.type==='account'&&[n.id,n.label,n.author,String(n.id).replace(/^account:/,'')].includes(login(r)));if(n)button(td,login(r),()=>selectNode(n.id));else td.textContent=login(r);keys.forEach(k=>add(tr,'td',r[k]===null||r[k]===undefined?'unknown':fmt(r[k]),'metric-value'));});
    if(!rows.length){const td=add(add(body,'tr'),'td',records.length?'No account summary matches the shown graph. Choose all release accounts.':'Account topology summaries have not been supplied. Authorship remains inspectable in the graph.');td.colSpan=keys.length+1;}
    $('author-summary').textContent=`${rows.length} shown / ${records.length} release account rows. Metrics use the release graph specification and the full release; cohort controls only choose rows here. PR volume is a denominator, not an idea count.`;
  }
  function renderStatic(){
    const meta=D.meta||{};$('release-meta').textContent=`${prNodes.length} PRs · ${ideas.length} curated ideas · baseline ${String(meta.frozen_baseline||meta.baseline_commit||meta.baseline||meta.baseline_sha||'recorded in release').slice(0,12)}`;
    const p=$('coverage');clear(p);const grid=add(p,'div',undefined,'coverage-grid');
    const selectedPrs=new Set(ideas.flatMap(i=>i.participating_prs||[]));
    [[`${prNodes.length} PR records in frozen census`,'The broad reference lens covers the PR census. References extracted from current text describe observed links, not established inheritance. Zero extracted degree is not evidence of independence.'],[`${ideas.length} ideas across ${selectedPrs.size} purposively selected PRs`,'Technique-specific concepts are manually curated in a small, purposive audit. Membership is many-to-many; unaudited PRs are not zero-idea PRs. This sample cannot estimate the population’s novelty or success rate.'],['Three clocks, separate claims','PR opening, recorded comment/review time and current-text availability are distinct. A source-reported check, independent study replay and merge adoption are separate assessments.']].forEach(([h,t])=>{const d=add(grid,'div');add(d,'strong',h);add(d,'p',t);});
    clear($('claim-exclusions'));recordList($('claim-exclusions'),arr(D.exclusions||D.kappa_exclusions).map(e=>({...e,title:e.pr?`#${e.pr}`:e.title})),'title');
    clear($('audit-notes'));recordList($('audit-notes'),arr(D.audit_notes),'finding');
    clear($('hierarchy'));safeLink($('hierarchy'),'Download complete hierarchy JSON','../hierarchy.json');safeLink($('hierarchy'),'Download all recursive feature CSV rows','../tables/recursive_neighborhoods.csv');renderObject($('hierarchy'),D.hierarchy||{levels:['Frozen evidence records','Attributed typed relations','Graph features under declared extraction','Curated concept families / algorithmic groups','Exploratory hypotheses'],boundary:'Hypotheses are never promoted to observed edges.'});
    clear($('hypotheses'));const h=Array.isArray(D.hypotheses)?D.hypotheses:arr(D.hypotheses?.hypotheses||D.hypotheses?.records||D.hypotheses);recordList($('hypotheses'),h,'title');
    renderSensitivity();
  }
  function renderSensitivity(){
    const p=$('sensitivity');clear(p);const summaries=D.graph_summaries;if(!summaries){empty(p,'No topology comparison has been supplied. Metrics cannot be inferred from the plotted geometry.');return;}
    const records=Array.isArray(summaries)?summaries:Object.entries(summaries).filter(([,v])=>v&&typeof v==='object').map(([name,v])=>({name,...v}));
    const numeric=[...new Set(records.flatMap(r=>Object.keys(r)))].filter(k=>records.some(r=>typeof r[k]==='number'));
    if(records.length&&numeric.length){const wrap=add(p,'div',undefined,'table-scroll'),table=add(wrap,'table',undefined,'mini-table'),head=add(table,'thead'),tr=add(head,'tr');add(tr,'th','Graph specification');numeric.forEach(k=>add(tr,'th',human(k)));const body=add(table,'tbody');records.forEach(r=>{const tr=add(body,'tr');add(tr,'td',human(r.label||r.name||r.specification||r.id||'Specification'));numeric.forEach(k=>add(tr,'td',fmt(r[k])));});}
    const detail=add(p,'details');add(detail,'summary','Full specification, metrics and sensitivity records');renderObject(detail,summaries);add(p,'p','URL-only and shorthand extraction can produce different centralities and cycles. Removing later-opened antecedents does not recover a historical graph. Families and communities are analytical summaries, not discovered scientific schools.','plot-caption');
  }
  function syncControls(){['lens','direction'].forEach(id=>$(id).value=S[id]);$('edge-layer').value=S.layer;$('reference-spec').value=S.spec;$('hops').value=S.hops;$('cohort-end').value=S.cutoff;$('state-filter').value=S.state;$('future-references').checked=S.future;$('view-2d').setAttribute('aria-pressed',String(S.dim===2));$('view-3d').setAttribute('aria-pressed',String(S.dim===3));$('claim-series').value=S.series;}
  function render(){graphScope();renderCounts();renderSelected();renderRelationsDesk();renderRelationTable();renderTrajectory();renderAuthors();renderGraph().catch(showError);renderClaims().catch(showError);}
  function showError(error){$('action-status').textContent=`The view could not be rendered: ${error.message}. Source records remain available in the tables.`;console.error(error);}
  function search(){const query=$('node-search').value.trim().toLowerCase(),box=$('search-results');clear(box);if(!query){box.classList.add('hidden');return;}box.classList.remove('hidden');const bare=query.replace(/^#/,'');const matches=nodes.filter(n=>`${n.id} ${n.pr||''} ${n.label||''} ${n.title||''} ${n.author||''} ${n.family||''}`.toLowerCase().includes(query)||n.type==='pr'&&String(n.pr)===bare).sort((a,b)=>(String(a.pr)===bare?-1:0)-(String(b.pr)===bare?-1:0));add(box,'div',`${matches.length} matches · first ${Math.min(matches.length,30)} shown`,'search-count');matches.slice(0,30).forEach(n=>{const b=button(box,'',()=>selectNode(n.id),'search-result');add(b,'strong',short(fullLabel(n),100));add(b,'small',`${n.type}${n.author?' · '+n.author:''}${n.family?' · '+human(n.family):''}`);});if(!matches.length)add(box,'p','No match in this release. Search a PR number, title phrase, curated idea or account.','search-count');}
  function stopPlay(){if(S.timer)clearInterval(S.timer);S.timer=null;$('play-cohort').textContent='Play cohorts';$('play-cohort').setAttribute('aria-pressed','false');}
  function download(name,body,type){const url=URL.createObjectURL(new Blob([body],{type}));const a=make('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function csvCell(value){let text=value===null||value===undefined?'':String(value);if(/^[=+@\-]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"';}
  function downloadCSV(){const header=['record_type','id','node_type_or_layer','label_or_kind','source','target','created_at','source_url','temporal_visibility','future_at_opening','exact_excerpt'];const rows=shown.nodes.map(n=>['node',n.id,n.type,fullLabel(n),'','',n.created_at||'',n.url||n.html_url||'','','','']);shown.edges.forEach(e=>{const ev=evidenceItems(e)[0]||{};rows.push(['edge',e.id,e.layer,e.kind,e.source,e.target,'',ev.source_url||e.source_url||'',ev.temporal_visibility||e.temporal_visibility||'unknown',futureEdge(e),ev.excerpt||'']);});download('lineage-shown-graph.csv',[header,...rows].map(r=>r.map(csvCell).join(',')).join('\r\n'),'text/csv;charset=utf-8');$('action-status').textContent=`Downloaded ${shown.nodes.length} objects and ${shown.edges.length} relations. CSV preserves source IDs and exact excerpts; it is a filtered snapshot, not historical evidence.`;}
  function bind(){
    [186,633,417].forEach(pr=>{const b=$(`case-${pr}`);b.disabled=!byPr.has(pr);b.addEventListener('click',()=>{stopPlay();Object.assign(S,{lens:'focus',layer:'audited',direction:'both',hops:1,cutoff:days.length-1,state:'all',edge:null,page:0});syncControls();selectNode(byPr.get(pr)?.id);});});
    $('node-search').addEventListener('input',search);$('node-search').addEventListener('keydown',e=>{if(e.key==='Escape')$('search-results').classList.add('hidden');if(e.key==='Enter'){const b=$('search-results').querySelector('button');if(b){e.preventDefault();b.click();}}});document.addEventListener('click',e=>{if(!e.target.closest('.search-control'))$('search-results').classList.add('hidden');});
    $('lens').addEventListener('change',e=>{S.lens=e.target.value;S.page=0;if(S.lens==='reference')S.layer='reference';if(S.lens==='audit')S.layer='audited';S.edge=null;syncControls();render();});
    $('edge-layer').addEventListener('change',e=>{S.layer=e.target.value;S.edge=null;S.page=0;render();});
    $('reference-spec').addEventListener('change',e=>{S.spec=e.target.value;S.edge=null;S.page=0;render();});
    $('direction').addEventListener('change',e=>{S.direction=e.target.value;S.page=0;render();});$('hops').addEventListener('change',e=>{S.hops=Number(e.target.value);S.page=0;render();});
    $('cohort-end').min=0;$('cohort-end').max=Math.max(0,days.length-1);$('cohort-end').value=S.cutoff;$('cohort-end').addEventListener('input',e=>{stopPlay();S.cutoff=Number(e.target.value);S.page=0;render();});
    $('future-references').addEventListener('change',e=>{S.future=e.target.checked;S.page=0;render();});$('state-filter').addEventListener('change',e=>{S.state=e.target.value;S.page=0;render();});
    [2,3].forEach(dim=>$(`view-${dim}d`).addEventListener('click',()=>{S.dim=dim;syncControls();renderGraph().catch(showError);}));
    $('relation-direction').addEventListener('change',e=>{S.relationDirection=e.target.value;S.edge=null;renderRelationsDesk();});$('relation-picker').addEventListener('change',e=>inspectEdge(e.target.value));
    $('focus-selection').addEventListener('click',()=>{S.lens='focus';S.page=0;syncControls();render();});
    $('relation-prev').addEventListener('click',()=>{S.page--;renderRelationTable();});$('relation-next').addEventListener('click',()=>{S.page++;renderRelationTable();});
    $('claim-series').addEventListener('change',e=>{S.series=e.target.value;S.claim=null;renderClaims().catch(showError);});$('claim-picker').addEventListener('change',e=>{S.claim=e.target.value;renderClaimDetails();});$('author-scope').addEventListener('change',e=>{S.authorScope=e.target.value;renderAuthors();});
    $('play-cohort').addEventListener('click',()=>{if(S.timer){stopPlay();return;}if(S.cutoff>=days.length-1)S.cutoff=-1;$('play-cohort').textContent='Pause cohorts';$('play-cohort').setAttribute('aria-pressed','true');const step=()=>{S.cutoff++;$('cohort-end').value=S.cutoff;S.page=0;render();if(S.cutoff>=days.length-1)stopPlay();};step();if(S.cutoff<days.length-1)S.timer=setInterval(step,window.matchMedia('(prefers-reduced-motion: reduce)').matches?3000:1700);});
    $('reset').addEventListener('click',()=>{stopPlay();Object.assign(S,{selected:byPr.get(186)?.id||nodes[0]?.id,layer:'audited',lens:'focus',direction:'both',hops:1,dim:2,cutoff:days.length-1,future:false,state:'all',edge:null,relationDirection:'both',page:0,series:'all',claim:null,spec:'body'});$('relation-direction').value='both';$('node-search').value='';$('search-results').classList.add('hidden');syncControls();render();});
    $('download-csv').addEventListener('click',downloadCSV);$('download-json').addEventListener('click',()=>{const {timer,...controls}=S;download('lineage-shown-graph.json',JSON.stringify({meta:D.meta,controls,caveat:'PR opening cohort; exact current-text appearance unknown. Not a causal or historical graph.',nodes:shown.nodes,edges:shown.edges},null,2),'application/json');$('action-status').textContent='Downloaded the shown objects, relations, evidence and control settings.';});
    $('export-svg').addEventListener('click',()=>Plotly.downloadImage($('graph'),{format:'svg',filename:'lineage-2d',width:1400,height:900}).then(()=>{$('action-status').textContent='Exported the current 2D view as SVG.';}).catch(showError));$('export-png').addEventListener('click',()=>Plotly.downloadImage($('graph'),{format:'png',filename:'lineage-3d',width:1600,height:1100}).then(()=>{$('action-status').textContent='Exported the current 3D view as PNG.';}).catch(showError));
  }
  let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>renderGraph().catch(showError),180);});
  setupClaims();bind();renderStatic();syncControls();render();
  window.LINEAGE_UI={getState:()=>({...S,timer:!!S.timer}),getShown:()=>({nodeIds:shown.nodes.map(n=>n.id),edgeIds:shown.edges.map(e=>e.id)}),selectNode};
})();
