
/* ── Dashboard Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
  const tasks = [
    { name:'Redesign onboarding flow', proj:'Apex Redesign',  status:'prog',    avs:[{i:'SC',bg:'#7c6ff7'},{i:'TP',bg:'#1fd689'}], pct:65,  eta:'Apr 18', pri:'High'  },
    { name:'API rate limit audit',     proj:'Mobile App v3', status:'review',  avs:[{i:'AR',bg:'#1fd689'}],                        pct:90,  eta:'Apr 15', pri:'Medium'},
    { name:'Q2 budget presentation',   proj:'Executive',     status:'blocked', avs:[{i:'MJ',bg:'#f5a623'},{i:'DL',bg:'#f04e6e'}], pct:35,  eta:'Apr 12', pri:'High', late:true},
    { name:'Update brand guidelines',  proj:'Brand Refresh', status:'done',    avs:[{i:'PN',bg:'#7c6ff7'}],                        pct:100, eta:'Apr 10', pri:'Low'   },
    { name:'ETL pipeline optimisation',proj:'Data Pipeline', status:'prog',    avs:[{i:'JW',bg:'#00dcd2'},{i:'SK',bg:'#f5a623'}], pct:50,  eta:'Apr 25', pri:'Medium'},
    { name:'Mobile push notifications',proj:'Mobile App v3', status:'todo',    avs:[{i:'AR',bg:'#1fd689'}],                        pct:10,  eta:'Apr 28', pri:'Low'   },
  ];

  const tbody = document.getElementById('task-tbody');
  if (tbody) tasks.forEach(t => {
    const pc = NW.progressColor(t.status);
    tbody.innerHTML += `<tr>
      <td><div style="font-weight:500">${t.name}</div><div style="font-size:.72rem;color:var(--nw-text-3)">${t.proj}</div></td>
      <td>${NW.pill(t.status)}</td>
      <td>${NW.avatarStack(t.avs)}</td>
      <td style="min-width:120px">${NW.progress(t.pct, pc)}</td>
      <td><span style="font-size:.82rem;${t.late ? 'color:var(--nw-rose);font-weight:600' : 'color:var(--nw-text-2)'}">${t.eta}${t.late ? ' <i class="fa-solid fa-triangle-exclamation fa-xs"></i>' : ''}</span></td>
      <td>${NW.priority(t.pri)}</td>
    </tr>`;
  });

  const msgs = [
    { av:'MJ', bg:'#f5a623,#f04e6e', name:'Mia Johnson',   role:'exec',   preview:"Q2 numbers look off — can we jump on a call?",     time:'10:24 AM', unread:true  },
    { av:'AC', bg:'#00dcd2,#0099ff', name:'Apex Corp',      role:'client', preview:'Mockups approved! Moving to dev phase 🎉',          time:'9:01 AM',  unread:true  },
    { av:'TP', bg:'#1fd689,#0099ff', name:'Tom Park',       role:'dev',    preview:'Deployed staging env. All tests passing ✅',        time:'Yesterday',unread:false },
    { av:'PN', bg:'#7c6ff7,#f04e6e', name:'Priya Nair',     role:'dev',    preview:'Brand guidelines v3 uploaded and ready for review', time:'Mon',      unread:false },
  ];
  const ml = document.getElementById('msg-list');
  if (ml) msgs.forEach(m => {
    ml.innerHTML += `<a href="messages.html" class="nw-msg-row ${m.unread ? 'unread' : ''}">
      <div class="nw-av" style="width:34px;height:34px;font-size:12px;background:linear-gradient(135deg,${m.bg})">${m.av}</div>
      <div class="flex-fill" style="min-width:0">
        <div class="d-flex justify-content-between align-items-baseline mb-1">
          <span class="nw-msg-sender">${m.name} ${NW.role(m.role)}</span>
          <span class="nw-msg-time">${m.time}</span>
        </div>
        <div class="nw-msg-preview">${m.preview}</div>
      </div>
    </a>`;
  });

  const acts = [
    { dot:'var(--nw-cyan)',   fa:'fa-circle-check',        msg:'<strong>Tom Park</strong> completed task <strong>Staging Deploy</strong>',                                   time:'2 min ago'  },
    { dot:'var(--nw-amber)',  fa:'fa-arrow-up-from-bracket',msg:'<strong>Priya Nair</strong> uploaded <strong>brand-v3.pdf</strong> to Files',                                time:'18 min ago' },
    { dot:'var(--nw-rose)',   fa:'fa-ban',                  msg:'Task <strong>Q2 Budget Deck</strong> status changed to <span class="nw-pill nw-pill-blocked" style="font-size:.65rem">Blocked</span>', time:'1 hr ago' },
    { dot:'var(--nw-violet)', fa:'fa-user-plus',            msg:'<strong>Alex Rivera</strong> joined project <strong>Mobile App v3</strong>',                                 time:'3 hrs ago'  },
    { dot:'var(--nw-green)',  fa:'fa-comment',              msg:'<strong>Jin Wu</strong> commented on <strong>ETL Pipeline</strong>',                                         time:'5 hrs ago'  },
  ];
  const al = document.getElementById('activity-list');
  if (al) acts.forEach(a => {
    al.innerHTML += `<div class="nw-activity-item">
      <div style="width:22px;height:22px;border-radius:50%;border:1.5px solid ${a.dot};display:grid;place-items:center;flex-shrink:0;margin-top:2px">
        <i class="fa-solid ${a.fa} fa-xs" style="color:${a.dot}"></i>
      </div>
      <div><div class="nw-activity-msg">${a.msg}</div><div class="nw-activity-time">${a.time}</div></div>
    </div>`;
  });

  const sb = document.getElementById('sprint-body');
  if (sb) {
    sb.innerHTML = `
      <div class="d-flex justify-content-between text-center mb-3">
        ${[['64%','Sprint','text-nw-cyan'],['32','Done','text-nw-green'],['18','Remaining','text-nw-amber'],['3','Blocked','text-nw-rose']].map(([v,l,c]) =>
          `<div><div class="font-head fw-bold fs-4 ${c}">${v}</div><div style="font-size:.72rem;color:var(--nw-text-3)">${l}</div></div>`).join('')}
      </div>
      <div class="nw-progress mb-3" style="height:8px">
        <div class="nw-progress-bar" style="width:64%;background:linear-gradient(90deg,var(--nw-cyan),var(--nw-violet))"></div>
      </div>
      ${[['Design',85,'var(--nw-violet)'],['Development',58,'var(--nw-cyan)'],['QA & Testing',42,'var(--nw-amber)']].map(([n,p,c]) =>
        `<div class="mb-2"><div class="d-flex justify-content-between mb-1" style="font-size:.78rem"><span>${n}</span><span class="text-nw-2">${p}%</span></div>
        <div class="nw-progress"><div class="nw-progress-bar" style="width:${p}%;background:${c}"></div></div></div>`).join('')}`;
  }

  const dls = [
    { color:'var(--nw-rose)',   icon:'fa-circle-exclamation', name:'API Rate Limit Audit',   who:'Alex Rivera', date:'Apr 15', late:true  },
    { color:'var(--nw-cyan)',   icon:'fa-circle-dot',         name:'Onboarding Redesign',    who:'Sarah Chen',  date:'Apr 18', late:false },
    { color:'var(--nw-violet)', icon:'fa-circle-dot',         name:'Mobile App Beta',        who:'Tom Park',    date:'Apr 20', late:false },
    { color:'var(--nw-amber)',  icon:'fa-circle-dot',         name:'ETL Pipeline v2',        who:'Jin Wu',      date:'Apr 25', late:false },
    { color:'var(--nw-green)',  icon:'fa-circle-dot',         name:'Brand Refresh Handoff',  who:'Priya Nair',  date:'Apr 30', late:false },
  ];
  const dl = document.getElementById('deadlines-list');
  if (dl) dls.forEach(d => {
    dl.innerHTML += `<div class="nw-event-row">
      <div class="nw-event-bar" style="background:${d.color}"></div>
      <div class="flex-fill">
        <div style="font-size:.84rem;font-weight:500;${d.late ? 'color:var(--nw-rose)' : ''}">${d.name}${d.late ? ' <i class="fa-solid fa-triangle-exclamation fa-xs"></i>' : ''}</div>
        <div style="font-size:.72rem;color:var(--nw-text-3)">${d.date} &middot; ${d.who}</div>
      </div>
      <span style="font-size:.7rem;padding:3px 9px;border-radius:6px;background:${d.late ? 'rgba(240,78,110,.1)' : 'var(--nw-hover)'};color:${d.late ? 'var(--nw-rose)' : 'var(--nw-text-2)'}">
        <i class="fa-solid ${d.late ? 'fa-exclamation' : 'fa-clock'} fa-xs me-1"></i>${d.late ? 'Overdue' : 'Upcoming'}
      </span>
    </div>`;
  });
});
