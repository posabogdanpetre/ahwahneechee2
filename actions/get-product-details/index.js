/**
 * get_product_details
 * 
 * Retrieves detailed information about a single Patagonia product by name, returning 
 * specifications including materials, features, sizing, price, and sustainability certifications.
 */

// Mock data fixture (from scraped sample data, enriched with missing fields)
const MOCK_DATA = [
  {
    name: "Women's Better Sweater Fleece Jacket",
    description: "Full-zip jacket made of warm, 100% recycled polyester fleece.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw0e491b7c/images/hi-res/25543_STH.jpg",
    price: 139,
    category: "Women's Fleece",
    material: "100% recycled polyester fleece",
    features: [
      "Full-zip design",
      "Better Sweater fleece with sweater-knit aesthetic",
      "Zippered handwarmer pockets",
      "Princess seams for shaping"
    ],
    certifications: "Fair Trade Certified, 100% recycled content"
  },
  {
    name: "Men's Houdini Windbreaker Jacket",
    description: "Packable, featherweight windproof shell made from 100% recycled nylon.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw4c81478a/images/hi-res/24142_BLK.jpg",
    price: 119,
    category: "Men's Jackets",
    material: "100% recycled nylon ripstop",
    features: [
      "Featherweight windproof shell",
      "Packs into internal chest pocket",
      "DWR finish",
      "Elasticized cuffs and hem"
    ],
    certifications: "Fair Trade Certified, bluesign approved, 100% recycled content"
  },
  {
    name: "Women's Retro Pile Fleece Jacket",
    description: "Heritage-inspired jacket made with 100% recycled polyester deep-pile fleece.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5e1dce1a/images/hi-res/22795_NAT.jpg",
    price: 179,
    category: "Women's Fleece",
    material: "100% recycled polyester deep-pile fleece",
    features: [
      "Full-zip front with stand-up collar",
      "Handwarmer pockets with zippers",
      "Deep-pile fleece for warmth",
      "Feminine fit with princess seams"
    ],
    certifications: "Fair Trade Certified, 100% recycled content"
  },
  {
    name: "Women's Better Sweater 1/4-Zip Fleece Pullover",
    description: "Quarter-zip pullover with sweater-knit aesthetic in 100% recycled polyester.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb3c2fcac/images/hi-res/25618_BCW.jpg",
    price: 119,
    category: "Women's Fleece",
    material: "100% recycled polyester fleece",
    features: [
      "Quarter-zip design",
      "Better Sweater fleece with sweater-knit face",
      "Micropolyester jersey trim at collar and cuffs",
      "Princess seams for feminine fit"
    ],
    certifications: "Fair Trade Certified, 100% recycled content"
  },
  {
    name: "Men's Windsweep Lightweight Windbreaker Jacket",
    description: "Lightweight, packable windbreaker for everyday adventures.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw9a7b312e/images/hi-res/20320_INK.jpg",
    price: 99,
    category: "Men's Jackets",
    material: "100% recycled nylon plain weave",
    features: [
      "Lightweight and packable",
      "Full-zip front",
      "Adjustable hood",
      "Elastic cuffs and hem"
    ],
    certifications: "Fair Trade Certified, 100% recycled content"
  }
];

module.exports = async (args) => {
  const { product_name } = args;

  // Validate required parameter
  if (!product_name || typeof product_name !== 'string' || product_name.trim() === '') {
    return {
      content: [{ type: 'text', text: 'Error: product_name is required and must be a non-empty string.' }],
      isError: true
    };
  }

  // TODO: Replace with real API call
  // const response = await fetch(`${process.env.API_BASE_URL}/products/details`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.API_KEY}`
  //   },
  //   body: JSON.stringify({ product_name })
  // });
  // const product = await response.json();

  // Search for product by name (case-insensitive partial match)
  const searchTerm = product_name.toLowerCase().trim();
  const product = MOCK_DATA.find(p => 
    p.name.toLowerCase().includes(searchTerm)
  );

  if (!product) {
    return {
      content: [{
        type: 'text',
        text: `No product found matching "${product_name}". Please try a different product name.`
      }],
      isError: true
    };
  }

  // Format features list for text output
  const featuresList = product.features && product.features.length > 0
    ? product.features.map(f => `• ${f}`).join('\n')
    : 'N/A';

  // Build text summary for LLM
  const content = [
    {
      type: 'text',
      text: `**${product.name}**\n\n${product.description}\n\n` +
            `**Price:** £${product.price}\n` +
            `**Category:** ${product.category}\n\n` +
            `**Material:** ${product.material || 'N/A'}\n\n` +
            `**Features:**\n${featuresList}\n\n` +
            `**Certifications:** ${product.certifications || 'N/A'}`
    }
  ];

  // Return structured data for widget rendering
  const structuredContent = {
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image_url: product.image_url,
    material: product.material || '',
    features: product.features || [],
    certifications: product.certifications || ''
  };

  return {
    content,
    structuredContent
  };
};
