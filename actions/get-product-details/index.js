/**
 * get_product_details handler
 *
 * Retrieves detailed information about a single Patagonia product by name,
 * returning specifications including materials, features, sizing, price,
 * available colors, and sustainability information.
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

module.exports = async ({ product_name = '' }) => {
  // Validate required parameter
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to retrieve details for.' }],
      structuredContent: { product: null }
    };
  }

  const query = product_name.trim().toLowerCase();

  // Look up the product by name (case-insensitive partial match)
  const product = MOCK_DATA.find(p => p.name.toLowerCase().includes(query));

  if (!product) {
    return {
      content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
      structuredContent: { product: null }
    };
  }

  // Return product details
  return {
    content: [{
      type: 'text',
      text: `Found product: ${product.name}. ${product.description} Price: ${product.price}. Category: ${product.category}.`
    }],
    // structuredContent.product — bare array outputSchema; key derived from actionName "get_product_details"
    structuredContent: { product }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${productId}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data.products?.[0] || null;
 */
