const MOCK_DATA = [
  {
    name: "Men's Down Sweater™ Insulated Jacket",
    description: "Lightweight, windproof jacket with recycled nylon shell and 800-fill-power down.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
    price: "£230",
    category: "Jackets & Vests"
  },
  {
    name: "Men's Better Sweater™ Fleece Jacket",
    description: "Warm, low-bulk full-zip jacket made of sweater-knit 100% recycled polyester fleece.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw05e3f3df/images/hi-res/25528_NENA.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
    price: "£130",
    category: "Fleece"
  },
  {
    name: "Men's Nano Puff® Packable Insulated Jacket",
    description: "Weather-resistant, lightweight and packable synthetic insulation layer that stays warm when wet.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
    price: "£170",
    category: "Jackets & Vests"
  },
  {
    name: "Men's Torrentshell 3L Rain Jacket",
    description: "Waterproof and breathable 3-layer rain jacket for excellent performance and durability.",
    image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
    price: "£180",
    category: "Jackets & Vests"
  }
];

module.exports = async (args) => {
  const { product_name = '' } = args;

  if (!product_name) {
    return {
      content: [{
        type: 'text',
        text: 'Error: product_name is required.'
      }],
      isError: true
    };
  }

  // TODO: Replace with real API call to Patagonia product database
  // const response = await fetch(`${process.env.PATAGONIA_API_URL}/products?name=${encodeURIComponent(product_name)}`, {
  //   headers: { 'Authorization': `Bearer ${process.env.PATAGONIA_API_KEY}` }
  // });
  // const data = await response.json();

  // Find product by name (case-insensitive partial match)
  const product = MOCK_DATA.find(p =>
    p.name.toLowerCase().includes(product_name.toLowerCase())
  );

  if (!product) {
    return {
      content: [{
        type: 'text',
        text: `No product found matching "${product_name}".`
      }],
      isError: true
    };
  }

  // Parse price to number (remove currency symbols)
  const priceValue = parseFloat(product.price.replace(/[£,$]/g, ''));

  // Build complete product details matching outputSchema
  const productDetails = {
    name: product.name,
    description: product.description,
    price: priceValue,
    category: product.category,
    materials: product.materials || 'Material information not available',
    features: product.features || [],
    available_colors: product.available_colors || [],
    available_sizes: product.available_sizes || [],
    image_url: product.image_url
  };

  const content = [
    {
      type: 'text',
      text: `**${productDetails.name}**\n\n` +
            `${productDetails.description}\n\n` +
            `**Price:** £${productDetails.price}\n` +
            `**Category:** ${productDetails.category}\n` +
            (productDetails.materials && productDetails.materials !== 'Material information not available'
              ? `**Materials:** ${productDetails.materials}\n`
              : '') +
            (productDetails.features.length > 0
              ? `**Features:**\n${productDetails.features.map(f => `- ${f}`).join('\n')}\n`
              : '') +
            (productDetails.available_colors.length > 0
              ? `**Available Colors:** ${productDetails.available_colors.join(', ')}\n`
              : '') +
            (productDetails.available_sizes.length > 0
              ? `**Available Sizes:** ${productDetails.available_sizes.join(', ')}`
              : '')
    }
  ];

  return {
    content,
    structuredContent: productDetails
  };
};
