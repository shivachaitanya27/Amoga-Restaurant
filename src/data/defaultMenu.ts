import { MenuItem, Category, RestaurantSettings, Offer, GalleryItem, Review } from '../types';

export const DEFAULT_SETTINGS: RestaurantSettings = {
  restaurantName: "Amoga Family Restaurant",
  ownerName: "Shiva Chaitanya",
  phone: "9550382281",
  whatsapp: "9550382281",
  address: "Shop, Hotel, Vishnu Residency, Opp. GP Reddy Sweet, Mayuri Center, Balaji Nagar, Khammam, Telangana – 507001.",
  openingTime: "11:00 AM",
  closingTime: "12:00 AM",
  googleMapsUrl: "https://maps.app.goo.gl/31x4pAkP6A7Q6eR67",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3810.3601552504933!2d80.1492004!3d17.2476592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35b1c555555555%3A0x6b4b41311026e95!2sMayuri%20Center%2C%20Balaji%20Nagar%2C%20Khammam%2C%20Telangana%20507001!5e0!3m2!1sen!2sin!4v1700000000000",
  googleRating: 4.7,
  reviewCount: 505,
  description: "Amoga Family Restaurant offers delicious and freshly prepared food with a special focus on biryanis, starters and family combos. Enjoy a pleasant dining atmosphere, friendly service, generous portions and delicious food at reasonable prices.",
  todaysSpecial: {
    title: "Chicken Dum Family Pack Biryani",
    description: "Our signature dum-cooked biryani served in an abundant family pack with aromatic basmati rice, tender spiced chicken, boiled eggs, mirchi ka salan, and raita.",
    price: 699,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg"
  },
  loyaltyPointsRate: 5 // 5 points for every ₹100 spent
};

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "non-veg-starters",
    name: "Non-Veg Starters",
    iconName: "Flame",
    description: "Sizzling hot chicken, egg, fish, mutton and prawn appetisers tossed with fresh aromatics.",
    colorBg: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: "cat-2",
    slug: "veg-starters",
    name: "Veg Starters",
    iconName: "Leaf",
    description: "Crispy paneer, gobi, mushroom and vegetable bites tossed with spices.",
    colorBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "cat-3",
    slug: "non-veg-biryanis",
    name: "Non-Veg Biryanis",
    iconName: "UtensilsCrossed",
    description: "Authentic slow-dum cooked fragrant basmati biryanis & spicy fry combos.",
    colorBg: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    id: "cat-4",
    slug: "veg-biryanis",
    name: "Veg Biryanis",
    iconName: "Soup",
    description: "Rich vegetable, kaju, paneer and mushroom dum & fried biryanis.",
    colorBg: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "cat-5",
    slug: "veg-rice",
    name: "Veg Rice Items",
    iconName: "Bowl",
    description: "Wok-tossed fried rice varieties bursting with garden vegetables & aromatic spices.",
    colorBg: "bg-orange-50 text-orange-700 border-orange-200"
  }
];

