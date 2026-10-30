/**
 * Centralized Image Assets Configuration
 * All authentic Marwadi University photographs, logos, categories, and placeholders.
 */

export const imageAssets = {
  college: {
    mainBuilding: '/images/college/marwadi-main-building.jpg',
    pgBuilding: '/images/college/marwadi-pg-building.jpg',
    library: '/images/college/marwadi-library.jpg',
    auditorium: '/images/college/marwadi-auditorium.jpg',
    amphitheatre: '/images/college/marwadi-amphitheatre.jpg',
    cafeteria: '/images/college/marwadi-cafeteria.jpg',
    advanceLab: '/images/college/marwadi-advance-lab.jpg',
  },
  logo: {
    campusFind: '/images/logo/campusfind-logo.svg',
    marwadiUniversity: '/images/logo/marwadi-university-logo.svg',
    marwadiUniversityPng: '/images/logo/marwadi-university-logo.png',
  },
  categories: {
    electronics: '/images/categories/electronics.svg',
    idCards: '/images/categories/id-cards.svg',
    booksStationery: '/images/categories/books-stationery.svg',
    bagsWallets: '/images/categories/bags-wallets.svg',
    keysAccess: '/images/categories/keys-access.svg',
    personalItems: '/images/categories/personal-items.svg',
  },
  placeholders: {
    item: '/images/placeholders/item-placeholder.svg',
    upload: '/images/placeholders/upload-placeholder.svg',
  },
};

export const campusShowcase = [
  {
    id: 'main-building',
    title: 'Main Academic Complex',
    description: 'The iconic central academic tower and lecture halls where faculty offices and primary class sessions take place.',
    location: 'Main Academic Wing, Floors 1–6',
    image: imageAssets.college.mainBuilding,
    badge: 'Central Landmark',
  },
  {
    id: 'central-library',
    title: 'University Central Library',
    description: 'Multi-level repository of research resources, study cubicles, reference desks, and quiet digital labs.',
    location: 'Knowledge Center, Block B',
    image: imageAssets.college.library,
    badge: 'High Activity Area',
  },
  {
    id: 'pg-building',
    title: 'PG & Research Building',
    description: 'Advanced laboratories, postgraduate lecture auditoriums, seminar halls, and project consultation spaces.',
    location: 'East Wing Campus Extension',
    image: imageAssets.college.pgBuilding,
    badge: 'Research Hub',
  },
  {
    id: 'amphitheatre',
    title: 'Open Air Amphitheatre',
    description: 'Vibrant outdoor stage hosting student symposiums, club gatherings, cultural evenings, and assembly sessions.',
    location: 'Central Plaza Quad',
    image: imageAssets.college.amphitheatre,
    badge: 'Student Activity Zone',
  },
  {
    id: 'auditorium',
    title: 'University Grand Auditorium',
    description: 'Acoustically engineered auditorium venue for international convocations, masterclasses, and college fests.',
    location: 'Cultural Arts Center',
    image: imageAssets.college.auditorium,
    badge: 'Events Arena',
  },
  {
    id: 'cafeteria',
    title: 'Student Food Court & Cafeteria',
    description: 'Spacious dining facility, grab-and-go kiosks, and casual socialization lounge for students across departments.',
    location: 'Student Amenities Block',
    image: imageAssets.college.cafeteria,
    badge: 'Daily Hub',
  },
];

export const itemCategories = [
  {
    id: 'electronics',
    name: 'Electronics & Gadgets',
    description: 'Laptops, mobile phones, headphones, power banks, calculators',
    icon: imageAssets.categories.electronics,
    count: '34 reported',
  },
  {
    id: 'idCards',
    name: 'IDs & Campus Cards',
    description: 'University ID badges, library cards, driving licenses, RFID tags',
    icon: imageAssets.categories.idCards,
    count: '51 reported',
  },
  {
    id: 'booksStationery',
    name: 'Books & Course Materials',
    description: 'Textbooks, lab manuals, spirals, scientific notebooks, pouches',
    icon: imageAssets.categories.booksStationery,
    count: '19 reported',
  },
  {
    id: 'bagsWallets',
    name: 'Bags & Wallets',
    description: 'Backpacks, laptop sleeves, gym duffels, money wallets, clutches',
    icon: imageAssets.categories.bagsWallets,
    count: '28 reported',
  },
  {
    id: 'keysAccess',
    name: 'Keys & Access Tokens',
    description: 'Hostel room keys, two-wheeler keys, locker tokens, keychains',
    icon: imageAssets.categories.keysAccess,
    count: '16 reported',
  },
  {
    id: 'personalItems',
    name: 'Personal Belongings',
    description: 'Bottles, watches, eyeglasses, jackets, umbrella, sports gear',
    icon: imageAssets.categories.personalItems,
    count: '22 reported',
  },
];

export const locationSuggestions = [
  'MB Building',
  'Academic Block',
  'Classroom',
  'Library',
  'Hostel',
  'Cafeteria',
  'Sports Ground',
  'Parking Area',
  'Other',
];

export const campusLocations = [
  'MB Building',
  'Academic Block',
  'Classroom',
  'Library',
  'Hostel',
  'Cafeteria',
  'Sports Ground',
  'Parking Area',
  'Other',
  'Main Academic Complex - Ground Floor',
  'Main Academic Complex - 1st to 3rd Floor Classrooms',
  'Main Academic Complex - 4th to 6th Floor Labs',
  'Central Library & Digital Reading Hall',
  'PG & Research Building (Block E)',
  'Engineering Labs & Workshops',
  'Student Cafeteria & Food Court',
  'Central Auditorium Lobby',
  'Open Air Amphitheatre & Plaza',
  'Hostel Zone - Boys Blocks (A, B, C)',
  'Hostel Zone - Girls Blocks (D, E)',
  'Sports Complex & Football Ground',
  'Campus Main Gate & Security Checkpoint',
  'University Bus Terminal & Parking Lot',
  'Other / Outdoor Walkway',
];

export default imageAssets;
