
/* ── Clients Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
  const CLIENTS = [
    { logo:'fa-building-columns', name:'Apex Corporation',   contact:'Rebecca Liu',  role:'Product Owner',  email:'r.liu@apex.co',        color:'var(--nw-cyan)',   logoBg:'rgba(0,220,210,.1)',   status:'Active',      statusColor:'var(--nw-green)', projects:3, tasks:12, docs:8,  msgs:2, health:88, tags:['Design','Development','QA'],    since:'Jan 2025' },
    { logo:'fa-lightbulb',        name:'NovaTech Solutions',  contact:'James Okafor', role:'CTO',            email:'j.okafor@novatech.io', color:'var(--nw-violet)', logoBg:'rgba(124,111,247,.1)', status:'Onboarding',  statusColor:'var(--nw-amber)', projects:1, tasks:4,  docs:3,  msgs:5, health:72, tags:['Development'],              since:'Mar 2025' },
    { logo:'fa-landmark',         name:'FinBridge Capital',   contact:'Ananya Mehta', role:'VP Operations',  email:'a.mehta@finbridge.com',color:'var(--nw-amber)',  logoBg:'rgba(245,166,35,.1)', status:'Active',      statusColor:'var(--nw-green)', projects:2, tasks:7,  docs:12, msgs:1, health:95, tags:['Consulting','Data'],         since:'Nov 2024' },
    { logo:'fa-cart-shopping',    name:'RetailFlow Inc.',     contact:'Chris Tan',    role:'CEO',            email:'c.tan@retailflow.com', color:'var(--nw-rose)',   logoBg:'rgba(240,78,110,.1)', status:'Review',      statusColor:'var(--nw-amber)', projects:1, tasks:9,  docs:5,  msgs:0, health:61, tags:['UX','Backend'],             since:'Feb 2025' },
  ];

  const cc = document.getElementById('client-cards');
  if (cc) CLIENTS.forEach(c => {
    const hc = c.health > 80 ? 'var(--nw-green)' : c.health > 65 ? 'var(--nw-cyan)' : 'var(--nw-rose)';
    const statusBg = c.statusColor === 'var(--nw-green)' ? 'rgba(31,214,137,.1)' : 'rgba(245,166,35,.1)';
    const tags = c.tags.map(t => `<span style="font-size:.68rem;background:var(--nw-hover);padding:2px 8px;border-radius:5px;color:var(--nw-text-2)">${t}</span>`).join(' ');
    cc.innerHTML += `<div class="col-12 col-md-6 col-xl-3">
      <div class="nw-client-card" style="border-top:3px solid ${c.color}">
        <div class="d-flex align-items-start gap-3 mb-3">
          <div class="nw-client-logo" style="background:${c.logoBg}"><i class="fa-solid ${c.logo}" style="color:${c.color};font-size:1.35rem"></i></div>
          <div class="flex-fill">
            <div class="font-head fw-bold" style="font-size:.98rem">${c.name}</div>
            <div style="font-size:.78rem;color:var(--nw-text-2)">${c.contact} &middot; ${c.role}</div>
            <div style="font-size:.7rem;color:var(--nw-text-3)"><i class="fa-regular fa-envelope fa-xs me-1"></i>${c.email}</div>
          </div>
          <div class="text-end">
            <div style="font-size:.68rem;font-weight:700;padding:4px 10px;border-radius:8px;background:${statusBg};color:${c.statusColor};white-space:nowrap">${c.status}</div>
            <div style="font-size:.63rem;color:var(--nw-text-3);margin-top:3px">Since ${c.since}</div>
          </div>
        </div>
        <div class="row g-2 mb-3">
          ${[['fa-briefcase',c.color,c.projects,'Projects'],['fa-list-check','var(--nw-amber)',c.tasks,'Open Tasks'],['fa-file','var(--nw-violet)',c.docs,'Documents'],['fa-envelope-open',c.msgs>0?'var(--nw-rose)':'var(--nw-text-3)',c.msgs,'Unread']].map(([icon,clr,val,lbl]) =>
            `<div class="col-3"><div style="background:var(--nw-hover);border-radius:8px;padding:8px;text-align:center">
              <div class="font-head fw-bold" style="color:${clr}">${val}</div>
              <div style="font-size:.58rem;color:var(--nw-text-3)">${lbl}</div>
            </div></div>`).join('')}
        </div>
        <div class="mb-3">
          <div class="d-flex justify-content-between mb-1" style="font-size:.75rem">
            <span><i class="fa-solid fa-heart-pulse fa-xs me-1"></i>Health Score</span>
            <span style="color:${hc};font-weight:600">${c.health}%</span>
          </div>
          <div class="nw-progress"><div class="nw-progress-bar" style="width:${c.health}%;background:${hc}"></div></div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex gap-1 flex-wrap">${tags}</div>
          <div class="d-flex gap-1">
            <button class="btn btn-nw-ghost btn-sm" style="font-size:.7rem"><i class="fa-solid fa-comments fa-xs me-1"></i>Chat</button>
            <button class="btn btn-nw-primary btn-sm" style="font-size:.7rem">Portal <i class="fa-solid fa-arrow-right fa-xs ms-1"></i></button>
          </div>
        </div>
      </div>
    </div>`;
  });

  const PROJ_ROWS = [
    { client:'Apex Corp',  project:'Website Redesign',       pm:'Sarah Chen', status:'prog',    pct:65,  eta:'Apr 18', budget:'$42K' },
    { client:'Apex Corp',  project:'SEO Optimization',       pm:'Tom Park',   status:'review',  pct:85,  eta:'Apr 20', budget:'$12K' },
    { client:'Apex Corp',  project:'Mobile App Phase 1',     pm:'Alex Rivera',status:'todo',    pct:15,  eta:'May 10', budget:'$78K' },
    { client:'NovaTech',   project:'API Integration',        pm:'Jin Wu',     status:'prog',    pct:40,  eta:'Apr 28', budget:'$25K' },
    { client:'FinBridge',  project:'Data Dashboard',         pm:'Jin Wu',     status:'done',    pct:100, eta:'Apr 8',  budget:'$55K' },
    { client:'FinBridge',  project:'Compliance Module',      pm:'Sarah Chen', status:'prog',    pct:55,  eta:'May 5',  budget:'$38K' },
    { client:'RetailFlow', project:'E-Commerce Platform',    pm:'Dev Lee',    status:'blocked', pct:30,  eta:'Apr 14', budget:'$90K' },
  ];
  const pt = document.getElementById('proj-tbody');
  if (pt) PROJ_ROWS.forEach(r => {
    const pc = NW.progressColor(r.status);
    pt.innerHTML += `<tr>
      <td><span style="font-size:.82rem;font-weight:500">${r.client}</span></td>
      <td><span style="font-size:.875rem;font-weight:500">${r.project}</span></td>
      <td><span style="font-size:.82rem;color:var(--nw-text-2)">${r.pm}</span></td>
      <td>${NW.pill(r.status)}</td>
      <td style="min-width:120px">${NW.progress(r.pct, pc)}</td>
      <td><span style="font-size:.82rem;color:var(--nw-text-2)">${r.eta}</span></td>
      <td><span style="font-size:.82rem;font-weight:600;color:var(--nw-green)">${r.budget}</span></td>
    </tr>`;
  });
});
