
/* ── Resources Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
  const TEAM = [
    { av:'SC', bg:'#7c6ff7,#00dcd2', name:'Sarah Chen',  role:'pm',     title:'Project Manager',  projects:3, tasks:8,  load:85,  status:'away',   skills:['Agile','JIRA','Stakeholder Mgmt'] },
    { av:'AR', bg:'#1fd689,#0099ff', name:'Alex Rivera', role:'dev',    title:'Backend Engineer', projects:2, tasks:6,  load:70,  status:'online', skills:['Node.js','PostgreSQL','Docker'] },
    { av:'MJ', bg:'#f5a623,#f04e6e', name:'Mia Johnson', role:'exec',   title:'VP Product',       projects:1, tasks:4,  load:110, status:'online', overloaded:true, skills:['Strategy','OKRs','Budgeting'] },
    { av:'JW', bg:'#00dcd2,#0099ff', name:'Jin Wu',      role:'dev',    title:'Data Engineer',    projects:2, tasks:7,  load:60,  status:'online', skills:['Python','Spark','Airflow'] },
    { av:'PN', bg:'#7c6ff7,#f04e6e', name:'Priya Nair',  role:'dev',    title:'UI/UX Designer',   projects:2, tasks:9,  load:95,  status:'offline',overloaded:true, skills:['Figma','Illustrator','CSS'] },
    { av:'TP', bg:'#1fd689,#7c6ff7', name:'Tom Park',    role:'dev',    title:'DevOps Engineer',  projects:1, tasks:3,  load:40,  status:'online', skills:['AWS','Kubernetes','CI/CD'] },
    { av:'DL', bg:'#f04e6e,#7c6ff7', name:'Dev Lee',     role:'dev',    title:'Frontend Dev',     projects:2, tasks:5,  load:75,  status:'away',   skills:['React','TypeScript','Tailwind'] },
    { av:'SK', bg:'#f5a623,#1fd689', name:'Sam Ko',      role:'dev',    title:'Data Analyst',     projects:1, tasks:4,  load:55,  status:'online', skills:['SQL','Tableau','Python'] },
  ];

  const statusDotMap = { online:'nw-online', away:'nw-away', offline:'nw-offline' };
  const statusIcon   = { online:'fa-circle', away:'fa-clock', offline:'fa-circle-xmark' };
  const statusColor  = { online:'var(--nw-green)', away:'var(--nw-amber)', offline:'var(--nw-text-3)' };
  const roleIcons    = { pm:'fa-clipboard-user', dev:'fa-code', exec:'fa-crown', client:'fa-handshake' };

  const rl = document.getElementById('resource-list');
  if (rl) TEAM.forEach(m => {
    const lc = m.load > 100 ? 'var(--nw-rose)' : m.load > 80 ? 'var(--nw-amber)' : 'var(--nw-cyan)';
    const warn = m.overloaded
      ? `<span style="font-size:.68rem;background:rgba(240,78,110,.1);color:var(--nw-rose);padding:3px 8px;border-radius:6px;font-weight:600;white-space:nowrap"><i class="fa-solid fa-triangle-exclamation fa-xs me-1"></i>Overloaded</span>`
      : '';
    rl.innerHTML += `<div class="nw-res-row">
      <span class="nw-status-dot ${statusDotMap[m.status]}"></span>
      <div class="nw-av" style="width:38px;height:38px;font-size:13px;background:linear-gradient(135deg,${m.bg})">${m.av}</div>
      <div style="min-width:180px">
        <div style="font-size:.875rem;font-weight:500"><i class="fa-solid ${roleIcons[m.role]} fa-xs me-1" style="color:var(--nw-text-3)"></i>${m.name} ${NW.role(m.role)}</div>
        <div style="font-size:.72rem;color:var(--nw-text-3)">${m.title}</div>
      </div>
      <div style="font-size:.78rem;color:var(--nw-text-2);min-width:65px"><i class="fa-solid fa-list-check fa-xs me-1"></i>${m.tasks} tasks</div>
      <div style="font-size:.78rem;color:var(--nw-text-2);min-width:85px"><i class="fa-solid fa-diagram-project fa-xs me-1"></i>${m.projects} project${m.projects > 1 ? 's' : ''}</div>
      <div class="d-flex align-items-center gap-2 flex-fill">
        <div class="nw-load-bar"><div class="nw-load-fill" style="width:${Math.min(m.load,100)}%;background:${lc}"></div></div>
        <span style="font-size:.78rem;font-weight:600;color:${lc};min-width:36px">${m.load}%</span>
      </div>
      ${warn}
      <div class="d-flex gap-1">
        <button class="btn btn-nw-ghost btn-sm" style="font-size:.72rem"><i class="fa-solid fa-plus fa-xs me-1"></i>Assign</button>
        <button class="btn btn-nw-ghost btn-sm" style="font-size:.72rem"><i class="fa-solid fa-eye fa-xs me-1"></i>View</button>
      </div>
    </div>`;
  });

  const PROJS = [
    { name:'Apex Redesign', color:'var(--nw-cyan)',   members:3, pct:72 },
    { name:'Mobile App v3', color:'var(--nw-violet)', members:4, pct:58 },
    { name:'Data Pipeline', color:'var(--nw-amber)',  members:3, pct:50 },
    { name:'Client Portal', color:'var(--nw-green)',  members:2, pct:35 },
    { name:'Brand Refresh', color:'var(--nw-rose)',   members:2, pct:90 },
  ];
  const pa = document.getElementById('proj-alloc');
  if (pa) PROJS.forEach(p => {
    pa.innerHTML += `<div class="mb-3">
      <div class="d-flex justify-content-between mb-1" style="font-size:.82rem">
        <span style="font-weight:500">${p.name} <span style="color:var(--nw-text-3);font-size:.72rem">(${p.members} members)</span></span>
        <span style="color:var(--nw-text-2)">${p.pct}%</span>
      </div>
      <div class="nw-progress"><div class="nw-progress-bar" style="width:${p.pct}%;background:${p.color}"></div></div>
    </div>`;
  });

  const SKILLS = {
    'Design':      ['Figma','Illustrator','CSS','UX Research','Motion Design'],
    'Engineering': ['Node.js','React','Python','Docker','Kubernetes'],
    'Data':        ['SQL','Spark','Tableau','Airflow','BigQuery'],
    'Management':  ['Agile','OKRs','JIRA','Budget Planning'],
  };
  const sm = document.getElementById('skills-matrix');
  if (sm) Object.entries(SKILLS).forEach(([cat, skills]) => {
    sm.innerHTML += `<div class="mb-3">
      <div style="font-size:.68rem;font-weight:700;color:var(--nw-text-3);text-transform:uppercase;letter-spacing:.09em;margin-bottom:6px">${cat}</div>
      <div>${skills.map(s => `<span style="display:inline-flex;align-items:center;margin:2px;padding:3px 10px;border-radius:7px;font-size:.72rem;font-weight:500;background:var(--nw-hover);color:var(--nw-text-2)"><i class="fa-solid fa-tag fa-xs me-1" style="opacity:.5"></i>${s}</span>`).join('')}</div>
    </div>`;
  });
});
