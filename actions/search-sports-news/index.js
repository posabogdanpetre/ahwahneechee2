// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block at the bottom of this file for endpoint details.
const MOCK_DATA = [
  {
    title: "Ce se întâmplă cu Istvan Kovacs la Cupa Mondială",
    excerpt: "Collina i-a dat vestea personal arbitrului român la turneul final din 2026.",
    category: "CM 2026",
    author: "Redacția Sport.ro",
    published_at: "2026-06-18T08:48:00Z",
    image_url: "https://www.sport.ro/img/2026/06/18/054847/mixcollage-18-jun-2026-08-48-am-2813.jpg?fm=jpg&q=80&fit=crop&crop=1200%2C675%2C0%2C100&w=1280"
  },
  {
    title: "Prima reacție a lui Ibrahima Konate după ce a semnat cu Real Madrid",
    excerpt: "Fundașul francez a vorbit pentru prima dată despre transferul de la Liverpool.",
    category: "La Liga",
    author: "Ionuț Dumitru",
    published_at: "2026-06-18T13:28:00Z",
    image_url: "https://www.sport.ro/img/2026/06/18/132825/screenshot-2026-06-18-162746.png?fm=jpg&q=80&fit=crop&crop=989%2C557%2C0%2C0&w=1280"
  },
  {
    title: "FCSB dă lovitura cu următorul transfer",
    excerpt: "Gigi Becali pregătește un transfer care face diferența pentru campioana României.",
    category: "Superliga",
    author: "Mihai Popescu",
    published_at: "2026-06-18T10:15:00Z",
    image_url: "https://www.sport.ro/img/2025/12/05/075208/gigi-becali-dancus-fcsb-digi-1.jpg?fm=jpg&q=80&fit=crop&crop=636%2C636%2C338%2C0&w=400"
  },
  {
    title: "Câștig mare de tot pentru un club din Superliga",
    excerpt: "Un club din liga întâi a primit o veste surprinzătoare privind un transfer important.",
    category: "Superliga",
    author: "Alex Georgescu",
    published_at: "2026-06-18T09:30:00Z",
    image_url: "https://www.sport.ro/img/2026/05/31/171039/minge-superliga.jpg?fm=jpg&q=80&fit=crop&crop=1280%2C720%2C0%2C0&w=1280"
  },
  {
    title: "Transfer-surpriză în Premier League",
    excerpt: "Un jucător de top a semnat astăzi cu un club din Anglia într-un transfer record.",
    category: "Premier League",
    author: "Cristian Marin",
    published_at: "2026-06-18T07:20:00Z",
    image_url: "https://www.sport.ro/img/2026/06/18/072045/premier-league-transfer.jpg?fm=jpg&q=80&fit=crop&crop=1200%2C675%2C0%2C0&w=1280"
  }
];

module.exports = async ({ category = '' }) => {
  let filtered = MOCK_DATA;

  if (category && category.trim()) {
    const cat = category.trim();
    filtered = MOCK_DATA.filter(article => article.category === cat);
  }

  const contentText = filtered.length === 0
    ? `No sports news found${category ? ` for category: ${category}` : ''}.`
    : `Found ${filtered.length} sports news article${filtered.length === 1 ? '' : 's'}${category ? ` in category: ${category}` : ''}.`;

  return {
    content: [
      { type: 'text', text: contentText }
    ],
    // structuredContent.articles — bare array outputSchema; key derived from actionName "search_sports_news"
    structuredContent: {
      articles: filtered
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/api/sports-news?category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the sports news API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/api/sports-news`);
 *   if (category) url.searchParams.set('category', category);
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   });
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */