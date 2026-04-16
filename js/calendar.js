
/* ── Calendar Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
  const EVENTS = {
    10: [{ title:'Brand Refresh Done',  color:'#1fd689', bg:'rgba(31,214,137,.12)'  }],
    14: [{ title:'Sprint Planning',     color:'#00dcd2', bg:'rgba(0,220,210,.12)'   }],
    15: [{ title:'Apex Client Review',  color:'#f5a623', bg:'rgba(245,166,35,.12)'  },
         { title:'Design Sync',         color:'#7c6ff7', bg:'rgba(124,111,247,.12)' }],
    16: [{ title:'API Audit Due',       color:'#f04e6e', bg:'rgba(240,78,110,.12)'  }],
    17: [{ title:'Board Meeting Prep',  color:'#f5a623', bg:'rgba(245,166,35,.12)'  }],
    18: [{ title:'Onboarding Redesign', color:'#00dcd2', bg:'rgba(0,220,210,.12)'   }],
    21: [{ title:'Sprint 22 Ends',      color:'#7c6ff7', bg:'rgba(124,111,247,.12)' }],
    22: [{ title:'Sprint 23 Kickoff',   color:'#1fd689', bg:'rgba(31,214,137,.12)'  }],
    25: [{ title:'ETL Pipeline v2',     color:'#f5a623', bg:'rgba(245,166,35,.12)'  }],
    28: [{ title:'Mobile Push Notif.',  color:'#7c6ff7', bg:'rgba(124,111,247,.12)' }],
    30: [{ title:'Brand Handoff',       color:'#1fd689', bg:'rgba(31,214,137,.12)'  }],
  };

  /* Weekday headers */
  const wd = document.getElementById('cal-weekdays');
  if (wd) ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    wd.innerHTML += `<div class="nw-cal-weekday">${d}</div>`;
  });

  /* Calendar grid - April 2025 starts on Tuesday (offset=2) */
  const cg = document.getElementById('cal-grid');
  if (cg) {
    const offset = 2, days = 30;
    for (let i = 0; i < offset; i++)
      cg.innerHTML += `<div class="nw-cal-cell nw-other-month"><div class="nw-cal-num" style="color:var(--nw-text-3)">${28 + i}</div></div>`;
    for (let d = 1; d <= days; d++) {
      const isToday = d === 15;
      const evs = (EVENTS[d] || []).slice(0, 2).map(e =>
        `<div class="nw-cal-event" style="background:${e.bg};color:${e.color}">${e.title}</div>`).join('');
      const more = (EVENTS[d] || []).length > 2
        ? `<div style="font-size:.58rem;color:var(--nw-text-3)">+${(EVENTS[d] || []).length - 2} more</div>` : '';
      cg.innerHTML += `<div class="nw-cal-cell${isToday ? ' nw-today' : ''}">
        <div class="nw-cal-num">${d}</div>${evs}${more}
      </div>`;
    }
    const remaining = 7 - ((offset + days) % 7);
    if (remaining < 7)
      for (let i = 1; i <= remaining; i++)
        cg.innerHTML += `<div class="nw-cal-cell nw-other-month"><div class="nw-cal-num" style="color:var(--nw-text-3)">${i}</div></div>`;
  }

  /* Week strip */
  const ws = document.getElementById('week-strip');
  const WEEK = [
    { d:'Mon', n:14, evs:1 }, { d:'Tue', n:15, evs:2, today:true }, { d:'Wed', n:16, evs:1 },
    { d:'Thu', n:17, evs:1 }, { d:'Fri', n:18, evs:1 }, { d:'Sat', n:19, evs:0 }, { d:'Sun', n:20, evs:0 },
  ];
  if (ws) WEEK.forEach(w => {
    ws.innerHTML += `<div class="nw-week-day${w.today ? ' nw-today' : ''}">
      <div style="font-size:.62rem;color:${w.today ? 'var(--nw-cyan)' : 'var(--nw-text-3)'};text-transform:uppercase;letter-spacing:.06em">${w.d}</div>
      <div class="font-head fw-bold fs-5 my-1" style="color:${w.today ? 'var(--nw-cyan)' : 'var(--nw-text-1)'}">${w.n}</div>
      ${w.evs ? `<div style="width:5px;height:5px;border-radius:50%;background:var(--nw-cyan);margin:0 auto"></div><div style="font-size:.55rem;color:var(--nw-text-3);margin-top:2px">${w.evs} event${w.evs > 1 ? 's' : ''}</div>` : ''}
    </div>`;
  });

  /* Today events */
  const TODAY_EVTS = [
    { color:'var(--nw-cyan)',   icon:'fa-video',       title:'Sprint Planning — Mobile App',  time:'10:00 – 11:30 AM', where:'Google Meet', type:'Meeting' },
    { color:'var(--nw-amber)',  icon:'fa-users',       title:'Client Review — Apex Corp',     time:'2:00 – 3:00 PM',  where:'Zoom',        type:'Client'  },
    { color:'var(--nw-violet)', icon:'fa-palette',     title:'Design Sync with Priya',        time:'4:30 – 5:00 PM',  where:'Internal',    type:'Team'    },
  ];
  const te = document.getElementById('today-events');
  if (te) TODAY_EVTS.forEach(e => {
    te.innerHTML += `<div class="nw-event-row">
      <div class="nw-event-bar" style="background:${e.color}"></div>
      <div class="flex-fill">
        <div style="font-size:.84rem;font-weight:500">${e.title}</div>
        <div style="font-size:.72rem;color:var(--nw-text-3)"><i class="fa-regular fa-clock fa-xs me-1"></i>${e.time} &middot; <i class="fa-solid fa-location-dot fa-xs me-1"></i>${e.where}</div>
      </div>
      <span style="font-size:.62rem;padding:2px 8px;border-radius:6px;background:var(--nw-hover);color:var(--nw-text-2)">${e.type}</span>
    </div>`;
  });

  /* Deadlines */
  const DLS = [
    { color:'var(--nw-rose)',   title:'API Rate Limit Audit',  person:'Alex Rivera', date:'Apr 15', late:true  },
    { color:'var(--nw-cyan)',   title:'Onboarding Redesign',   person:'Sarah Chen',  date:'Apr 18', late:false },
    { color:'var(--nw-violet)', title:'Mobile App Beta',       person:'Tom Park',    date:'Apr 20', late:false },
    { color:'var(--nw-amber)',  title:'ETL Pipeline v2',       person:'Jin Wu',      date:'Apr 25', late:false },
  ];
  const dc = document.getElementById('deadlines-cal');
  if (dc) DLS.forEach(d => {
    dc.innerHTML += `<div class="nw-event-row">
      <div class="nw-event-bar" style="background:${d.color}"></div>
      <div class="flex-fill">
        <div style="font-size:.84rem;font-weight:500;${d.late ? 'color:var(--nw-rose)' : ''}">${d.title}${d.late ? ' <i class="fa-solid fa-triangle-exclamation fa-xs"></i>' : ''}</div>
        <div style="font-size:.72rem;color:var(--nw-text-3)"><i class="fa-regular fa-calendar fa-xs me-1"></i>${d.date} &middot; ${d.person}</div>
      </div>
      <span style="font-size:.62rem;padding:2px 8px;border-radius:6px;background:${d.late?'rgba(240,78,110,.1)':'var(--nw-hover)'};color:${d.late?'var(--nw-rose)':'var(--nw-text-2)'}">
        <i class="fa-solid ${d.late ? 'fa-exclamation' : 'fa-clock'} fa-xs me-1"></i>${d.late ? 'Overdue' : 'Due soon'}
      </span>
    </div>`;
  });

  /* Team today */
  const TEAM_TODAY = [
    { av:'SC', bg:'#7c6ff7,#00dcd2', name:'Sarah Chen',  status:'online', note:'In client review 2–3PM'  },
    { av:'AR', bg:'#1fd689,#0099ff', name:'Alex Rivera', status:'online', note:'Focused work mode'       },
    { av:'MJ', bg:'#f5a623,#f04e6e', name:'Mia Johnson', status:'online', note:'Board meeting prep'      },
    { av:'JW', bg:'#00dcd2,#0099ff', name:'Jin Wu',      status:'away',   note:'Back at 2:30 PM'         },
    { av:'TP', bg:'#1fd689,#7c6ff7', name:'Tom Park',    status:'online', note:'Available'               },
    { av:'PN', bg:'#7c6ff7,#f04e6e', name:'Priya Nair',  status:'offline',note:'OOO today'              },
  ];
  const sdm = { online:'nw-online', away:'nw-away', offline:'nw-offline' };
  const tt = document.getElementById('team-today');
  if (tt) TEAM_TODAY.forEach(m => {
    tt.innerHTML += `<div style="display:flex;align-items:center;gap:.625rem;padding:.55rem 1rem;border-bottom:1px solid var(--nw-border)">
      <span class="nw-status-dot ${sdm[m.status]}"></span>
      <div class="nw-av" style="width:28px;height:28px;font-size:10px;background:linear-gradient(135deg,${m.bg})">${m.av}</div>
      <div class="flex-fill" style="min-width:0">
        <div style="font-size:.82rem;font-weight:500">${m.name}</div>
        <div style="font-size:.68rem;color:var(--nw-text-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${m.note}</div>
      </div>
    </div>`;
  });
});
