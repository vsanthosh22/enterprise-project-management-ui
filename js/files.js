
/* ── Files Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_STATS = [
    { val:'42', lbl:'Files',   color:'var(--nw-cyan)'   },
    { val:'8',  lbl:'Folders', color:'var(--nw-violet)' },
    { val:'14', lbl:'Shared',  color:'var(--nw-amber)'  },
    { val:'5',  lbl:'Recent',  color:'var(--nw-green)'  },
  ];
  const ss = document.getElementById('storage-stats');
  if (ss) STORAGE_STATS.forEach(s => {
    ss.innerHTML += `<div class="text-center"><div class="font-head fw-bold fs-5" style="color:${s.color}">${s.val}</div><div style="font-size:.68rem;color:var(--nw-text-3)">${s.lbl}</div></div>`;
  });

  const FOLDERS = [
    { icon:'fa-palette',    name:'Design Assets',  files:12, color:'var(--nw-violet)' },
    { icon:'fa-chart-bar',  name:'Reports',         files:8,  color:'var(--nw-amber)'  },
    { icon:'fa-building',   name:'Client Docs',     files:9,  color:'var(--nw-cyan)'   },
    { icon:'fa-code',       name:'Dev Resources',   files:7,  color:'var(--nw-green)'  },
    { icon:'fa-megaphone',  name:'Marketing',       files:6,  color:'var(--nw-rose)'   },
  ];
  const fl = document.getElementById('folder-list');
  if (fl) FOLDERS.forEach(f => {
    fl.innerHTML += `<div class="nw-folder-chip">
      <i class="fa-solid ${f.icon}" style="color:${f.color};font-size:1.1rem"></i>
      <div><div style="font-size:.8rem;font-weight:500">${f.name}</div><div style="font-size:.65rem;color:var(--nw-text-3)">${f.files} files</div></div>
    </div>`;
  });

  const FILES = [
    { icon:'fa-file-excel',    name:'Q2_Report_v4.xlsx',    size:'1.2 MB', date:'Apr 12', type:'Excel',    new:true  },
    { icon:'fa-file-pdf',      name:'brand-v3.pdf',          size:'4.8 MB', date:'Apr 11', type:'PDF',      new:false },
    { icon:'fa-file-word',     name:'Sprint_22_Brief.docx',  size:'0.6 MB', date:'Apr 10', type:'Word',     new:false },
    { icon:'fa-bezier-curve',  name:'mockup_home_v2.fig',    size:'8.1 MB', date:'Apr 8',  type:'Figma',    new:false },
    { icon:'fa-file-code',     name:'API_Spec_v1.md',        size:'0.1 MB', date:'Apr 7',  type:'Markdown', new:false },
    { icon:'fa-file-video',    name:'client_kickoff.mp4',    size:'210 MB', date:'Apr 5',  type:'Video',    new:false },
    { icon:'fa-file-zipper',   name:'assets_bundle.zip',     size:'45 MB',  date:'Apr 3',  type:'Archive',  new:false },
    { icon:'fa-file-audio',    name:'brand_audio.mp3',       size:'8 MB',   date:'Apr 1',  type:'Audio',    new:false },
    { icon:'fa-file-contract', name:'NDA_Apex_Corp.pdf',     size:'0.3 MB', date:'Mar 28', type:'PDF',      lock:true },
    { icon:'fa-file-excel',    name:'Resource_Plan_Q2.xlsx', size:'2.1 MB', date:'Mar 25', type:'Excel',    new:false },
    { icon:'fa-file-image',    name:'hero_banner_v3.png',    size:'3.4 MB', date:'Mar 22', type:'Image',    new:false },
    { icon:'fa-file-word',     name:'Legal_Review.docx',     size:'0.9 MB', date:'Mar 20', type:'Word',     lock:true },
  ];
  const fg = document.getElementById('file-grid');
  if (fg) FILES.forEach(f => {
    const badge = f.new  ? `<span style="position:absolute;top:8px;right:8px;font-size:.6rem;background:rgba(0,220,210,.15);color:var(--nw-cyan);padding:2px 6px;border-radius:5px;font-weight:700">NEW</span>` :
                  f.lock ? `<i class="fa-solid fa-lock" style="position:absolute;top:10px;right:10px;font-size:.7rem;color:var(--nw-amber)"></i>` : '';
    fg.innerHTML += `<div class="nw-file-card" style="position:relative">
      ${badge}
      <div class="nw-file-icon"><i class="fa-solid ${f.icon}" style="color:var(--nw-text-2)"></i></div>
      <div class="nw-file-name">${f.name}</div>
      <div class="nw-file-meta">${f.type} &middot; ${f.size} &middot; ${f.date}</div>
      <div class="d-flex gap-1 mt-2">
        <button class="btn btn-nw-ghost btn-sm" style="font-size:.62rem;padding:3px 8px"><i class="fa-solid fa-download fa-xs me-1"></i>Get</button>
        <button class="btn btn-nw-ghost btn-sm" style="font-size:.62rem;padding:3px 8px"><i class="fa-solid fa-link fa-xs"></i></button>
        <button class="btn btn-nw-ghost btn-sm" style="font-size:.62rem;padding:3px 8px"><i class="fa-solid fa-ellipsis fa-xs"></i></button>
      </div>
    </div>`;
  });

  const ACTS = [
    { icon:'fa-cloud-arrow-up',   color:'var(--nw-cyan)',   msg:'<strong>Priya Nair</strong> uploaded <strong>brand-v3.pdf</strong>',                    time:'18 min ago' },
    { icon:'fa-share-nodes',      color:'var(--nw-violet)', msg:'<strong>Sarah Chen</strong> shared <strong>Q2_Report_v4.xlsx</strong> with Apex Corp',   time:'2 hrs ago'  },
    { icon:'fa-download',         color:'var(--nw-green)',  msg:'<strong>Jin Wu</strong> downloaded <strong>API_Spec_v1.md</strong>',                      time:'Yesterday'  },
    { icon:'fa-pen-to-square',    color:'var(--nw-amber)',  msg:'<strong>Tom Park</strong> edited <strong>Sprint_22_Brief.docx</strong>',                  time:'Yesterday'  },
    { icon:'fa-eye',              color:'var(--nw-blue)',   msg:'<strong>Apex Corp</strong> viewed <strong>mockup_home_v2.fig</strong>',                    time:'2 days ago' },
    { icon:'fa-cloud-arrow-up',   color:'var(--nw-cyan)',   msg:'<strong>Sarah Chen</strong> uploaded <strong>client_kickoff.mp4</strong>',                time:'3 days ago' },
  ];
  const fa2 = document.getElementById('file-activity');
  if (fa2) ACTS.forEach(a => {
    fa2.innerHTML += `<div class="d-flex align-items-center gap-3 py-2 px-3" style="border-bottom:1px solid var(--nw-border)">
      <div style="width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,.15);border:1px solid ${a.color};display:grid;place-items:center;flex-shrink:0">
        <i class="fa-solid ${a.icon} fa-xs" style="color:${a.color}"></i>
      </div>
      <div class="flex-fill" style="font-size:.82rem;color:var(--nw-text-2)">${a.msg}</div>
      <div style="font-size:.7rem;color:var(--nw-text-3);white-space:nowrap">${a.time}</div>
    </div>`;
  });

  /* View toggle */
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  const fgEl    = document.getElementById('file-grid');
  if (gridBtn && listBtn && fgEl) {
    gridBtn.addEventListener('click', () => {
      fgEl.style.gridTemplateColumns = 'repeat(auto-fill,minmax(155px,1fr))';
      gridBtn.style.background = 'var(--nw-cyan-dim)'; gridBtn.style.color = 'var(--nw-cyan)';
      listBtn.style.background = ''; listBtn.style.color = '';
    });
    listBtn.addEventListener('click', () => {
      fgEl.style.gridTemplateColumns = '1fr';
      listBtn.style.background = 'var(--nw-cyan-dim)'; listBtn.style.color = 'var(--nw-cyan)';
      gridBtn.style.background = ''; gridBtn.style.color = '';
    });
  }
});
