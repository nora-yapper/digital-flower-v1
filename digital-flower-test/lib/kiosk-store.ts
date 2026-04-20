// Kiosk state management types and data
import { create } from 'zustand'

export type Language = 'en' | 'hr'

export type Screen =
  | 'welcome'
  | 'mode-selection'
  // Guided mode screens
  | 'recipient'
  | 'occasion'
  | 'recommendations'
  | 'bouquet-details'
  // Customization screens (from guided or freestyle)
  | 'customization'
  | 'customization-main-flowers'
  | 'customization-filler-flowers'
  | 'customization-greenery'
  | 'customization-wrapping'
  | 'customization-note'
  // Freestyle mode
  | 'freestyle'
  // Cart & checkout
  | 'cart'
  | 'payment'
  | 'payment-card'
  | 'payment-cash'
  | 'confirmation'

export type Recipient = 'lover' | 'friend' | 'family' | 'deceased'
export type Occasion = 'valentine' | 'anniversary' | 'platonic' | 'sacrament'

export interface Flower {
  id: string
  name: string
  image: string
}

export interface Greenery {
  id: string
  name: string
  image: string
}

export interface Wrapping {
  id: string
  name: string
  image: string
  premium: boolean
  price: number
}

export interface Bouquet {
  id: string
  name: string
  description: string
  color: string
  image: string
  priceIndicator: '$' | '$$' | '$$$'
  basePrice: number
  recipients: Recipient[]
  occasions: Occasion[]
}

export interface BouquetCustomization {
  mainFlower: Flower | null
  mainFlowerCount: 3 | 5 | 7
  fillerFlower: Flower | null
  fillerFlowerCount: 3 | 5 | 7
  greenery: Greenery[]
  wrapping: Wrapping | null
  noteMessage: string
  noteFrom: string
  noteCardStyle: 'classic' | 'modern' | 'romantic'
}

export interface CartItem {
  id: string
  bouquet: Bouquet
  customization: BouquetCustomization
  quantity: number
  totalPrice: number
}

// Sample data
export const mainFlowers: Flower[] = [
  { id: 'rose', name: 'Rose', image: '/placeholder.svg?height=120&width=120' },
  { id: 'tulip', name: 'Tulip', image: '/placeholder.svg?height=120&width=120' },
  { id: 'lily', name: 'Lily', image: '/placeholder.svg?height=120&width=120' },
  { id: 'orchid', name: 'Orchid', image: '/placeholder.svg?height=120&width=120' },
  { id: 'peony', name: 'Peony', image: '/placeholder.svg?height=120&width=120' },
  { id: 'carnation', name: 'Carnation', image: '/placeholder.svg?height=120&width=120' },
]

export const fillerFlowers: Flower[] = [
  { id: 'babys-breath', name: "Baby's Breath", image: '/placeholder.svg?height=120&width=120' },
  { id: 'waxflower', name: 'Waxflower', image: '/placeholder.svg?height=120&width=120' },
  { id: 'statice', name: 'Statice', image: '/placeholder.svg?height=120&width=120' },
  { id: 'aster', name: 'Aster', image: '/placeholder.svg?height=120&width=120' },
  { id: 'veronica', name: 'Veronica', image: '/placeholder.svg?height=120&width=120' },
  { id: 'caspia', name: 'Caspia', image: '/placeholder.svg?height=120&width=120' },
]

export const greeneryOptions: Greenery[] = [
  { id: 'eucalyptus', name: 'Eucalyptus', image: '/placeholder.svg?height=120&width=120' },
  { id: 'ruscus', name: 'Ruscus', image: '/placeholder.svg?height=120&width=120' },
  { id: 'myrtle', name: 'Myrtle', image: '/placeholder.svg?height=120&width=120' },
  { id: 'ivy', name: 'Ivy', image: '/placeholder.svg?height=120&width=120' },
  { id: 'fern', name: 'Fern', image: '/placeholder.svg?height=120&width=120' },
  { id: 'pittosporum', name: 'Pittosporum', image: '/placeholder.svg?height=120&width=120' },
]