// EXACT 62 MENU ITEMS AS SPECIFIED IN REQUIREMENTS
export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // CATEGORY 1: NON-VEG STARTERS (16 items)
  {
    id: "nvs-01",
    name: "Egg Manchurian",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 219,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Crispy boiled egg bites tossed in a savoury Indo-Chinese soy and chilli glaze.",
    isAvailable: true
  },
  {
    id: "nvs-02",
    name: "Egg 65",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 219,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Spiced battered egg pieces tempered with fresh curry leaves, mustard and red chillies.",
    isAvailable: true
  },
  {
    id: "nvs-03",
    name: "Chilli Egg",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 219,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Stir-fried egg pieces with crunchy capsicum, sliced onions and tangy green chillies.",
    isAvailable: true
  },
  {
    id: "nvs-04",
    name: "Chicken Manchurian",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Succulent chicken chunks simmered in a garlic, ginger and spring onion sauce.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvs-05",
    name: "Chicken 65",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Iconic South Indian crisp fried chicken bites infused with curry leaves and cracked pepper.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvs-06",
    name: "Chilli Chicken",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Crisp chicken pieces tossed with green chillies, bell peppers and savoury oriental sauce.",
    isAvailable: true
  },
  {
    id: "nvs-07",
    name: "Dragon Chicken",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Crispy chicken strips coated in a fiery sweet-chilli sauce garnished with roasted cashews.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvs-08",
    name: "Pepper Chicken",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Pan-roasted chicken packed with freshly crushed black peppercorns and aromatic curry leaves.",
    isAvailable: true
  },
  {
    id: "nvs-09",
    name: "Chicken Lollipop",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Crisp frenched chicken winglets seasoned with authentic spices, served hot with mint sauce.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvs-10",
    name: "Chicken Drumstick",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Deep-fried juicy chicken drumsticks marinated in rich southern spices.",
    isAvailable: true
  },
  {
    id: "nvs-11",
    name: "Chicken 555",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 279,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Crispy fried chicken strips tossed in a mildly tangy, spicy yogurt glaze with cashews.",
    isAvailable: true
  },
  {
    id: "nvs-12",
    name: "Loose Prawns",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 299,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Golden crisp prawns seasoned with salt, pepper, garlic and green chillies.",
    isAvailable: true
  },
  {
    id: "nvs-13",
    name: "Chilli Prawns",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 299,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Juicy prawns stir-fried with capsicum, onion and zesty chilli garlic seasoning.",
    isAvailable: true
  },
  {
    id: "nvs-14",
    name: "Apollo Fish",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 299,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Hyderabadi style tender boneless fish fillets spiced and tossed in curd and curry leaves.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvs-15",
    name: "Chilli Fish",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 299,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Battered fish nuggets wok-tossed with fresh peppers, onions and Chinese sauces.",
    isAvailable: true
  },
  {
    id: "nvs-16",
    name: "Chilli Mutton",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    price: 359,
    isVeg: false,
    imageUrl: "/images/chicken-starters.jpg",
    description: "Tender boneless mutton pieces sautéed with roasted spices and fresh green chillies.",
    isAvailable: true
  },

  // CATEGORY 2: VEG STARTERS (17 items)
  {
    id: "vs-01",
    name: "Veg Manchurian",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 199,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Handcrafted vegetable dumplings lightly crisped and coated in savoury Manchurian sauce.",
    isAvailable: true
  },
  {
    id: "vs-02",
    name: "Veg 65",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 199,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Crispy mixed vegetable bites tempered with aromatic mustard seeds, curd and curry leaves.",
    isAvailable: true
  },
  {
    id: "vs-03",
    name: "Chilli Mushroom",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Juicy button mushrooms fried crisp and tossed with bell peppers and green chillies.",
    isAvailable: true
  },
  {
    id: "vs-04",
    name: "Gobi Manchurian",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Golden cauliflower florets wok-tossed in a vibrant garlic, ginger and soy dressing.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "vs-05",
    name: "Gobi 65",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Spicy and crisp cauliflower florets seasoned with curd, chilli powder and curry leaves.",
    isAvailable: true
  },
  {
    id: "vs-06",
    name: "Paneer Manchurian",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Fresh cottage cheese cubes fried and glazed in rich sweet-and-sour Manchurian sauce.",
    isAvailable: true
  },
  {
    id: "vs-07",
    name: "Chilli Paneer",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Soft paneer cubes stir-fried with diced bell peppers, onions and aromatic green chillies.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "vs-08",
    name: "Paneer Majestic",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Strip-cut cottage cheese sautéed in a delicate spiced mint and yoghurt marinade.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "vs-09",
    name: "Dragon Paneer",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Crispy paneer fingers in a fiery red chilli sauce topped with crunchy roasted cashews.",
    isAvailable: true
  },
  {
    id: "vs-10",
    name: "Kaju Fry",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 269,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Whole premium cashews roasted golden in pure ghee with aromatic Telangana spices.",
    isAvailable: true
  },
  {
    id: "vs-11",
    name: "Honey Chilli Potato",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Crispy potato wedges tossed with honey, chilli flakes, sesame seeds and spring onion.",
    isAvailable: true
  },
  {
    id: "vs-12",
    name: "Vegetable Majestic",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 239,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Assorted vegetables cooked in traditional spices, green chillies and fresh mint leaves.",
    isAvailable: true
  },
  {
    id: "vs-13",
    name: "Paneer 65",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Tender cottage cheese coated with house spices and deep fried with curry leaf seasoning.",
    isAvailable: true
  },
  {
    id: "vs-14",
    name: "Jeera Aloo",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Tender potato chunks tempered with roasted cumin seeds, turmeric and fresh coriander.",
    isAvailable: true
  },
  {
    id: "vs-15",
    name: "Aloo 65",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Crisp potato cubes spiced southern style with red chilli paste and aromatics.",
    isAvailable: true
  },
  {
    id: "vs-16",
    name: "French Fries",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Crispy golden potato fingers lightly salted, served with tangy tomato ketchup.",
    isAvailable: true
  },
  {
    id: "vs-17",
    name: "Chilli Gobi",
    category: "veg-starters",
    categoryName: "Veg Starters",
    price: 249,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Crispy cauliflower florets stir-fried with hot chillies and sliced peppers.",
    isAvailable: true
  },

  // CATEGORY 3: NON-VEG BIRYANIS (17 items)
  {
    id: "nvb-01",
    name: "Chicken Dum Single Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 189,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Single portion slow-dum cooked fragrant basmati rice layered with spiced chicken, served with raita and salan.",
    isAvailable: true
  },
  {
    id: "nvb-02",
    name: "Chicken Dum Full Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 279,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Signature full portion Hyderabadi dum biryani with two tender marinated chicken pieces and boiled egg.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvb-03",
    name: "Chicken Dum Family Pack Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 699,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Generous family pack feast for 3 to 4 people, loaded with succulent chicken, boiled eggs, gravy and raita.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvb-04",
    name: "Chicken Fried Family Pack Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 699,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Family portion biryani topped with crispy spicy chicken fry pieces, perfect for family dinners.",
    isAvailable: true
  },
  {
    id: "nvb-05",
    name: "Special Chicken Family Pack Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 699,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Chef's special boneless chicken preparation paired with extra long basmati dum rice.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvb-06",
    name: "Special Chicken Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 299,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Aromatic basmati rice topped with chef's specialty tender boneless spiced chicken roast.",
    isAvailable: true
  },
  {
    id: "nvb-07",
    name: "Chicken Fried Biryani Bone",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 299,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Flavourful biryani rice served with bone-in chicken fried to perfection in house spices.",
    isAvailable: true
  },
  {
    id: "nvb-08",
    name: "Chicken Fried Biryani Boneless",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 299,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Tender boneless chicken fry seasoned with spices, served atop fragrant dum rice.",
    isAvailable: true
  },
  {
    id: "nvb-09",
    name: "Mutton Dum Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 359,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Traditional kacchi mutton dum biryani slow-cooked with tender meat, saffron and whole spices.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "nvb-10",
    name: "Mutton Fried Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 379,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Succulent mutton fry seasoned with black pepper and spices served on aromatic biryani rice.",
    isAvailable: true
  },
  {
    id: "nvb-11",
    name: "Mutton Dum Family Pack Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 859,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Grand family feast of classic mutton dum biryani with multiple mutton pieces, boiled eggs and salan.",
    isAvailable: true
  },
  {
    id: "nvb-12",
    name: "Mutton Fried Family Pack Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 879,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Family portion of aromatic biryani rice accompanied by a generous serving of spicy mutton fry.",
    isAvailable: true
  },
  {
    id: "nvb-13",
    name: "Fish Fried Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 339,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Tender fish fillets spiced, pan-fried and layered over delicate spiced biryani rice.",
    isAvailable: true
  },
  {
    id: "nvb-14",
    name: "Prawns Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 339,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Fresh coastal prawns sautéed with spices and steam-infused into aromatic long-grain rice.",
    isAvailable: true
  },
  {
    id: "nvb-15",
    name: "Egg Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 199,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Golden fried boiled eggs served with aromatic spiced dum biryani rice, gravy and raita.",
    isAvailable: true
  },
  {
    id: "nvb-16",
    name: "Egg Family Pack Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 499,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Large family portion of egg biryani served with spiced eggs, ample raita and salan.",
    isAvailable: true
  },
  {
    id: "nvb-17",
    name: "Chicken Lollipop Biryani",
    category: "non-veg-biryanis",
    categoryName: "Non-Veg Biryanis",
    price: 329,
    isVeg: false,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Amoga's signature fusion: crispy seasoned chicken lollipops served over flavour-packed dum rice.",
    isAvailable: true,
    isFeatured: true
  },

  // CATEGORY 4: VEG BIRYANIS (6 items)
  {
    id: "vb-01",
    name: "Veg Dum Biryani",
    category: "veg-biryanis",
    categoryName: "Veg Biryanis",
    price: 229,
    isVeg: true,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Slow-dum cooked basmati rice with farm-fresh vegetables, saffron, mint and authentic biryani masala.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "vb-02",
    name: "Veg Dum Family Pack Biryani",
    category: "veg-biryanis",
    categoryName: "Veg Biryanis",
    price: 579,
    isVeg: true,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Family portion of fragrant vegetarian dum biryani, loaded with fresh garden vegetables and paneer.",
    isAvailable: true
  },
  {
    id: "vb-03",
    name: "Kaju Fried Biryani",
    category: "veg-biryanis",
    categoryName: "Veg Biryanis",
    price: 229,
    isVeg: true,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Rich biryani rice topped with roasted golden cashew nuts tossed in pure ghee and spices.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "vb-04",
    name: "Mushroom Fried Biryani",
    category: "veg-biryanis",
    categoryName: "Veg Biryanis",
    price: 229,
    isVeg: true,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Sautéed button mushrooms seasoned with aromatic spices layered over fragrant rice.",
    isAvailable: true
  },
  {
    id: "vb-05",
    name: "Veg Fried Biryani",
    category: "veg-biryanis",
    categoryName: "Veg Biryanis",
    price: 229,
    isVeg: true,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Spiced crispy mixed vegetables stir-fried and tossed with seasoned basmati rice.",
    isAvailable: true
  },
  {
    id: "vb-06",
    name: "Paneer Fried Biryani",
    category: "veg-biryanis",
    categoryName: "Veg Biryanis",
    price: 229,
    isVeg: true,
    imageUrl: "/images/hero-biryani.jpg",
    description: "Golden fried soft cottage cheese cubes with herbs and spices served over flavourful rice.",
    isAvailable: true,
    isFeatured: true
  },

  // CATEGORY 5: VEG RICE ITEMS (6 items)
  {
    id: "vr-01",
    name: "Veg Fried Rice",
    category: "veg-rice",
    categoryName: "Veg Rice Items",
    price: 219,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Wok-tossed basmati rice with finely shredded carrots, cabbage, beans and spring onions.",
    isAvailable: true
  },
  {
    id: "vr-02",
    name: "Veg Schezwan Fried Rice",
    category: "veg-rice",
    categoryName: "Veg Rice Items",
    price: 219,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Fiery wok-tossed fried rice infused with spicy homemade Schezwan sauce and fresh veggies.",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "vr-03",
    name: "Jeera Rice",
    category: "veg-rice",
    categoryName: "Veg Rice Items",
    price: 219,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Aromatic basmati rice tempered with roasted cumin seeds, ghee and fresh coriander.",
    isAvailable: true
  },
  {
    id: "vr-04",
    name: "Paneer Fried Rice",
    category: "veg-rice",
    categoryName: "Veg Rice Items",
    price: 219,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Fragrant rice tossed with tender paneer cubes, crunchy peppers and light seasoning.",
    isAvailable: true
  },
  {
    id: "vr-05",
    name: "Singapore Fried Rice",
    category: "veg-rice",
    categoryName: "Veg Rice Items",
    price: 219,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Vibrant yellow-spiced fried rice tossed with shredded vegetables and curry aromatics.",
    isAvailable: true
  },
  {
    id: "vr-06",
    name: "Kaju Fried Rice",
    category: "veg-rice",
    categoryName: "Veg Rice Items",
    price: 219,
    isVeg: true,
    imageUrl: "/images/paneer-starters.jpg",
    description: "Premium fried rice enriched with generous roasted whole cashew nuts in pure ghee.",
    isAvailable: true,
    isFeatured: true
  }
];

