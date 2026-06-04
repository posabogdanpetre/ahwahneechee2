/**
 * search_products
 * 
 * Searches Patagonia's outdoor clothing and gear catalog using optional filters for 
 * category, sport, and gender, returning an array of product objects with name, price, 
 * image, and category.
 */

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    "name": "Men's Nano Puff Insulated Jacket",
    "description": "Weather-resistant, lightweight and packable synthetic insulation layer that stays warm when wet.",
    "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg",
    "price": "£170",
    "category": "Jackets"
  },
  {
    "name": "Men's Torrentshell 3L Rain Jacket",
    "description": "Waterproof and breathable 3-layer rain jacket providing excellent performance and durability.",
    "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg",
    "price": "£180",
    "category": "Jackets"
  },
  {
    "name": "Women's Better Sweater Fleece Jacket",
    "description": "Full-zip jacket made of warm, 100% recycled polyester fleece.",
    "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb74b05e1/images/hi-res/25543_NENA.jpg",
    "price": "£130",
    "category": "Fleece"
  },
  {
    "name": "Women's Down Sweater Insulated Jacket",
    "description": "Lightweight, windproof jacket with a recycled nylon shell and 800-fill-power down.",
    "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw4729f37a/images/hi-res/84684_BNLB.jpg",
    "price": "£230",
    "category": "Jackets"
  },
  {
    "name": "Men's R1 Air Fleece Midlayer Jacket",
    "description": "Lightweight, highly breathable and quick-drying technical fleece jacket for cool conditions.",
    "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwce5a595b/images/hi-res/40275_CLOR.jpg",
    "price": "£130",
    "category": "Fleece"
  },
  {
    "name": "Black Hole Pack 32L",
    "description": "Weather-resistant pack perfect for the daily commute and rugged enough to haul around the globe.",
    "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwa49c297f/images/hi-res/49302_SMFO.jpg",
    "price": "£155",
    "category": "Packs & Gear"
  }
];

module.exports = async ({ category = '', sport = '', gender = '' }) => {
  // Apply filters to MOCK_DATA
  const results = MOCK_DATA.filter(item => {
    // Filter by category if provided
    if (category && category.trim()) {
      if (!item.category || !item.category.toLowerCase().includes(category.trim().toLowerCase())) {
        return false;
      }
    }
    
    // Filter by gender if provided (check product name for gender keywords)
    if (gender && gender.trim()) {
      const genderLower = gender.trim().toLowerCase();
      const nameLower = item.name.toLowerCase();
      
      if (genderLower === 'mens' || genderLower === 'men') {
        if (!nameLower.includes('men\'s')) return false;
      } else if (genderLower === 'womens' || genderLower === 'women') {
        if (!nameLower.includes('women\'s')) return false;
      } else if (genderLower === 'kids') {
        if (!nameLower.includes('kids') && !nameLower.includes('youth')) return false;
      }
    }
    
    // Sport filter would typically filter by tags/metadata not present in this fixture
    // In a real implementation, this would check item.sport or item.tags array
    
    return true;
  });

  // Build content text
  let contentText = '';
  if (results.length === 0) {
    contentText = 'No products found matching your criteria.';
  } else {
    const filterParts = [];
    if (category) filterParts.push(`category: ${category}`);
    if (gender) filterParts.push(`gender: ${gender}`);
    if (sport) filterParts.push(`sport: ${sport}`);
    
    const filterText = filterParts.length > 0 ? ` (${filterParts.join(', ')})` : '';
    contentText = `Found ${results.length} product${results.length === 1 ? '' : 's'}${filterText}.`;
  }

  return {
    content: [
      { type: 'text', text: contentText }
    ],
    // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
    structuredContent: {
      products: results
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&sport=${sport}&gender=${gender}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams();
 *   if (category) params.append('category', category);
 *   if (sport) params.append('sport', sport);
 *   if (gender) params.append('gender', gender);
 *   
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */
