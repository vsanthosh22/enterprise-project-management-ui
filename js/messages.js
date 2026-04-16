
/* ── Messages Page JS ── */
document.addEventListener('DOMContentLoaded', () => {
  const CONVS = [
    { av:'MJ', bg:'#f5a623,#f04e6e', name:'Mia Johnson',     role:'exec',   preview:"Q2 numbers look off — can we jump on a call?",    time:'10:24 AM', unread:2, active:true  },
    { av:'AC', bg:'#00dcd2,#0099ff', name:'Apex Corp',         role:'client', preview:'Mockups approved! Moving to dev phase 🎉',         time:'9:01 AM',  unread:1, active:false },
    { av:'TP', bg:'#1fd689,#0099ff', name:'Tom Park',          role:'dev',    preview:'Deployed staging env. All tests passing ✅',       time:'Yesterday',unread:0, active:false },
    { av:'PN', bg:'#7c6ff7,#f04e6e', name:'Priya Nair',        role:'dev',    preview:'Brand guidelines v3 ready for review',            time:'Mon',      unread:0, active:false },
    { av:'📣', bg:'#1fd689,#0099ff', name:'#general',          role:null,     preview:'Sarah Chen posted standup notes',                  time:'Mon',      unread:1, active:false },
    { av:'JW', bg:'#00dcd2,#7c6ff7', name:'Jin Wu',            role:'dev',    preview:'ETL job finished — logs attached',                 time:'Sun',      unread:0, active:false },
    { av:'FB', bg:'#f5a623,#1fd689', name:'FinBridge Capital',  role:'client', preview:'Please share the updated timeline',               time:'Sat',      unread:0, active:false },
  ];

  const cl = document.getElementById('conv-list');
  if (cl) CONVS.forEach(c => {
    const badge = c.unread
      ? `<div style="min-width:18px;height:18px;border-radius:9px;background:var(--nw-cyan);color:#0a0d17;font-size:.6rem;font-weight:700;display:grid;place-items:center;padding:0 4px;margin-left:auto">${c.unread}</div>`
      : '';
    const role = c.role ? NW.role(c.role) : '';
    cl.innerHTML += `<div class="nw-msg-row ${c.unread ? 'unread' : ''}${c.active ? '" style="background:rgba(0,220,210,.05)' : ''}">
      <div class="nw-av" style="width:36px;height:36px;font-size:12px;background:linear-gradient(135deg,${c.bg})">${c.av}</div>
      <div class="flex-fill" style="min-width:0">
        <div class="d-flex justify-content-between align-items-baseline mb-1">
          <span class="nw-msg-sender">${c.name} ${role}</span>
          <span class="nw-msg-time">${c.time}</span>
        </div>
        <div class="nw-msg-preview">${c.preview}</div>
      </div>
      ${badge}
    </div>`;
  });

  const MSGS = [
    { me:false, name:'Mia Johnson', text:"Hey Sarah, the Q2 numbers in the deck look off — the revenue figures don't match what Finance sent over last Tuesday.", time:'10:18 AM' },
    { me:true,  text:"You're right. It's a mix-up between April actuals and the revised forecast. Let me pull the latest sheet from the Finance drive.", time:'10:20 AM' },
    { me:false, name:'Mia Johnson', text:"The board meeting is Thursday at 9 AM. We need the corrected presentation by Wednesday EOD. Can we meet tomorrow at 2 PM?", time:'10:22 AM' },
    { me:true,  text:"Confirmed for 2 PM. I'll prep the corrected slides and share them here beforehand. ✅", time:'10:23 AM' },
    { me:false, name:'Mia Johnson', text:"Q2 numbers look off — can we jump on a call?", time:'10:24 AM' },
  ];

  const cm = document.getElementById('chat-msgs');
  if (cm) {
    MSGS.forEach(m => {
      if (m.me) {
        cm.innerHTML += `<div class="d-flex justify-content-end">
          <div>
            <div class="nw-bubble nw-bubble-me">${m.text}</div>
            <div class="text-end mt-1" style="font-size:.65rem;color:var(--nw-text-3)">${m.time} <i class="fa-solid fa-check-double fa-xs ms-1"></i></div>
          </div>
        </div>`;
      } else {
        cm.innerHTML += `<div class="d-flex gap-2">
          <div class="nw-av" style="width:28px;height:28px;font-size:10px;background:linear-gradient(135deg,#f5a623,#f04e6e);flex-shrink:0;margin-top:2px">MJ</div>
          <div>
            <div style="font-size:.67rem;color:var(--nw-text-3);margin-bottom:3px">${m.name}</div>
            <div class="nw-bubble nw-bubble-other">${m.text}</div>
            <div style="font-size:.65rem;color:var(--nw-text-3);margin-top:3px">${m.time}</div>
          </div>
        </div>`;
      }
    });
    cm.scrollTop = cm.scrollHeight;
  }

  function doSend() {
    const inp = document.getElementById('chat-input');
    if (!inp || !inp.value.trim()) return;
    NW.sendChatMessage('chat-msgs', inp.value.trim());
    inp.value = '';
  }
  const sb2 = document.getElementById('send-btn');
  const ci  = document.getElementById('chat-input');
  if (sb2) sb2.addEventListener('click', doSend);
  if (ci)  ci.addEventListener('keydown', e => { if (e.key === 'Enter') doSend(); });
});
