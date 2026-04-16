/* ============================================================
   NEXUSWORK — Shared JavaScript
   Theme management, sidebar, nav helpers, utilities
   ============================================================ */

(function () {
  'use strict';

  /* ── THEME MANAGEMENT ─────────────────────────────────── */
  const THEME_KEY = 'nw-theme';
  const html = document.documentElement;

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButtons(theme);
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll('.nw-theme-toggle').forEach(btn => {
      const icon = btn.querySelector('i');
      if (!icon) return;
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
        btn.setAttribute('title', 'Switch to Light Mode');
      } else {
        icon.className = 'fa-solid fa-moon';
        btn.setAttribute('title', 'Switch to Dark Mode');
      }
    });
    /* label in topbar */
    document.querySelectorAll('.nw-theme-label').forEach(el => {
      el.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });
  }

  function toggleTheme() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  /* Apply saved theme immediately (before any render) */
  applyTheme(getTheme());

  /* ── SIDEBAR ACTIVE NAV ───────────────────────────────── */
  function setActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nw-nav-link[data-page]').forEach(link => {
      const page = link.getAttribute('data-page');
      if (page === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ── TAB HELPERS ──────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.nw-tab-bar').forEach(bar => {
      bar.querySelectorAll('.nw-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          bar.querySelectorAll('.nw-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          /* optional: trigger custom event for page scripts */
          tab.dispatchEvent(new CustomEvent('nw-tab-change', { bubbles: true }));
        });
      });
    });
    document.querySelectorAll('.nw-view-tabs').forEach(bar => {
      bar.querySelectorAll('.nw-vtab').forEach(tab => {
        tab.addEventListener('click', () => {
          bar.querySelectorAll('.nw-vtab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          tab.dispatchEvent(new CustomEvent('nw-vtab-change', { bubbles: true }));
        });
      });
    });
  }

  /* ── TOOLTIPS (Bootstrap) ─────────────────────────────── */
  function initTooltips() {
    const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipEls.forEach(el => {
      if (typeof bootstrap !== 'undefined') {
        new bootstrap.Tooltip(el, { trigger: 'hover' });
      }
    });
  }

  /* ── UTILITY FUNCTIONS ────────────────────────────────── */
  const NW = {
    /* Format a number with K/M suffix */
    fmt: n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n),

    /* Get initials from a name */
    initials: name => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),

    /* Build an avatar HTML element */
    avatar: ({ initials, bg, size = 32, fontSize = '11px', extraClass = '' }) =>
      `<div class="nw-av ${extraClass}" style="width:${size}px;height:${size}px;font-size:${fontSize};background:${bg}">${initials}</div>`,

    /* Build stacked avatars */
    avatarStack: (members, size = 24) => {
      const html = members
        .slice(0, 3)
        .map(m => `<div class="nw-av" style="width:${size}px;height:${size}px;font-size:${Math.floor(size * .38)}px;background:${m.bg}">${m.i}</div>`)
        .join('');
      const extra = members.length > 3
        ? `<div class="nw-av" style="width:${size}px;height:${size}px;font-size:${Math.floor(size * .35)}px;background:var(--nw-hover);color:var(--nw-text-2)">+${members.length - 3}</div>`
        : '';
      return `<div class="nw-av-stack">${html}${extra}</div>`;
    },

    /* Status pill */
    pill: (status) => {
      const map = {
        done:    ['nw-pill-done',    'Done'],
        prog:    ['nw-pill-prog',    'In Progress'],
        review:  ['nw-pill-review',  'In Review'],
        blocked: ['nw-pill-blocked', 'Blocked'],
        todo:    ['nw-pill-todo',    'To Do'],
      };
      const [cls, lbl] = map[status] || ['nw-pill-todo', status];
      return `<span class="nw-pill ${cls}">${lbl}</span>`;
    },

    /* Priority badge */
    priority: (level) => {
      const cfg = {
        High:   { bg: 'rgba(240,78,110,.1)',  color: 'var(--nw-rose)' },
        Medium: { bg: 'rgba(245,166,35,.1)',  color: 'var(--nw-amber)' },
        Low:    { bg: 'rgba(31,214,137,.1)',  color: 'var(--nw-green)' },
      };
      const c = cfg[level] || cfg.Low;
      return `<span style="font-size:.72rem;font-weight:600;padding:3px 9px;border-radius:6px;background:${c.bg};color:${c.color}">${level}</span>`;
    },

    /* Role badge */
    role: (type) => {
      const map = { exec: 'nw-role-exec', pm: 'nw-role-pm', dev: 'nw-role-dev', client: 'nw-role-client' };
      const lbl = { exec: 'EXEC', pm: 'PM', dev: 'DEV', client: 'CLIENT' };
      return `<span class="nw-role ${map[type] || 'nw-role-dev'}">${lbl[type] || type.toUpperCase()}</span>`;
    },

    /* Progress bar */
    progress: (pct, color = 'var(--nw-cyan)', showText = true) => {
      const bar = `<div class="nw-progress flex-fill"><div class="nw-progress-bar" style="width:${pct}%;background:${color}"></div></div>`;
      return showText
        ? `<div class="d-flex align-items-center gap-2">${bar}<span class="text-nw-muted" style="font-size:.7rem;white-space:nowrap;min-width:28px">${pct}%</span></div>`
        : bar;
    },

    /* Determine progress bar color by status */
    progressColor: (status) => {
      const m = { done: 'var(--nw-green)', blocked: 'var(--nw-rose)', review: 'var(--nw-amber)' };
      return m[status] || 'var(--nw-cyan)';
    },

    /* Empty state */
    empty: (icon, title, sub) =>
      `<div class="text-center py-5"><i class="fa-solid ${icon} fa-2x mb-3" style="color:var(--nw-text-3)"></i><div style="color:var(--nw-text-2);font-weight:500">${title}</div><div style="font-size:.8rem;color:var(--nw-text-3)">${sub}</div></div>`,

    /* Append a "sent" message bubble to chat */
    sendChatMessage: (containerId, text) => {
      if (!text.trim()) return;
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const c = document.getElementById(containerId);
      if (!c) return;
      const div = document.createElement('div');
      div.className = 'd-flex justify-content-end';
      div.innerHTML = `<div><div class="nw-bubble nw-bubble-me">${text}</div><div class="text-end mt-1" style="font-size:.65rem;color:var(--nw-text-3)">${now} · Sent <i class="fa-solid fa-check-double fa-xs"></i></div></div>`;
      c.appendChild(div);
      c.scrollTop = c.scrollHeight;
    },
  };

  /* ── INIT ON DOM READY ────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Theme button wiring */
    document.querySelectorAll('.nw-theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
    /* Ensure correct icon state on load */
    updateThemeButtons(getTheme());

    /* Nav active state */
    setActiveNav();

    /* Tabs */
    initTabs();

    /* Tooltips */
    initTooltips();
  });

  /* Expose NW utilities globally */
  window.NW = NW;
  window.NW.getTheme = getTheme;
  window.NW.applyTheme = applyTheme;
  window.NW.toggleTheme = toggleTheme;

})();
