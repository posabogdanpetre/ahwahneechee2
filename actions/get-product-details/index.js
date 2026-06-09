/**
 * get_product_details
 * 
 * Retrieves detailed information about a single Patagonia product by name, returning specifications, materials, care instructions, sizing, reviews, and environmental certifications.
 */

// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Better Sweater Quarter-Zip Fleece',
    price: '£85.00',
    description: 'Made from 100% recycled polyester sweater-knit fleece with a quarter-zip design. Features a stand-up collar with zip-through protection, princess seams for shaping, and raglan sleeves. Lightweight, warm, and ideal for layering.',
    category: 'Fleece',
    fit: 'Regular',
    weight: '368g',
    materials: '100% recycled polyester fleece',
    rating: 4.6,
    review_count: 1243,
    certifications: 'Fair Trade Certified™ sewn, bluesign® approved',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw123456/images/hi-res/25522_BLK.jpg'
  },
  {
    name: 'Nano Puff Jacket',
    price: '£210.00',
    description: 'Lightweight, windproof, and water-resistant insulated jacket featuring 60g PrimaLoft® Gold Insulation Eco. Shell and lining are made from 100% recycled nylon with a DWR finish. Packs into its own internal chest pocket.',
    category: 'Insulated Jackets',
    fit: 'Slim',
    weight: '337g',
    materials: '100% recycled nylon ripstop with PrimaLoft® Gold Insulation Eco (60g)',
    rating: 4.8,
    review_count: 2987,
    certifications: 'Fair Trade Certified™ sewn, bluesign® approved',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw789012/images/hi-res/84212_SMDB.jpg'
  },
  {
    name: 'Capilene Cool Daily Hoody',
    price: '£55.00',
    description: 'Lightweight, breathable hoody made from 50-100% recycled polyester with HeiQ® Fresh durable odour control. Features raglan sleeves, a hood for sun protection, and offset shoulder seams to prevent chafing under pack straps.',
    category: 'Base Layers',
    fit: 'Relaxed',
    weight: '147g',
    materials: '50-100% recycled polyester with HeiQ® Fresh',
    rating: 4.4,
    review_count: 567,
    certifications: 'Fair Trade Certified™ sewn, bluesign® approved',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw345678/images/hi-res/45235_FEA.jpg'
  }
];

module.exports = async ({ product_name = '' }) => {
  // Validate required parameter
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }],
      structuredContent: { product: null }
    };
  }

  const query = product_name.trim().toLowerCase();

  // Look up product by name
  const product = MOCK_DATA.find(p => p.name.toLowerCase() === query);

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
      text: `Found product: ${product.name} (${product.price}). ${product.description} Rating: ${product.rating}/5 from ${product.review_count} reviews. Materials: ${product.materials}. Certifications: ${product.certifications}.`
    }],
    // structuredContent.product — single item detail; key derived from actionName "get_product_details"
    structuredContent: { product }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${product_id}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API (e.g., https://www.patagonia.com/api/v1)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data.products && data.products.length > 0 ? data.products[0] : null;
 */