export const DEFAULT_OFFERS: Offer[] = [
  {
    id: "off-01",
    title: "Family Biryani Combo Feast",
    description: "Order any Family Pack Biryani and get a complimentary Starter coupon for your next visit!",
    code: "AMOGAFAMILY",
    discountPercent: 10,
    validTill: "2026-12-31",
    isActive: true
  },
  {
    id: "off-02",
    title: "Weekend Biryani Celebration",
    description: "Special celebratory discount on all takeaway pre-orders placed directly on WhatsApp.",
    code: "WEEKENDSPL",
    discountPercent: 15,
    validTill: "2026-12-31",
    isActive: true
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Hyderabadi Dum Biryani",
    category: "biryani",
    categoryName: "Biryani",
    imageUrl: "/images/hero-biryani.jpg",
    caption: "Aromatic slow-cooked basmati rice layered with rich spices and tender chicken."
  },
  {
    id: "gal-02",
    title: "Crispy Chicken 65",
    category: "non-veg-starters",
    categoryName: "Non-Veg Starters",
    imageUrl: "/images/chicken-starters.jpg",
    caption: "Hot sizzling South Indian chicken starter tempered with fresh curry leaves."
  },
  {
    id: "gal-03",
    title: "Paneer & Veg Delights",
    category: "veg-starters",
    categoryName: "Veg Starters",
    imageUrl: "/images/paneer-starters.jpg",
    caption: "Handcrafted paneer cubes tossed in house seasonings and crisp vegetables."
  },
  {
    id: "gal-04",
    title: "Warm Family Dining Area",
    category: "restaurant-interior",
    categoryName: "Restaurant Interior",
    imageUrl: "/images/restaurant-interior.jpg",
    caption: "Spacious, comfortable seating designed for happy family gatherings in Khammam."
  },
  {
    id: "gal-05",
    title: "Amoga Hospitality & Exterior",
    category: "restaurant-exterior",
    categoryName: "Restaurant Exterior",
    imageUrl: "/images/restaurant-interior.jpg",
    caption: "Conveniently located at Mayuri Center, Balaji Nagar with easy parking & pickup."
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-01",
    customerName: "Srinivas Rao",
    rating: 5,
    comment: "The Chicken Dum Family Pack was outstanding! Homely taste, generous portions, and the chicken was cooked to absolute perfection. Best biryani spot in Khammam.",
    source: "google",
    isApproved: true,
    createdAt: "2026-10-15"
  },
  {
    id: "rev-02",
    customerName: "Kavitha Reddy",
    rating: 5,
    comment: "We visited with family on a Sunday evening. Ambience is peaceful, staff is very respectful and attentive. Starters like Chicken 65 and Paneer Majestic are top notch.",
    source: "google",
    isApproved: true,
    createdAt: "2026-10-22"
  },
  {
    id: "rev-03",
    customerName: "Rajesh Kumar",
    rating: 4,
    comment: "Pre-ordered on WhatsApp for pickup. The food was hot, neatly packed, and ready right on time. Highly recommended for family celebrations at reasonable prices.",
    source: "google",
    isApproved: true,
    createdAt: "2026-11-01"
  }
];

