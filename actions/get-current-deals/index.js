/**
 * get_current_deals — Retrieves past-season gear and sale items currently available at discounted prices,
 * returning an array of products with original and sale pricing across all categories.
 */

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    name: "Men's Nano Puff Insulated Jacket",
    description: "Lightweight, packable synthetic insulation jacket that stays warm when wet, made with recycled materials.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
    category: "Men's",
    original_price: 200,
    sale_price: 170,
    discount_percentage: "15%"
  },
  {
    name: "Men's Triolet Alpine Jacket",
    description: "Alpine workhorse with 3-layer GORE-TEX waterproof/breathable fabric, built for cold and snowy conditions.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3898a537/images/hi-res/84213_SMDB.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
    category: "Men's",
    original_price: 450,
    sale_price: 380,
    discount_percentage: "16%"
  },
  {
    name: "Women's Better Sweater 1/4-Zip Fleece",
    description: "Sweater-knit aesthetic with 100% recycled polyester fleece, a versatile everyday mid-layer.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw86f4117a/images/hi-res/84213_OLGG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
    category: "Women's",
    original_price: 130,
    sale_price: 110,
    discount_percentage: "15%"
  },
  {
    name: "Men's Houdini Windbreaker Jacket",
    description: "Ultralight 100% recycled nylon windbreaker with weather-resistant protection, highly packable.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc92431d5/images/hi-res/84213_FGE.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
    category: "Men's",
    original_price: 140,
    sale_price: 120,
    discount_percentage: "14%"
  },
  {
    name: "Men's Jackson Glacier Down Jacket",
    description: "Waterproof down jacket with 700-fill recycled down and 100% recycled polyester shell for rain and wind protection.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwd54245bb/images/hi-res/84213_BLK.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
    category: "Men's",
    original_price: 420,
    sale_price: 350,
    discount_percentage: "17%"
  }
];

module.exports = async ({ category = '' }) => {
  // Apply filtering logic
  let results = MOCK_DATA;

  if (category && category.trim() !== '') {
    const filterCategory = category.trim();
    results = MOCK_DATA.filter(item => item.category === filterCategory);
  }

  // Build content text
  let contentText;
  if (results.length === 0) {
    contentText = category
      ? `No past-season deals found in the "${category}" category.`
      : 'No past-season deals are currently available.';
  } else {
    contentText = category
      ? `Found ${results.length} past-season deal${results.length === 1 ? '' : 's'} in the "${category}" category with discounts up to ${Math.max(...results.map(r => parseInt(r.discount_percentage)))}%.`
      : `Found ${results.length} past-season deal${results.length === 1 ? '' : 's'} with discounts up to ${Math.max(...results.map(r => parseInt(r.discount_percentage)))}%.`;
  }

  return {
    content: [
      { type: 'text', text: contentText }
    ],
    // structuredContent.deals — bare array outputSchema; key derived from actionName "get_current_deals"
    structuredContent: {
      deals: results
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/deals?category=${encodeURIComponent(category)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products?on_sale=true&category=${encodeURIComponent(category)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the retail website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/deals`);
 *   if (category) url.searchParams.set('category', category);
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   });
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data;
 */
