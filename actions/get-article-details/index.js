const MOCK_DATA = [
  {
    name: "Ce se întâmplă cu Istvan Kovacs la Cupa Mondială",
    description: "Collina i-a dat vestea personal arbitrului român la turneul final din 2026.",
    image_url: "https://www.sport.ro/img/2026/06/18/054847/mixcollage-18-jun-2026-08-48-am-2813.jpg?fm=jpg&q=80&fit=crop&crop=1200%2C675%2C0%2C100&w=1280",
    category: "CM 2026"
  },
  {
    name: "Prima reacție a lui Ibrahima Konate după ce a semnat cu Real Madrid",
    description: "Fundașul francez a vorbit pentru prima dată despre transferul de la Liverpool.",
    image_url: "https://www.sport.ro/img/2026/06/18/132825/screenshot-2026-06-18-162746.png?fm=jpg&q=80&fit=crop&crop=989%2C557%2C0%2C0&w=1280",
    category: "La Liga"
  },
  {
    name: "FCSB dă lovitura cu următorul transfer",
    description: "Gigi Becali pregătește un transfer care face diferența pentru campioana României.",
    image_url: "https://www.sport.ro/img/2025/12/05/075208/gigi-becali-dancus-fcsb-digi-1.jpg?fm=jpg&q=80&fit=crop&crop=636%2C636%2C338%2C0&w=400",
    category: "Superliga"
  },
  {
    name: "Câștig mare de tot pentru un club din Superliga",
    description: "Un club din liga întâi a primit o veste surprinzătoare privind un transfer important.",
    image_url: "https://www.sport.ro/img/2026/05/31/171039/minge-superliga.jpg?fm=jpg&q=80&fit=crop&crop=1280%2C720%2C0%2C0&w=1280",
    category: "Superliga"
  }
];

module.exports = async ({ article_title = '' }) => {
  if (!article_title || typeof article_title !== 'string' || !article_title.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide an article_title to retrieve.' }]
    };
  }

  const query = article_title.trim().toLowerCase();
  const article = MOCK_DATA.find(a => a.name.toLowerCase().includes(query));

  if (!article) {
    return {
      content: [{ type: 'text', text: `No article found matching: ${article_title}` }]
    };
  }

  return {
    content: [
      {
        type: 'text',
        text: `Found article: "${article.name}" in the ${article.category} category. ${article.description}`
      }
    ],
    // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
    structuredContent: {
      title: article.name,
      content: article.description,
      author: "Sport.ro Staff",
      published_at: new Date().toISOString(),
      category: article.category,
      image_url: article.image_url,
      related_articles: MOCK_DATA.filter(a => a.category === article.category && a.name !== article.name)
        .slice(0, 3)
        .map(a => ({ title: a.name, category: a.category }))
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/articles?title=${encodeURIComponent(article_title)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/articles?title=${encodeURIComponent(article_title)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.article || null
 */