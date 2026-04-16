
/* ── Tasks Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
  const PROJECTS = [
    { id:'all',  label:'<i class="fa-solid fa-layer-group me-1"></i>All Projects', color:'var(--nw-cyan)' },
    { id:'apex', label:'<i class="fa-solid fa-circle fa-xs me-1" style="color:#00dcd2"></i>Apex Redesign' },
    { id:'mob',  label:'<i class="fa-solid fa-circle fa-xs me-1" style="color:#7c6ff7"></i>Mobile App v3' },
    { id:'data', label:'<i class="fa-solid fa-circle fa-xs me-1" style="color:#f5a623"></i>Data Pipeline'  },
    { id:'cp',   label:'<i class="fa-solid fa-circle fa-xs me-1" style="color:#1fd689"></i>Client Portal'  },
    { id:'br',   label:'<i class="fa-solid fa-circle fa-xs me-1" style="color:#f04e6e"></i>Brand Refresh'  },
  ];

  const pf = document.getElementById('proj-filters');
  if (pf) PROJECTS.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm ' + (i === 0 ? 'btn-nw-primary' : 'btn-nw-ghost');
    btn.innerHTML = p.label;
    btn.addEventListener('click', () => {
      pf.querySelectorAll('button').forEach(b => {
        b.classList.remove('btn-nw-primary');
        b.classList.add('btn-nw-ghost');
        b.style.borderColor = '';
      });
      btn.classList.remove('btn-nw-ghost');
      btn.classList.add('btn-nw-primary');
    });
    pf.appendChild(btn);
  });

  const COLS = [
    { id:'todo',    label:'To Do',       color:'var(--nw-violet)', icon:'fa-circle-dashed',
      cards:[
        { title:'Set up CI/CD pipeline',    proj:'Mobile App',   tag:'DevOps',  pri:'Low',  eta:'Apr 28', avs:[{i:'AR',bg:'#1fd689'}],                        pct:0  },
        { title:'Write unit tests — auth',  proj:'Mobile App',   tag:'Backend', pri:'Medium',eta:'Apr 26',avs:[{i:'JW',bg:'#00dcd2'}],                        pct:0  },
        { title:'Client portal wireframes', proj:'Client Portal',tag:'Design',  pri:'High', eta:'Apr 22', avs:[{i:'PN',bg:'#7c6ff7'}],                        pct:0  },
        { title:'Data schema migration',    proj:'Data Pipeline',tag:'Database',pri:'Medium',eta:'Apr 30',avs:[{i:'SK',bg:'#f5a623'},{i:'JW',bg:'#00dcd2'}],  pct:0  },
    ]},
    { id:'prog',    label:'In Progress',  color:'var(--nw-cyan)',   icon:'fa-rotate',
      cards:[
        { title:'Redesign onboarding flow', proj:'Apex Redesign', tag:'Design',  pri:'High',  eta:'Apr 18', avs:[{i:'SC',bg:'#7c6ff7'},{i:'TP',bg:'#1fd689'}], pct:65 },
        { title:'ETL pipeline optimisation',proj:'Data Pipeline', tag:'Backend', pri:'Medium',eta:'Apr 25', avs:[{i:'JW',bg:'#00dcd2'},{i:'SK',bg:'#f5a623'}], pct:50 },
        { title:'Push notification service',proj:'Mobile App',    tag:'Mobile',  pri:'Medium',eta:'Apr 22', avs:[{i:'AR',bg:'#1fd689'}],                        pct:30 },
    ]},
    { id:'review',  label:'In Review',    color:'var(--nw-amber)',  icon:'fa-magnifying-glass',
      cards:[
        { title:'API rate limit audit',     proj:'Mobile App',    tag:'Backend', pri:'Medium',eta:'Apr 15', avs:[{i:'AR',bg:'#1fd689'}],                        pct:90 },
        { title:'Homepage hero section',    proj:'Apex Redesign', tag:'Design',  pri:'High',  eta:'Apr 16', avs:[{i:'PN',bg:'#7c6ff7'},{i:'SC',bg:'#7c6ff7'}],  pct:95 },
        { title:'Authentication flow',      proj:'Client Portal', tag:'Dev',     pri:'High',  eta:'Apr 17', avs:[{i:'TP',bg:'#1fd689'}],                        pct:80 },
    ]},
    { id:'blocked', label:'Blocked',       color:'var(--nw-rose)',   icon:'fa-ban',
      cards:[
        { title:'Q2 budget presentation',   proj:'Executive',     tag:'Finance', pri:'High',  eta:'Apr 12', avs:[{i:'MJ',bg:'#f5a623'},{i:'DL',bg:'#f04e6e'}], pct:35, late:true },
        { title:'Payment gateway integration',proj:'Client Portal',tag:'Dev',   pri:'High',  eta:'Apr 14', avs:[{i:'AR',bg:'#1fd689'}],                        pct:20, late:true },
    ]},
    { id:'done',    label:'Done',          color:'var(--nw-green)',  icon:'fa-circle-check',
      cards:[
        { title:'Update brand guidelines',  proj:'Brand Refresh', tag:'Design',  pri:'Low',   eta:'Apr 10', avs:[{i:'PN',bg:'#7c6ff7'}],                        pct:100 },
        { title:'Staging environment deploy',proj:'Mobile App',   tag:'DevOps',  pri:'Medium',eta:'Apr 11', avs:[{i:'TP',bg:'#1fd689'}],                        pct:100 },
        { title:'Logo & typography refresh',proj:'Brand Refresh', tag:'Design',  pri:'Medium',eta:'Apr 9',  avs:[{i:'PN',bg:'#7c6ff7'},{i:'SC',bg:'#7c6ff7'}],  pct:100 },
    ]},
  ];

  const board = document.getElementById('kanban-board');
  if (!board) return;

  const priBg  = { High:'rgba(240,78,110,.1)',Medium:'rgba(245,166,35,.1)',Low:'rgba(31,214,137,.1)' };
  const priClr = { High:'var(--nw-rose)',    Medium:'var(--nw-amber)',    Low:'var(--nw-green)'  };
  const pcMap  = { review:'var(--nw-amber)', blocked:'var(--nw-rose)',    done:'var(--nw-green)' };
  const getPC  = s => pcMap[s] || 'var(--nw-cyan)';

  COLS.forEach(col => {
    const cards = col.cards.map(c => {
      const progHtml = c.pct > 0
        ? `<div class="nw-progress mb-2" style="height:3px"><div class="nw-progress-bar" style="width:${c.pct}%;background:${getPC(col.id)}"></div></div>`
        : '';
      const lateTag = c.late
        ? `<span style="font-size:.62rem;color:var(--nw-rose);font-weight:600"><i class="fa-solid fa-triangle-exclamation fa-xs me-1"></i>Overdue</span>`
        : `<span style="font-size:.7rem;color:var(--nw-text-3)"><i class="fa-regular fa-clock fa-xs me-1"></i>${c.eta}</span>`;
      return `<div class="nw-board-card${col.id === 'blocked' ? '" style="border-color:rgba(240,78,110,.25)' : ''}">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span style="font-size:.65rem;background:var(--nw-hover);padding:2px 8px;border-radius:5px;color:var(--nw-text-2)">${c.tag}</span>
          <span style="font-size:.65rem;font-weight:600;padding:2px 8px;border-radius:6px;background:${priBg[c.pri]};color:${priClr[c.pri]}">${c.pri}</span>
        </div>
        <div class="nw-board-card-title mb-2">${c.title}</div>
        ${progHtml}
        <div style="font-size:.7rem;color:var(--nw-text-3);margin-bottom:8px"><i class="fa-solid fa-circle fa-xs me-1" style="opacity:.4"></i>${c.proj}</div>
        <div class="d-flex justify-content-between align-items-center">
          ${lateTag}
          ${NW.avatarStack(c.avs, 20)}
        </div>
      </div>`;
    }).join('');

    board.innerHTML += `<div class="nw-board-col" style="border-top:2px solid ${col.color}">
      <div class="nw-board-col-head">
        <span class="nw-board-col-label" style="color:${col.color}">
          <i class="fa-solid ${col.icon} fa-xs me-1"></i>${col.label}
        </span>
        <span style="font-size:.7rem;background:var(--nw-hover);padding:2px 8px;border-radius:10px;color:var(--nw-text-3)">${col.cards.length}</span>
      </div>
      <div class="nw-board-cards">${cards}</div>
      <button class="nw-add-card"><i class="fa-solid fa-plus me-1"></i>Add task</button>
    </div>`;
  });
});
