export const projects = [
  { slug: 'picadura', name: 'Picadura', category: 'Audio', description: 'A 64-step generative acid MIDI sequencer with editable pitch, timing, and expression.', detail: 'MIDI sequencer · CLAP / VST3', url: 'https://piducan.dev/picadura/', downloads: 'https://piducan.dev/picadura/downloads/', repo: 'picadura', featured: true },
  { slug: 'buffer-uppercut', name: 'Buffer Uppercut', category: 'Audio', description: 'A real-time buffer performance effect with beat repeat, reverse, pitch, and other effects.', detail: 'Audio effect · CLAP / VST3', url: 'https://piducan.dev/buffer-uppercut/', downloads: 'https://piducan.dev/buffer-uppercut/downloads/', repo: 'buffer-uppercut', featured: true },
  { slug: 'orgdot-webfonts', name: 'Orgdot Webfonts', category: 'Web', description: 'Orgdot’s pixel fonts, packaged for self-hosting on the web.', detail: 'Typography · npm packages', url: 'https://piducan.dev/orgdot-webfonts/', repo: 'orgdot-webfonts' },
  { slug: '1000', name: 'Mil versos chilenos', category: 'Words', description: 'A JavaScript interpretation of the Chilean poetry compilation by Felipe Cussen and Marcela Labraña.', detail: 'Poetry · JavaScript', repo: '1000' },
  { slug: 'completos', name: 'Completos en Talca', category: 'Maps', description: 'An interactive map of 50 Google results for completos in Talca, Chile.', detail: 'Local exploration · Maps', repo: 'completos' },
  { slug: 'sheetpoetry', name: 'Sheet Poetry', category: 'Words', description: 'Poems made from randomly selected spreadsheet cells, served through a GraphQL API.', detail: 'Generative poetry · GraphQL', repo: 'sheetpoetry.xyz' },
  { slug: 'maulina', name: 'Maulina', category: 'Web', description: 'A website for the photographic work of women in Chile’s Maule Region.', detail: 'Photography · Community', repo: 'maulina.cl' },
  { slug: 'feriados', name: 'Feriados', category: 'Web', description: 'A small serverless API for looking up Chilean public holidays.', detail: 'Public data · API', repo: 'feriados' }
];
export const sourceUrl = p => `https://github.com/piducancore/${p.repo}`;
