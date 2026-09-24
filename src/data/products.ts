export type CategoryId = 'mats' | 'wear' | 'equipment' | 'recovery';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  specifications: { label: string; value: string }[];
  sourceUrl: string;
  minOrder: string;
};

export const products: Product[] = [
  {
    id: '1601820402650',
    slug: 'natural-rubber-yoga-mat',
    name: 'Natural Rubber Yoga Mat',
    category: 'mats',
    tagline: 'Double-sided, foldable design.',
    description:
      'A natural rubber yoga mat with a double-sided, non-slip design. The foldable fitness pad is 4mm thick.',
    image: '/images/products/natural-rubber-yoga-mat.webp',
    imageAlt: 'Double-sided natural rubber yoga mat',
    specifications: [
      { label: 'Material', value: 'Natural rubber' },
      { label: 'Thickness', value: '4mm' },
      { label: 'Design', value: 'Double-sided, non-slip, foldable' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Pure-Natural-Rubber-Yoga-Mat-Double_1601820402650.html',
    minOrder: '10 pieces',
  },
  {
    id: '1601808653592',
    slug: 'slim-fit-yoga-camisole',
    name: 'Slim-Fit Yoga Camisole',
    category: 'wear',
    tagline: 'Sleeveless, slim-fit activewear.',
    description:
      'A sleeveless yoga camisole for women in nylon and spandex. The slim-fit design is breathable and quick-drying.',
    image: '/images/products/slim-fit-yoga-camisole.webp',
    imageAlt: 'Sleeveless slim-fit yoga camisole for women',
    specifications: [
      { label: 'Material', value: 'Nylon and spandex' },
      { label: 'Fit', value: 'Slim fit, sleeveless' },
      { label: 'Features', value: 'Breathable, quick-drying' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Women-Yoga-Camisole-Sleeveless-Slim-Fit_1601808653592.html',
    minOrder: '50 pieces',
  },
  {
    id: '1601948266148',
    slug: 'adjustable-silicone-wrist-weights',
    name: 'Adjustable Ankle & Wrist Weights',
    category: 'equipment',
    tagline: 'For walking, yoga and Pilates.',
    description:
      'Adjustable ankle and wrist weights made with silicone and iron. This unisex pair is intended for walking, yoga and Pilates.',
    image: '/images/products/adjustable-silicone-wrist-weights.webp',
    imageAlt: 'Adjustable silicone and iron ankle and wrist weights',
    specifications: [
      { label: 'Materials', value: 'Silicone and iron' },
      { label: 'Format', value: 'Pair' },
      { label: 'Design', value: 'Adjustable, unisex' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Adjustable-Silicone-Iron-Ankle-Wrist-Weights_1601948266148.html',
    minOrder: '68 pairs',
  },
  {
    id: '1601943384449',
    slug: 'silicone-massage-ball',
    name: 'Silicone Massage Ball',
    category: 'recovery',
    tagline: 'Portable fitness recovery.',
    description:
      'A portable silicone massage ball for full-body fitness recovery.',
    image: '/images/products/silicone-massage-ball.webp',
    imageAlt: 'Portable silicone massage ball',
    specifications: [
      { label: 'Material', value: 'Silicone' },
      { label: 'Design', value: 'Portable massage ball' },
      { label: 'Use', value: 'Full-body fitness recovery' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Portable-Silicone-Massage-Ball-for-Full_1601943384449.html',
    minOrder: '50 pieces',
  },
  {
    id: '1601960494894',
    slug: 'suede-rubber-yoga-mat',
    name: 'Suede Rubber Yoga Mat',
    category: 'mats',
    tagline: 'Printed, foldable and portable.',
    description:
      'A printed suede and natural rubber yoga mat and towel. The non-slip design is foldable and portable.',
    image: '/images/products/suede-rubber-yoga-mat.webp',
    imageAlt: 'Printed suede and natural rubber yoga mat',
    specifications: [
      { label: 'Materials', value: 'Suede and natural rubber' },
      { label: 'Surface', value: 'Printed, non-slip' },
      { label: 'Design', value: 'Foldable, portable' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Suede-Natural-Rubber-Yoga-Mat-and_1601960494894.html',
    minOrder: '500 pieces',
  },
  {
    id: '1601960566951',
    slug: 'tpe-pilates-bar-set',
    name: 'TPE Pilates Bar Set',
    category: 'equipment',
    tagline: 'Pilates equipment with logo options.',
    description:
      'A TPE Pilates bar set for yoga and fitness. Custom logo printing is available.',
    image: '/images/products/tpe-pilates-bar-set.webp',
    imageAlt: 'TPE Pilates fitness bar set',
    specifications: [
      { label: 'Material', value: 'TPE' },
      { label: 'Format', value: 'Pilates bar set' },
      { label: 'Customization', value: 'Custom logo printing' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Customizable-TPE-Pilates-Bar-Yoga-Fitness_1601960566951.html',
    minOrder: '100 pieces',
  },
  {
    id: '1601960686023',
    slug: 'linen-rubber-yoga-mat',
    name: 'Linen Rubber Yoga Mat',
    category: 'mats',
    tagline: 'Extra-wide with thickness options.',
    description:
      'An extra-wide, non-slip linen and rubber yoga mat. This customizable mat is offered in 3mm, 4mm and 5mm thicknesses.',
    image: '/images/products/linen-rubber-yoga-mat.webp',
    imageAlt: 'Extra-wide linen and rubber yoga mat',
    specifications: [
      { label: 'Materials', value: 'Linen and rubber' },
      { label: 'Thickness options', value: '3mm, 4mm, 5mm' },
      { label: 'Design', value: 'Extra-wide, non-slip' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Cross-border-Linen-Rubber-Yoga-Mat_1601960686023.html',
    minOrder: '500 pieces',
  },
  {
    id: '1601958337558',
    slug: 'oval-foldable-yoga-mat',
    name: 'Oval Foldable Yoga Mat',
    category: 'mats',
    tagline: 'An oval shape that folds.',
    description:
      'An oval yoga mat with a foldable design. It measures 183cm long and 10mm thick.',
    image: '/images/products/oval-foldable-yoga-mat.webp',
    imageAlt: 'Oval foldable yoga mat',
    specifications: [
      { label: 'Shape', value: 'Oval' },
      { label: 'Thickness', value: '10mm' },
      { label: 'Length', value: '183cm' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Oval-Thickened-Foldable-Yoga-Mat-10mm_1601958337558.html',
    minOrder: '50 pieces',
  },
  {
    id: '1601858612572',
    slug: '8mm-tpe-yoga-mat',
    name: '8mm TPE Yoga Mat',
    category: 'mats',
    tagline: 'High-density, foldable design.',
    description:
      'A high-density TPE yoga mat with a foldable design. The mat is 8mm thick.',
    image: '/images/products/8mm-tpe-yoga-mat.webp',
    imageAlt: 'Foldable 8mm TPE yoga mat',
    specifications: [
      { label: 'Material', value: 'TPE' },
      { label: 'Thickness', value: '8mm' },
      { label: 'Design', value: 'High-density, foldable' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Eco-Friendly-TPE-Yoga-Mat-8mm_1601858612572.html',
    minOrder: '20 pieces',
  },
  {
    id: '1601820402816',
    slug: 'cork-rubber-alignment-mat',
    name: 'Cork Rubber Alignment Mat',
    category: 'mats',
    tagline: 'Engraved alignment lines.',
    description:
      'A cork and natural rubber yoga mat with engraved alignment lines.',
    image: '/images/products/cork-rubber-alignment-mat.webp',
    imageAlt: 'Cork and natural rubber yoga mat with engraved alignment lines',
    specifications: [
      { label: 'Materials', value: 'Cork and natural rubber' },
      { label: 'Design', value: 'Engraved alignment lines' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Engraved-Posture-Lines-Cork-Natural-Rubber_1601820402816.html',
    minOrder: '10 pieces',
  },
  {
    id: '1601845761236',
    slug: '2lb-silicone-steel-weights',
    name: '2LB Silicone & Steel Weights',
    category: 'equipment',
    tagline: 'Ankle and wrist weights in multiple colors.',
    description:
      'Silicone and steel ankle and wrist weights offered in multiple colors. The listing states 2LB without specifying whether this is per weight or per pair.',
    image: '/images/products/2lb-silicone-steel-weights.webp',
    imageAlt: 'Silicone and steel ankle and wrist weights in multiple colors',
    specifications: [
      { label: 'Materials', value: 'Silicone and steel' },
      { label: 'Listed weight', value: '2LB; per-weight or per-pair basis unspecified' },
      { label: 'Colors', value: 'Multiple colors' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Premium-2LB-Silicone-Steel-Ankle-Wrist_1601845761236.html',
    minOrder: '53 pairs',
  },
  {
    id: '1601858683089',
    slug: 'travel-yoga-mat',
    name: 'Travel Yoga Mat',
    category: 'mats',
    tagline: 'Foldable, with a carry bag.',
    description:
      'A foldable, non-slip yoga mat for travel and home. A carry bag is included.',
    image: '/images/products/travel-yoga-mat.webp',
    imageAlt: 'Foldable travel yoga mat',
    specifications: [
      { label: 'Design', value: 'Foldable, non-slip' },
      { label: 'Accessory', value: 'Carry bag' },
    ],
    sourceUrl:
      'https://www.alibaba.com/product-detail/Foldable-Yoga-Mat-for-Travel-and_1601858683089.html',
    minOrder: '41 pieces',
  },
];

export const categories: {
  id: CategoryId;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
}[] = [
  {
    id: 'mats',
    name: 'Yoga & Pilates',
    eyebrow: 'Mat practice',
    description: 'Explore yoga mats in rubber, suede, linen, cork and TPE.',
    image: products[0].image,
  },
  {
    id: 'wear',
    name: 'Activewear',
    eyebrow: 'Movement wear',
    description: 'Sleeveless, slim-fit yoga wear in nylon and spandex.',
    image: products[1].image,
  },
  {
    id: 'equipment',
    name: 'Training Essentials',
    eyebrow: 'Everyday training',
    description: 'Explore ankle and wrist weights alongside a Pilates bar set.',
    image: products[2].image,
  },
  {
    id: 'recovery',
    name: 'Recovery & Support',
    eyebrow: 'After practice',
    description: 'Portable silicone massage balls for fitness recovery.',
    image: products[3].image,
  },
];

export function categoryName(id: CategoryId): string {
  return categories.find((category) => category.id === id)!.name;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