export const wrappingOptions: Wrapping[] = [
  { id: 'kraft', name: 'Kraft Paper', image: '/placeholder.svg?height=120&width=120', premium: false, price: 0 },
  { id: 'white', name: 'White', image: '/placeholder.svg?height=120&width=120', premium: false, price: 0 },
  { id: 'black', name: 'Black', image: '/placeholder.svg?height=120&width=120', premium: false, price: 0 },
  { id: 'pink-pastel', name: 'Pink Pastel', image: '/placeholder.svg?height=120&width=120', premium: true, price: 3 },
  { id: 'red', name: 'Red', image: '/placeholder.svg?height=120&width=120', premium: true, price: 3 },
]

export const sampleBouquets: Bouquet[] = [
  // Valentine's / Anniversary bouquets for lovers (Rose, Tulip, Lily, Orchid, Peony, Carnation)
  { id: 'red-rose-classic', name: 'Red Rose Classic', description: 'Red roses with baby\'s breath, eucalyptus & ruscus in red wrap', color: 'Deep Red', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 35, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'romantic-blush', name: 'Romantic Blush', description: 'Pink roses with waxflower, eucalyptus & myrtle in pink pastel wrap', color: 'Blush Pink', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 28, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'passion-bouquet', name: 'Passion Bouquet', description: 'Luxurious peonies with statice, ivy & fern in red wrap', color: 'Red & Pink', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$$', basePrice: 55, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'eternal-love', name: 'Eternal Love', description: 'White roses with caspia, eucalyptus & pittosporum in white wrap', color: 'Pure White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 40, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'heart-aflutter', name: 'Heart Aflutter', description: 'Colorful tulips with aster, ruscus & fern in pink pastel wrap', color: 'Mixed Pastels', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 25, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'velvet-dreams', name: 'Velvet Dreams', description: 'Deep burgundy peonies with veronica, eucalyptus & ivy in black wrap', color: 'Burgundy', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$$', basePrice: 60, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'sunset-romance', name: 'Sunset Romance', description: 'Coral roses with waxflower, myrtle & pittosporum in kraft wrap', color: 'Coral Sunset', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 38, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'moonlight-serenade', name: 'Moonlight Serenade', description: 'White lilies with baby\'s breath, eucalyptus & ruscus in white wrap', color: 'White & Green', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$$', basePrice: 52, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'first-kiss', name: 'First Kiss', description: 'Pink carnations with statice, myrtle & fern in pink pastel wrap', color: 'Soft Pink', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 42, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  
  // Friend celebration bouquets
  { id: 'sunshine-mix', name: 'Sunshine Mix', description: 'Bright tulips with aster, eucalyptus & ivy in kraft wrap', color: 'Yellow & Orange', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 25, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'happy-days', name: 'Happy Days', description: 'Cheerful carnations with waxflower, ruscus & fern in kraft wrap', color: 'Rainbow', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 22, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'garden-party', name: 'Garden Party', description: 'Mixed roses with caspia, eucalyptus & myrtle in white wrap', color: 'Mixed Colors', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 32, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'cheerful-tulips', name: 'Cheerful Tulips', description: 'Bright tulips with veronica, ivy & pittosporum in kraft wrap', color: 'Mixed Brights', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 24, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'spring-delight', name: 'Spring Delight', description: 'Pastel lilies with baby\'s breath, ruscus & fern in white wrap', color: 'Pastels', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 30, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'vibrant-wishes', name: 'Vibrant Wishes', description: 'Colorful carnations with statice, eucalyptus & myrtle in kraft wrap', color: 'Purple & Yellow', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 26, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'tropical-vibes', name: 'Tropical Vibes', description: 'Exotic orchids with waxflower, ivy & pittosporum in black wrap', color: 'Tropical Mix', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$$', basePrice: 48, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'sweet-memories', name: 'Sweet Memories', description: 'Soft carnations with aster, ruscus & fern in pink pastel wrap', color: 'Soft Mix', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 20, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'best-friends', name: 'Best Friends', description: 'Yellow roses with caspia, eucalyptus & myrtle in kraft wrap', color: 'Golden Yellow', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 35, recipients: ['friend'], occasions: ['platonic'] },
  
  // Family bouquets
  { id: 'family-love', name: 'Family Love', description: 'Warm roses with baby\'s breath, eucalyptus & ivy in kraft wrap', color: 'Warm Tones', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 35, recipients: ['family'], occasions: ['platonic', 'sacrament'] },
  { id: 'mothers-embrace', name: "Mother's Embrace", description: 'Pink roses with waxflower, ruscus & myrtle in pink pastel wrap', color: 'Pink & White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 38, recipients: ['family'], occasions: ['platonic'] },
  { id: 'gentle-grace', name: 'Gentle Grace', description: 'Elegant lilies with statice, eucalyptus & fern in white wrap', color: 'White & Green', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 36, recipients: ['family'], occasions: ['platonic', 'sacrament'] },
  { id: 'home-blessings', name: 'Home Blessings', description: 'Mixed tulips with aster, ivy & pittosporum in kraft wrap', color: 'Seasonal Mix', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 28, recipients: ['family'], occasions: ['platonic'] },
  { id: 'grandmas-garden', name: "Grandma's Garden", description: 'Cottage carnations with veronica, ruscus & myrtle in kraft wrap', color: 'Cottage Mix', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 26, recipients: ['family'], occasions: ['platonic'] },
  { id: 'fathers-pride', name: "Father's Pride", description: 'Bold orchids with caspia, eucalyptus & fern in black wrap', color: 'Deep Tones', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 34, recipients: ['family'], occasions: ['platonic'] },
  { id: 'sacred-blessing', name: 'Sacred Blessing', description: 'White lilies with baby\'s breath, ruscus & ivy in white wrap', color: 'Pure White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 40, recipients: ['family'], occasions: ['sacrament'] },
  { id: 'holy-communion', name: 'Holy Communion', description: 'White roses with waxflower, eucalyptus & myrtle in white wrap', color: 'White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$$', basePrice: 50, recipients: ['family'], occasions: ['sacrament'] },
  { id: 'confirmation-joy', name: 'Confirmation Joy', description: 'White lilies with statice, ruscus & pittosporum in white wrap', color: 'White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 42, recipients: ['family'], occasions: ['sacrament'] },
  
  // Memorial bouquets
  { id: 'peaceful-rest', name: 'Peaceful Rest', description: 'Serene white lilies with baby\'s breath, eucalyptus & fern in white wrap', color: 'White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 38, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'eternal-memory', name: 'Eternal Memory', description: 'White roses with caspia, ruscus & ivy in white wrap', color: 'White & Green', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 40, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'heavenly-peace', name: 'Heavenly Peace', description: 'Pure white roses with waxflower, eucalyptus & myrtle in white wrap', color: 'Pure White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$$', basePrice: 55, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'tender-goodbye', name: 'Tender Goodbye', description: 'Soft carnations with aster, ruscus & fern in white wrap', color: 'Soft Pastels', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 30, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'sacred-tribute', name: 'Sacred Tribute', description: 'White lilies with veronica, eucalyptus & pittosporum in white wrap', color: 'White & Green', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 42, recipients: ['deceased'], occasions: ['sacrament'] },
  { id: 'in-loving-memory', name: 'In Loving Memory', description: 'White carnations with statice, ivy & myrtle in white wrap', color: 'White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$', basePrice: 28, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'angels-wings', name: "Angel's Wings", description: 'White orchids with baby\'s breath, ruscus & fern in white wrap', color: 'White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 45, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'serenity', name: 'Serenity', description: 'Peaceful peonies with waxflower, eucalyptus & ivy in white wrap', color: 'Soft White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$', basePrice: 38, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'final-farewell', name: 'Final Farewell', description: 'Elegant lilies with caspia, ruscus & pittosporum in white wrap', color: 'White', image: '/placeholder.svg?height=300&width=300', priceIndicator: '$$$', basePrice: 65, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
]

export const translations = {
  en: {
    welcome: {
      title: 'Welcome to the Flower Shop',
      subtitle: 'Design your own bouquet or discover a selection of fresh, beautiful flowers.',
      tagline: 'Let your creativity bloom.',
    },
    modeSelection: {
      title: 'Choose Your Experience',
      guided: {
        title: 'Guided Mode',
        description: 'Get step-by-step help choosing the perfect bouquet for your occasion.',
        recommended: 'Recommended',
      },
      freestyle: {
        title: 'Freestyle Mode',
        description: 'Build a bouquet from scratch by selecting flowers yourself.',
      },
    },
    navigation: {
      back: 'Back',
      home: 'Home',
      cancel: 'Cancel',
      confirm: 'Confirm',
      next: 'Next',
      save: 'Save',
      addToCart: 'Add to Cart',
      viewCart: 'View Cart',
    },
    dialogs: {
      resetTitle: 'Start Over?',
      resetMessage: 'Are you sure you want to abandon your current bouquet?',
      stillThere: 'Are you still there?',
      stillThereMessage: 'Tap anywhere to continue',
    },
    recipients: {
      title: 'Who is the bouquet for?',
      lover: 'Lover',
      friend: 'Friend',
      family: 'Family',
      deceased: 'Deceased Person',
    },
    occasions: {
      title: 'What is the occasion?',
      valentine: "Valentine's",
      anniversary: 'Anniversary',
      platonic: 'Platonic Celebration',
      sacrament: 'Sacrament',
    },
    recommendations: {
      title: 'Perfect Bouquets for You',
      subtitle: 'Select a bouquet that speaks to your heart',
    },
    details: {
      customize: 'Customize',
      chooseDifferent: 'Choose Different Bouquet',
      color: 'Color',
      message: 'Add a Personal Message',
      messagePlaceholder: 'Write your message here...',
      from: 'From',
      fromPlaceholder: 'Name or initials',
    },
    customization: {
      title: 'Customize Your Bouquet',
      mainFlowers: 'Main Flowers',
      mainFlowersDesc: 'Main flowers are the most prominent flowers in the bouquet.',
      fillerFlowers: 'Filler Flowers',
      greenery: 'Greenery',
      greeneryDesc: 'Select up to 3 types of greenery.',
      wrapping: 'Wrapping',
      note: 'Note',
      details: 'Details',
      saveChanges: 'Save Changes',
      startOver: 'Start Over',
      count: 'Quantity',
      preview: 'Preview',
    },
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      addAnother: 'Add Another Bouquet',
      checkout: 'Proceed to Payment',
      cancelOrder: 'Cancel Order',
      remove: 'Remove',
    },
    payment: {
      title: 'Payment',
      orderSummary: 'Order Summary',
      total: 'Total',
      paymentMethod: 'Choose Payment Method',
      card: 'Card',
      cash: 'Cash on Pickup',
      cardInstructions: 'Follow the instructions on the POS machine.',
      cashName: 'Your Name',
      cashPhone: 'Phone Number',
      placeOrder: 'Place Order',
    },
    confirmation: {
      title: 'Order Confirmed!',
      orderNumber: 'Order',
      message: 'Your order has been sent to the florist.',
      estimatedTime: 'Estimated preparation time:',
      timeRange: '15-30 minutes',
      contactMessage: 'You will be contacted when the bouquet is ready.',
      newOrder: 'Start New Order',
    },
  },
  hr: {
    welcome: {
      title: 'Dobrodosli u Cvjećarnicu',
      subtitle: 'Dizajnirajte vlastiti buket ili otkrijte izbor svježeg, prekrasnog cvijeća.',
      tagline: 'Neka vaša kreativnost procvjeta.',
    },
    modeSelection: {
      title: 'Odaberite Svoje Iskustvo',
      guided: {
        title: 'Vodeni Način',
        description: 'Dobijte pomoć korak po korak u odabiru savršenog buketa za vašu prigodu.',
        recommended: 'Preporučeno',
      },
      freestyle: {
        title: 'Slobodni Način',
        description: 'Napravite buket od nule sami birajući cvijeće.',
      },
    },
    navigation: {
      back: 'Natrag',
      home: 'Početna',
      cancel: 'Odustani',
      confirm: 'Potvrdi',
      next: 'Dalje',
      save: 'Spremi',
      addToCart: 'Dodaj u Košaricu',
      viewCart: 'Pogledaj Košaricu',
    },
    dialogs: {
      resetTitle: 'Početi Ispočetka?',
      resetMessage: 'Jeste li sigurni da želite napustiti trenutni buket?',
      stillThere: 'Jeste li još tu?',
      stillThereMessage: 'Dodirnite bilo gdje za nastavak',
    },
    recipients: {
      title: 'Za koga je buket?',
      lover: 'Partner/ica',
      friend: 'Prijatelj/ica',
      family: 'Obitelj',
      deceased: 'Pokojna Osoba',
    },
    occasions: {
      title: 'Koja je prigoda?',
      valentine: 'Valentinovo',
      anniversary: 'Godišnjica',
      platonic: 'Platonsko Slavlje',
      sacrament: 'Sakrament',
    },
    recommendations: {
      title: 'Savršeni Buketi za Vas',
      subtitle: 'Odaberite buket koji govori vašem srcu',
    },
    details: {
      customize: 'Prilagodi',
      chooseDifferent: 'Odaberi Drugi Buket',
      color: 'Boja',
      message: 'Dodajte Osobnu Poruku',
      messagePlaceholder: 'Napišite svoju poruku ovdje...',
      from: 'Od',
      fromPlaceholder: 'Ime ili inicijali',
    },
    customization: {
      title: 'Prilagodite Svoj Buket',
      mainFlowers: 'Glavno Cvijeće',
      mainFlowersDesc: 'Glavno cvijeće je najistaknutije cvijeće u buketu.',
      fillerFlowers: 'Dopunsko Cvijeće',
      greenery: 'Zelenilo',
      greeneryDesc: 'Odaberite do 3 vrste zelenila.',
      wrapping: 'Omot',
      note: 'Poruka',
      details: 'Detalji',
      saveChanges: 'Spremi Promjene',
      startOver: 'Počni Ispočetka',
      count: 'Količina',
      preview: 'Pregled',
    },
    cart: {
      title: 'Vaša Košarica',
      empty: 'Vaša košarica je prazna',
      total: 'Ukupno',
      addAnother: 'Dodaj Još Jedan Buket',
      checkout: 'Nastavi na Plaćanje',
      cancelOrder: 'Odustani od Narudžbe',
      remove: 'Ukloni',
    },
    payment: {
      title: 'Plaćanje',
      orderSummary: 'Sažetak Narudžbe',
      total: 'Ukupno',
      paymentMethod: 'Odaberite Način Plaćanja',
      card: 'Kartica',
      cash: 'Gotovina pri Preuzimanju',
      cardInstructions: 'Slijedite upute na POS uređaju.',
      cashName: 'Vaše Ime',
      cashPhone: 'Broj Telefona',
      placeOrder: 'Naruči',
    },
    confirmation: {
      title: 'Narudžba Potvrđena!',
      orderNumber: 'Narudžba',
      message: 'Vaša narudžba je poslana cvjećaru.',
      estimatedTime: 'Procijenjeno vrijeme pripreme:',
      timeRange: '15-30 minuta',
      contactMessage: 'Kontaktirat ćemo vas kada buket bude spreman.',
      newOrder: 'Nova Narudžba',
    },
  },
}

// Helper to calculate price
export function calculateBouquetPrice(customization: BouquetCustomization | null | undefined, basePrice: number): number {
  let price = basePrice

  if (!customization) return price

  // Main flower count adjustment
  if (customization.mainFlowerCount === 5) price += 5
  if (customization.mainFlowerCount === 7) price += 10

  // Filler flower
  if (customization.fillerFlower) price += 3

  // Greenery (+€2 per type)
  if (customization.greenery?.length) {
    price += customization.greenery.length * 2
  }

  // Wrapping
  if (customization.wrapping) price += customization.wrapping.price

  return price
}

// Helper to get valid occasions for a recipient
export function getValidOccasions(recipient: Recipient): Occasion[] {
  if (recipient === 'deceased') {
    return ['platonic', 'sacrament']
  }
  if (recipient === 'lover') {
    return ['valentine', 'anniversary', 'platonic']
  }
  return ['valentine', 'anniversary', 'platonic', 'sacrament']
}

// Helper to filter bouquets
export function filterBouquets(recipient: Recipient, occasion: Occasion): Bouquet[] {
  return sampleBouquets.filter(
    (b) => b.recipients.includes(recipient) && b.occasions.includes(occasion)
  ).slice(0, 9)
}

// Default customization
export const defaultCustomization: BouquetCustomization = {
  mainFlower: mainFlowers[0],
  mainFlowerCount: 3,
  fillerFlower: fillerFlowers[0],
  fillerFlowerCount: 3,
  greenery: [greeneryOptions[0]],
  wrapping: wrappingOptions[0],
  noteMessage: '',
  noteFrom: '',
  noteCardStyle: 'classic',
}

// Occasions for guided mode
export const OCCASIONS = [
  { id: 'romantic', label: 'Romantic' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'celebration', label: 'Celebration' },
  { id: 'thank-you', label: 'Thank You' },
  { id: 'sympathy', label: 'Sympathy' },
  { id: 'just-because', label: 'Just Because' },
]

// Styles for guided mode
export const STYLES = [
  { id: 'classic', label: 'Classic', description: 'Timeless elegance with traditional arrangements' },
  { id: 'modern', label: 'Modern', description: 'Clean lines and contemporary designs' },
  { id: 'rustic', label: 'Rustic', description: 'Natural and organic with earthy tones' },
  { id: 'romantic', label: 'Romantic', description: 'Soft, dreamy and full of sentiment' },
]

// Sizes for bouquets
export const SIZES = [
  { id: 'small', label: 'Small', description: '5-7 stems', price: 25 },
  { id: 'medium', label: 'Medium', description: '10-12 stems', price: 40 },
  { id: 'large', label: 'Large', description: '15-18 stems', price: 60 },
]

// Color palettes for guided mode
export const COLOR_PALETTES = [
  { id: 'warm', label: 'Warm Sunset', colors: ['#F97316', '#FBBF24', '#FEF3C7'] },
  { id: 'cool', label: 'Cool Breeze', colors: ['#3B82F6', '#A5B4FC', '#E0E7FF'] },
  { id: 'romantic', label: 'Romantic Pink', colors: ['#EC4899', '#F9A8D4', '#FDF2F8'] },
  { id: 'natural', label: 'Natural Greens', colors: ['#22C55E', '#86EFAC', '#F0FDF4'] },
  { id: 'elegant', label: 'Elegant Neutrals', colors: ['#78716C', '#D6D3D1', '#FAFAF9'] },
  { id: 'vibrant', label: 'Vibrant Mix', colors: ['#8B5CF6', '#EC4899', '#FBBF24'] },
]

// Flowers for custom builder
export const FLOWERS = [
  { id: 'rose', name: 'Rose', color: '#E11D48', pricePerStem: 3.50 },
  { id: 'tulip', name: 'Tulip', color: '#F97316', pricePerStem: 2.50 },
  { id: 'lily', name: 'Lily', color: '#FAFAF9', pricePerStem: 4.00 },
  { id: 'sunflower', name: 'Sunflower', color: '#FBBF24', pricePerStem: 3.00 },
  { id: 'peony', name: 'Peony', color: '#F9A8D4', pricePerStem: 5.00 },
  { id: 'carnation', name: 'Carnation', color: '#EC4899', pricePerStem: 2.00 },
  { id: 'gerbera', name: 'Gerbera', color: '#F43F5E', pricePerStem: 2.75 },
  { id: 'orchid', name: 'Orchid', color: '#A855F7', pricePerStem: 6.00 },
  { id: 'hydrangea', name: 'Hydrangea', color: '#3B82F6', pricePerStem: 4.50 },
]

// Add-ons for bouquets
export const ADDONS = [
  { id: 'card', name: 'Greeting Card', description: 'Personalized message card', price: 3.00 },
  { id: 'vase', name: 'Glass Vase', description: 'Elegant glass vase', price: 12.00 },
  { id: 'ribbon', name: 'Premium Ribbon', description: 'Satin ribbon wrap', price: 4.00 },
  { id: 'chocolate', name: 'Chocolates', description: 'Box of Belgian chocolates', price: 15.00 },
  { id: 'teddy', name: 'Teddy Bear', description: 'Plush teddy bear', price: 18.00 },
  { id: 'balloon', name: 'Balloon', description: 'Festive helium balloon', price: 5.00 },
]

// Sample bouquets for recommendations
export const BOUQUETS = [
  { id: 'classic-romance', name: 'Classic Romance', description: 'Red roses with baby\'s breath', style: 'romantic', occasions: ['romantic', 'anniversary'], flowers: ['Rose', 'Baby\'s Breath', 'Eucalyptus'] },
  { id: 'sunshine-delight', name: 'Sunshine Delight', description: 'Bright sunflowers and daisies', style: 'cheerful', occasions: ['birthday', 'celebration', 'thank-you', 'just-because'], flowers: ['Sunflower', 'Gerbera', 'Greenery'] },
  { id: 'elegant-whites', name: 'Elegant Whites', description: 'White lilies and roses', style: 'elegant', occasions: ['sympathy', 'romantic'], flowers: ['Lily', 'Rose', 'Fern'] },
  { id: 'spring-meadow', name: 'Spring Meadow', description: 'Mixed tulips in pastel colors', style: 'natural', occasions: ['birthday', 'thank-you', 'just-because'], flowers: ['Tulip', 'Ranunculus', 'Sweet Pea'] },
  { id: 'pink-blush', name: 'Pink Blush', description: 'Soft pink peonies and roses', style: 'romantic', occasions: ['romantic', 'birthday', 'celebration'], flowers: ['Peony', 'Rose', 'Dusty Miller'] },
  { id: 'garden-party', name: 'Garden Party', description: 'Mixed wildflowers arrangement', style: 'natural', occasions: ['celebration', 'thank-you', 'just-because'], flowers: ['Daisy', 'Lavender', 'Chamomile'] },
  { id: 'purple-dreams', name: 'Purple Dreams', description: 'Orchids and lavender blooms', style: 'elegant', occasions: ['romantic', 'thank-you'], flowers: ['Orchid', 'Lavender', 'Lisianthus'] },
  { id: 'peaceful-tribute', name: 'Peaceful Tribute', description: 'White chrysanthemums and lilies', style: 'elegant', occasions: ['sympathy'], flowers: ['Chrysanthemum', 'Lily', 'Palm'] },
  { id: 'tropical-paradise', name: 'Tropical Paradise', description: 'Exotic birds of paradise', style: 'cheerful', occasions: ['celebration', 'birthday', 'just-because'], flowers: ['Bird of Paradise', 'Anthurium', 'Monstera'] },
]

// Kiosk store state
interface KioskState {
  // Navigation
  screen: Screen
  language: Language
  mode: 'guided' | 'freestyle' | null
  
  // Guided flow selections
  recipient: Recipient | null
  occasion: Occasion | null
  selectedBouquet: Bouquet | null
  
  // Customization state
  customization: BouquetCustomization
  
  // Cart
  cart: CartItem[]
  
  // Order
  orderNumber: string | null
  paymentMethod: 'card' | 'cash' | null
  customerName: string
  customerPhone: string
  
  // Session timeout
  lastInteraction: number
  
  // Actions
  setScreen: (screen: Screen) => void
  setLanguage: (language: Language) => void
  setMode: (mode: 'guided' | 'freestyle' | null) => void
  setRecipient: (recipient: Recipient | null) => void
  setOccasion: (occasion: Occasion | null) => void
  setSelectedBouquet: (bouquet: Bouquet | null) => void
  updateCustomization: (updates: Partial<BouquetCustomization>) => void
  resetCustomization: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setPaymentMethod: (method: 'card' | 'cash' | null) => void
  setCustomerName: (name: string) => void
  setCustomerPhone: (phone: string) => void
  setOrderNumber: (orderNumber: string) => void
  resetSession: () => void
  updateInteraction: () => void
}

export const useKioskStore = create<KioskState>((set) => ({
  screen: 'welcome',
  language: 'en',
  mode: null,
  recipient: null,
  occasion: null,
  selectedBouquet: null,
  customization: { ...defaultCustomization },
  cart: [],
  orderNumber: null,
  paymentMethod: null,
  customerName: '',
  customerPhone: '',
  lastInteraction: Date.now(),

  setScreen: (screen) => set({ screen, lastInteraction: Date.now() }),
  setLanguage: (language) => set({ language, lastInteraction: Date.now() }),
  setMode: (mode) => set({ mode, lastInteraction: Date.now() }),
  setRecipient: (recipient) => set({ recipient, lastInteraction: Date.now() }),
  setOccasion: (occasion) => set({ occasion, lastInteraction: Date.now() }),
  setSelectedBouquet: (selectedBouquet) => set({ selectedBouquet, lastInteraction: Date.now() }),
  
  updateCustomization: (updates) => set((state) => ({ 
    customization: { ...state.customization, ...updates },
    lastInteraction: Date.now()
  })),
  
  resetCustomization: () => set({ 
    customization: { ...defaultCustomization },
    lastInteraction: Date.now()
  }),
  
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item],
    lastInteraction: Date.now()
  })),
  
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
    lastInteraction: Date.now()
  })),
  
  updateCartItemQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map((item) => 
      item.id === id ? { ...item, quantity } : item
    ),
    lastInteraction: Date.now()
  })),
  
  clearCart: () => set({ cart: [], lastInteraction: Date.now() }),
  
  setPaymentMethod: (paymentMethod) => set({ paymentMethod, lastInteraction: Date.now() }),
  setCustomerName: (customerName) => set({ customerName, lastInteraction: Date.now() }),
  setCustomerPhone: (customerPhone) => set({ customerPhone, lastInteraction: Date.now() }),
  setOrderNumber: (orderNumber) => set({ orderNumber }),
  
  resetSession: () => set({
    screen: 'welcome',
    mode: null,
    recipient: null,
    occasion: null,
    selectedBouquet: null,
    customization: { ...defaultCustomization },
    cart: [],
    orderNumber: null,
    paymentMethod: null,
    customerName: '',
    customerPhone: '',
    lastInteraction: Date.now(),
  }),
  
  updateInteraction: () => set({ lastInteraction: Date.now() }),
}))
