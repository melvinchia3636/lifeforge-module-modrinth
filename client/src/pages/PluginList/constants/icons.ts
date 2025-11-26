import {
  getIcon as getIconFromRegistry,
  getKey as getKeyFromRegistry
} from '@/utils/iconUtils'

export const ICONS = {
  loaders: {
    BungeeCord:
      '<svg viewBox="0 0 24 24" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;">\n    <rect id="Bungeecord" x="-0" y="0" width="24" height="24" style="fill:none;"></rect>\n    <path d="M3.778,19.778C3.778,21.004 4.774,22 6,22C7.226,22 8.222,21.004 8.222,19.778L8.222,16.444C8.222,15.218 7.226,14.222 6,14.222L6,7.556C6,5.727 7.171,4.222 9,4.222C10.829,4.222 12,5.727 12,7.556L12,16.444" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:2px;"></path>\n    <path d="M7,15L6,13L5,15L7,15" style="fill:none;stroke:currentColor;stroke-width:2px;stroke-miterlimit:1.5;"></path>\n    <path d="M20.222,4.444C20.222,3.218 19.226,2.222 18,2.222C16.774,2.222 15.778,3.218 15.778,4.444L15.778,7.778C15.778,9.004 16.774,10 18,10L18,16.667C18,18.495 16.829,20 15,20C13.171,20 12,18.495 12,16.667L12,7.778" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:2px;"></path>\n    <path d="M17,9.222L18,11.222L19,9.222L17,9.222" style="fill:none;stroke:currentColor;stroke-width:2px;stroke-miterlimit:1.5;"></path>\n</svg>',
    Geyser:
      '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5" viewBox="0 0 24 24"><path d="M-29.359 21.58s.347-4.964-2.603-9.503l3.419 1.511 2.032-4.165s.407 5.006.717 6.82l4.201-2.269s-3.582 5.066-3.339 7.726" style="fill:none;stroke:currentColor;stroke-width:1.81px" transform="matrix(1.04036 0 0 1.1631 40.307 -2.368)"></path><path d="M-28.662 13.511s-.605-4.431-3.127-5.772c-.957-.256-1.802 1.129-2.839.953-.783-.134-.92-1.322.118-2.625 1.253-1.572 3.754-3.239 7.51-3.133s7.899 2.025 8.029 4.378c-.139 1.765-2.05.754-2.05.754s-2.885-1.535-4.801 7.697" style="fill:none;stroke:currentColor;stroke-width:1.81px" transform="matrix(1.04036 0 0 1.1631 40.432 -2.278)"></path><path d="M-33.825 10.737s-1.006.602-1.867 2.089" style="fill:none;stroke:currentColor;stroke-width:1.81px" transform="matrix(1.0317 -.13393 .14973 1.15343 36.882 -5.8)"></path><path d="M-21.195 10.385s1.378.38 1.947 1.615" style="fill:none;stroke:currentColor;stroke-width:1.81px" transform="matrix(1.04036 0 0 1.1631 41.36 -1.513)"></path></svg>',
    Velocity:
      '<svg viewBox="0 0 500 500" fill="currentColor"><path d="M236.25 232.55l-54.08-73.79a11.86 11.86 0 00-11.91-4.62L84 171.57a11.88 11.88 0 00-8 5.88l-42.64 77.07a11.84 11.84 0 00.81 12.75l54.21 74a11.86 11.86 0 0011.91 4.62l86-17.37a11.85 11.85 0 008-5.89l42.78-77.3a11.86 11.86 0 00-.82-12.78zm-59.45 74.21a9.57 9.57 0 01-13.39-2.06l-31-42.24a16 16 0 00-16-6.21l-52.58 10.63a9.58 9.58 0 01-11.29-7.49A9.58 9.58 0 0160 248.1l57-11.52a16 16 0 0010.81-7.92L156.42 177a9.58 9.58 0 0113-3.75 9.58 9.58 0 013.75 13L146.81 234a16 16 0 001.09 17.16l31 42.23a9.58 9.58 0 01-2.1 13.37z"></path><circle cx="416.44" cy="236.11" r="9.83"></circle><path d="M458.29 265.6H280.52a9.83 9.83 0 110-19.66h106.22a9.84 9.84 0 000-19.67h-70.2a9.83 9.83 0 110-19.66H422.9a9.84 9.84 0 000-19.67H202.83l33.42 45.61a11.86 11.86 0 01.81 12.75l-42.78 77.3a11.75 11.75 0 01-1.4 2h212.29a9.83 9.83 0 100-19.66h-53.53a9.84 9.84 0 110-19.67h106.65a9.84 9.84 0 100-19.67z"></path></svg>',
    Waterfall:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>'
  },
  categories: {
    Adventure:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>',
    Cursed:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7.5" width="10" height="14" rx="5"></rect><polyline points="2 12.5 4 14.5 7 14.5"></polyline><polyline points="22 12.5 20 14.5 17 14.5"></polyline><polyline points="3 21.5 5 18.5 7 17.5"></polyline><polyline points="21 21.5 19 18.5 17 17.5"></polyline><polyline points="3 8.5 5 10.5 7 11.5"></polyline><polyline points="21 8.5 19 10.5 17 11.5"></polyline><line x1="12" y1="7.5" x2="12" y2="21.5"></line><path d="M15.38,8.82A3,3,0,0,0,16,7h0a3,3,0,0,0-3-3H11A3,3,0,0,0,8,7H8a3,3,0,0,0,.61,1.82"></path><line x1="9" y1="4.5" x2="8" y2="2.5"></line><line x1="15" y1="4.5" x2="16" y2="2.5"></line></svg>',
    Decoration:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    Economy:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    Equipment:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.573 20.038L3.849 7.913 2.753 2.755 7.838 4.06 19.47 18.206l-1.898 1.832z"></path><path d="M7.45 14.455l-3.043 3.661 1.887 1.843 3.717-3.25"></path><path d="M16.75 10.82l3.333-2.913 1.123-5.152-5.091 1.28-2.483 2.985"></path><path d="M21.131 16.602l-5.187 5.01 2.596-2.508 2.667 2.761"></path><path d="M2.828 16.602l5.188 5.01-2.597-2.508-2.667 2.761"></path></svg>',
    Food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"></path><path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z"></path><path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z"></path></svg>',
    'Game Mechanics':
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>',
    Library:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    Magic:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="M17.8 11.8 19 13"></path><path d="M15 9h0"></path><path d="M17.8 6.2 19 5"></path><path d="m3 21 9-9"></path><path d="M12.2 6.2 11 5"></path></svg>',
    Management:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    Minigame:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    Mobs: '<svg xml:space="preserve" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.5" clip-rule="evenodd" viewBox="0 0 24 24">\n  <path fill="none" d="M0 0h24v24H0z"></path>\n  <path fill="none" stroke="currentColor" stroke-width="2" d="M3 3h18v18H3z"></path>\n  <path stroke="currentColor" fill="currentColor" d="M6 6h4v4H6zm8 0h4v4h-4zm-4 4h4v2h2v6h-2v-2h-4v2H8v-6h2v-2Z"></path>\n</svg>',
    Optimization:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    Social:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    Storage:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>',
    Technology:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>',
    Transportation:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
    Utility:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    Worldgen:
      '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  },
  platforms: {
    Bukkit:
      '<svg viewBox="0 0 292 319" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;" stroke="currentColor"><g transform="matrix(1,0,0,1,0,-5)"><path d="M12,109.5L12,155L34.5,224L57.5,224L57.5,271L81,294L160,294L160,172L259.087,172L265,155L265,109.5M12,109.5L12,64L34.5,64L34.5,41L81,17L195.5,17L241,41L241,64L265,64L265,109.5M12,109.5L81,109.5L81,132L195.5,132L195.5,109.5L265,109.5M264.087,204L264.087,244M207.5,272L207.5,312M250,272L250,312L280,312L280,272L250,272ZM192.5,204L192.5,244L222.5,244L222.5,204L192.5,204Z" style="fill:none;fill-rule:nonzero;stroke-width:24px;"></path></g></svg>',
    Folia:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>',
    Paper:
      '<svg xml:space="preserve" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" clip-rule="evenodd" viewBox="0 0 24 24">\n  <path fill="none" d="M0 0h24v24H0z"></path>\n  <path fill="none" stroke="currentColor" stroke-width="2" d="m12 18 6 2 3-17L2 14l6 2"></path>\n  <path stroke="currentColor" stroke-width="2" d="m9 21-1-5 4 2-3 3Z"></path>\n  <path fill="currentColor" d="m12 18-4-2 10-9-6 11Z"></path>\n</svg>',
    Purpur:
      '<svg xml:space="preserve" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" clip-rule="evenodd" viewBox="0 0 24 24">\n  <defs>\n    <path id="purpur" fill="none" stroke="currentColor" stroke-width="1.68" d="m264 41.95 8-4v8l-8 4v-8Z"></path>\n  </defs>\n  <path fill="none" d="M0 0h24v24H0z"></path>\n  <path fill="none" stroke="currentColor" stroke-width="1.77" d="m264 29.95-8 4 8 4.42 8-4.42-8-4Z" transform="matrix(1.125 0 0 1.1372 -285 -31.69)"></path>\n  <path fill="none" stroke="currentColor" stroke-width="1.77" d="m272 38.37-8 4.42-8-4.42" transform="matrix(1.125 0 0 1.1372 -285 -31.69)"></path>\n  <path fill="none" stroke="currentColor" stroke-width="1.77" d="m260 31.95 8 4.21V45" transform="matrix(1.125 0 0 1.1372 -285 -31.69)"></path>\n  <path fill="none" stroke="currentColor" stroke-width="1.77" d="M260 45v-8.84l8-4.21" transform="matrix(1.125 0 0 1.1372 -285 -31.69)"></path>\n  <use xlink:href="#purpur" stroke-width="1.68" transform="matrix(1.125 0 0 1.2569 -285 -40.78)"></use>\n  <use xlink:href="#purpur" stroke-width="1.68" transform="matrix(-1.125 0 0 1.2569 309 -40.78)"></use>\n</svg>',
    Spigot:
      '<svg viewBox="0 0 332 284" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;fill:none;fill-rule:nonzero;stroke-width:24px;" stroke="currentColor"><path d="M147.5,27l27,-15l27.5,15l66.5,0l0,33.5l-73,-0.912l0,45.5l26,-0.088l0,31.5l-12.5,0l0,15.5l16,21.5l35,0l0,-21.5l35.5,0l0,21.5l24.5,0l0,55.5l-24.5,0l0,17l-35.5,0l0,-27l-35,0l-55.5,14.5l-67.5,-14.5l-15,14.5l18,12.5l-3,24.5l-41.5,1.5l-48.5,-19.5l6,-19l24.5,-4.5l16,-41l79,-36l-7,-15.5l0,-31.5l23.5,0l0,-45.5l-73.5,0l0,-32.5l67,0Z"></path></svg>',
    Sponge:
      '<svg viewBox="0 0 268 313" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;fill:none;fill-rule:nonzero;stroke-width:24px;" stroke="currentColor"><path d="M84.299,35.5c-5.547,-13.776 -19.037,-23.5 -34.799,-23.5c-20.711,0 -37.5,16.789 -37.5,37.5c-0,20.711 16.789,37.5 37.5,37.5c20.711,0 37.5,-16.789 37.5,-37.5c0,-4.949 -0.959,-9.674 -2.701,-14Zm0,0l44.701,-8.5l28,65m0,0l-99,20l-18,47.5l15.5,37l-25,32.5l0,72l222.5,0l2.5,-72l-33.5,-117l-65,-20Zm-60,65l0,15m94,-13.5l0,13.5m-67.5,45l46,0l-12.5,50.5l-14.5,0l-19,-50.5Z"></path></svg>'
  }
}

export function getPluginIcon(id: string) {
  return getIconFromRegistry(ICONS, id)
}

export function getPluginKey(id: string) {
  return getKeyFromRegistry(ICONS, id)
}
