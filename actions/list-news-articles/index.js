// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Prima echipă care îl vrea pe Zeljko Kopic, după plecarea de la Dinamo',
        description: "Transfer news on Zeljko Kopic's next club after leaving Dinamo.",
        image_url: 'https://www.sport.ro/img/2025/05/26/180419/zeljko-kopic.jpg?fm=jpg&q=80&fit=crop&crop=360%2C360%2C34%2C0&w=400',
        category: 'Fotbal Extern'
    },
    {
        name: 'Claudiu Niculescu la 50 de ani! Fanii lui Dinamo nu l-au uitat',
        description: 'Feature on Dinamo legend Claudiu Niculescu turning 50.',
        image_url: 'https://www.sport.ro/img/2026/06/23/120024/niculescu-danciulescu-dinamo-imago4409479.jpg?fm=jpg&q=80&fit=crop&crop=1540%2C866%2C0%2C68&w=1280',
        category: 'Liga 1'
    },
    {
        name: 'FC Botoșani poate rămâne cu ochii în soare! Enriko Papa e dorit de două echipe',
        description: 'Two top-flight clubs reportedly want Enriko Papa.',
        image_url: 'https://www.sport.ro/img/2022/03/12/144001/aniversarea-unuia-dintre-cei-mai-loiali-stranieri-din-liga-1-enriko-papa-implineste-29-de-ani.jpg?fm=jpg&q=80&fit=crop&crop=1000%2C750%2C0%2C0&w=400',
        category: 'Fotbal Intern'
    },
    {
        name: 'Mijlocașul defensiv a revenit în Superliga: a semnat cu Farul Constanța',
        description: 'Defensive midfielder returns to Superliga after two years in France.',
        image_url: 'https://www.sport.ro/img/2026/06/23/105912/fcsb-fc-arges-superliga-superbet-2102022-tony-njike.jpg?fm=jpg&q=80&fit=crop&crop=3939%2C2216%2C0%2C92&w=1280',
        category: 'Liga 1'
    },
    {
        name: 'Un milion de euro pentru Florinel Coman!',
        description: 'Transfer report on a one-million-euro offer for Florinel Coman.',
        image_url: 'https://www.sport.ro/img/2026/04/04/194249/coman-gharafa-insta.JPG?fm=jpg&q=80&fit=crop&crop=820%2C462%2C0%2C0&w=1280',
        category: 'Stranieri'
    },
    {
        name: 'Susținătoarele echipei Capul Verde, virale pe internet la Cupa Mondială 2026',
        description: 'Cape Verde fans go viral during the 2026 World Cup.',
        image_url: 'https://www.sport.ro/img/2026/06/23/085439/cabo-verde.jpg?fm=jpg&q=80&fit=crop&crop=2915%2C1824%2C342%2C0',
        category: 'CM 2026'
    }
];

module.exports = async ({ category = '', limit = 10 } = {}) => {
    const max = (typeof limit === 'number' && limit > 0) ? limit : 10;

    let results = MOCK_DATA;
    if (category && typeof category === 'string' && category.trim()) {
        const wanted = category.trim().toLowerCase();
        results = results.filter((article) => article.category.toLowerCase() === wanted);
    }

    results = results.slice(0, max);

    const summary = category && category.trim()
        ? `Found ${results.length} ${category.trim()} news article${results.length === 1 ? '' : 's'}.`
        : `Found ${results.length} sports news article${results.length === 1 ? '' : 's'}.`;

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.articles — bare array outputSchema; key derived from actionName "list_news_articles"
        structuredContent: { articles: results }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/news?category=${category}&limit=${limit}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams();
 *   if (category) params.set('category', category);
 *   params.set('limit', String(limit));
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/news?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */
