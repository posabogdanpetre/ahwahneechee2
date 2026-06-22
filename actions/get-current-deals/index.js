// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: "Men's Better Sweater Fleece Jacket",
    price: "$139",
    original_price: "$199",
    discount_percentage: "30% OFF",
    category: "Fleece",
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw12345678/images/hi-res/25528_BLK.jpg"
  },
  {
    name: "Women's Down With It Parka",
    price: "$279",
    original_price: "$399",
    discount_percentage: "30% OFF",
    category: "Jackets",
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw23456789/images/hi-res/28439_SMDB.jpg"
  },
  {
    name: "Kids' Nano Puff Jacket",
    price: "$119",
    original_price: "$169",
    discount_percentage: "30% OFF",
    category: "Kids",
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw34567890/images/hi-res/68360_BLK.jpg"
  }
];

module.exports = async ({ category = '', gender = '' }) => {
  const results = MOCK_DATA.filter(item => {
    if (category && item.category.toLowerCase() !== category.toLowerCase()) return false;
    if (gender) {
      const itemGender = item.name.toLowerCase();
      if (gender === 'mens' && !itemGender.includes("men's")) return false;
      if (gender === 'womens' && !itemGender.includes("women's")) return false;
      if (gender === 'kids' && !itemGender.includes('kids')) return false;
    }
    return true;
  });

  const contentText = results.length > 0
    ? `Found ${results.length} item${results.length === 1 ? '' : 's'} currently on sale${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}.`
    : `No deals found${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}.`;

  return {
    content: [{ type: 'text', text: contentText }],
    // structuredContent.deals — bare array outputSchema; key derived from actionName "get_current_deals"
    structuredContent: { deals: results }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/api/deals?category=${category}&gender=${gender}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API (e.g. https://www.patagonia.com)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams();
 *   if (category) params.append('category', category);
 *   if (gender) params.append('gender', gender);
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/api/deals?${params}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */