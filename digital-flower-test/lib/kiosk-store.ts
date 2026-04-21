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
  imageVariants?: Partial<Record<3 | 5 | 7, string>>
  priceIndicator: '$' | '$$' | '$$$'
  basePrice: number
  recipients: Recipient[]
  occasions: Occasion[]
}

export function getBouquetImage(bouquet: Bouquet, count?: 3 | 5 | 7): string {
  if (count && bouquet.imageVariants?.[count]) return bouquet.imageVariants[count]!
  return bouquet.image
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
  { id: 'rose', name: 'Rose', image: '/images/main-flowers/rose.png' },
  { id: 'tulip', name: 'Tulip', image: '/images/main-flowers/tulip.png' },
  { id: 'lily', name: 'Lily', image: '/images/main-flowers/lily.png' },
  { id: 'orchid', name: 'Orchid', image: '/images/main-flowers/orchid.png' },
  { id: 'peony', name: 'Peony', image: '/images/main-flowers/peony.png' },
  { id: 'carnation', name: 'Carnation', image: '/images/main-flowers/carnation.png' },
]

export const fillerFlowers: Flower[] = [
  { id: 'babys-breath', name: "Baby's Breath", image: '/images/filler-flowers/babys-breath.png' },
  { id: 'waxflower', name: 'Waxflower', image: '/images/filler-flowers/waxflower.png' },
  { id: 'statice', name: 'Statice', image: '/images/filler-flowers/statice.png' },
  { id: 'aster', name: 'Aster', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=120&h=120&fit=crop&auto=format' },
  { id: 'veronica', name: 'Veronica', image: 'https://images.unsplash.com/photo-1455598689817-c2c2f5bf6de6?w=120&h=120&fit=crop&auto=format' },
  { id: 'caspia', name: 'Caspia', image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc09?w=120&h=120&fit=crop&auto=format' },
]

export const greeneryOptions: Greenery[] = [
  { id: 'eucalyptus', name: 'Eucalyptus', image: '/images/greenery/eucalyptus.png' },
  { id: 'ruscus', name: 'Ruscus', image: '/images/greenery/ruscus.png' },
  { id: 'myrtle', name: 'Myrtle', image: '/images/greenery/myrtle.png' },
  { id: 'ivy', name: 'Ivy', image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=120&h=120&fit=crop&auto=format' },
  { id: 'fern', name: 'Fern', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=120&h=120&fit=crop&auto=format' },
  { id: 'pittosporum', name: 'Pittosporum', image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=120&h=120&fit=crop&auto=format' },
]

export const wrappingOptions: Wrapping[] = [
  { id: 'kraft', name: 'Kraft Paper', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=120&h=120&fit=crop&auto=format', premium: false, price: 0 },
  { id: 'white', name: 'White', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=120&h=120&fit=crop&auto=format', premium: false, price: 0 },
  { id: 'black', name: 'Black', image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=120&h=120&fit=crop&auto=format', premium: false, price: 0 },
  { id: 'pink-pastel', name: 'Pink Pastel', image: 'https://images.unsplash.com/photo-1548550506-b002d4d5f0f1?w=120&h=120&fit=crop&auto=format', premium: true, price: 3 },
  { id: 'red', name: 'Red', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=120&h=120&fit=crop&auto=format', premium: true, price: 3 },
]

export const sampleBouquets: Bouquet[] = [
  // Valentine's / Anniversary bouquets for lovers
  { id: 'red-rose-classic', name: 'Red Rose Classic', description: 'Red roses with baby\'s breath, eucalyptus & ruscus in red wrap', color: 'Deep Red', image: '/images/bouquets/red-rose-classic-3.png', imageVariants: { 3: '/images/bouquets/red-rose-classic-3.png', 5: '/images/bouquets/red-rose-classic-5.png', 7: '/images/bouquets/red-rose-classic-7.png' }, priceIndicator: '$$', basePrice: 35, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'romantic-blush', name: 'Romantic Blush', description: 'Pink roses with waxflower, eucalyptus & myrtle in pink pastel wrap', color: 'Blush Pink', image: '/images/bouquets/romantic-blush-3.png', imageVariants: { 3: '/images/bouquets/romantic-blush-3.png', 5: '/images/bouquets/romantic-blush-5.png', 7: '/images/bouquets/romantic-blush-7.png' }, priceIndicator: '$', basePrice: 28, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'passion-bouquet', name: 'Passion Bouquet', description: 'Luxurious peonies with statice, ivy & fern in red wrap', color: 'Red & Pink', image: '/images/bouquets/passion-bouquet.png', priceIndicator: '$$$', basePrice: 55, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'eternal-love', name: 'Eternal Love', description: 'White roses with caspia, eucalyptus & pittosporum in white wrap', color: 'Pure White', image: '/images/bouquets/eternal-love.png', priceIndicator: '$$', basePrice: 40, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'heart-aflutter', name: 'Heart Aflutter', description: 'Colorful tulips with aster, ruscus & fern in pink pastel wrap', color: 'Mixed Pastels', image: '/images/bouquets/heart-aflutter.png', priceIndicator: '$', basePrice: 25, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'velvet-dreams', name: 'Velvet Dreams', description: 'Deep burgundy peonies with veronica, eucalyptus & ivy in black wrap', color: 'Burgundy', image: '/images/bouquets/velvet-dreams.png', priceIndicator: '$$$', basePrice: 60, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'sunset-romance', name: 'Sunset Romance', description: 'Coral roses with waxflower, myrtle & pittosporum in kraft wrap', color: 'Coral Sunset', image: 'https://images.unsplash.com/photo-1499830847023-c550f97dc3e3?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 38, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'moonlight-serenade', name: 'Moonlight Serenade', description: 'White lilies with baby\'s breath, eucalyptus & ruscus in white wrap', color: 'White & Green', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$$', basePrice: 52, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },
  { id: 'first-kiss', name: 'First Kiss', description: 'Pink carnations with statice, myrtle & fern in pink pastel wrap', color: 'Soft Pink', image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 42, recipients: ['lover'], occasions: ['valentine', 'anniversary'] },

  // Friend celebration bouquets
  { id: 'sunshine-mix', name: 'Sunshine Mix', description: 'Bright tulips with aster, eucalyptus & ivy in kraft wrap', color: 'Yellow & Orange', image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc09?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 25, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'happy-days', name: 'Happy Days', description: 'Cheerful carnations with waxflower, ruscus & fern in kraft wrap', color: 'Rainbow', image: 'https://images.unsplash.com/photo-1499830847023-c550f97dc3e3?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 22, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'garden-party', name: 'Garden Party', description: 'Mixed roses with caspia, eucalyptus & myrtle in white wrap', color: 'Mixed Colors', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 32, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'cheerful-tulips', name: 'Cheerful Tulips', description: 'Bright tulips with veronica, ivy & pittosporum in kraft wrap', color: 'Mixed Brights', image: 'https://images.unsplash.com/photo-1520399580965-c77de30de4da?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 24, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'spring-delight', name: 'Spring Delight', description: 'Pastel lilies with baby\'s breath, ruscus & fern in white wrap', color: 'Pastels', image: 'https://images.unsplash.com/photo-1485196978736-1f926c24b7fb?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 30, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'vibrant-wishes', name: 'Vibrant Wishes', description: 'Colorful carnations with statice, eucalyptus & myrtle in kraft wrap', color: 'Purple & Yellow', image: 'https://images.unsplash.com/photo-1508197239992-914fe5a4a5d3?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 26, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'tropical-vibes', name: 'Tropical Vibes', description: 'Exotic orchids with waxflower, ivy & pittosporum in black wrap', color: 'Tropical Mix', image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$$', basePrice: 48, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'sweet-memories', name: 'Sweet Memories', description: 'Soft carnations with aster, ruscus & fern in pink pastel wrap', color: 'Soft Mix', image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 20, recipients: ['friend'], occasions: ['platonic'] },
  { id: 'best-friends', name: 'Best Friends', description: 'Yellow roses with caspia, eucalyptus & myrtle in kraft wrap', color: 'Golden Yellow', image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc09?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 35, recipients: ['friend'], occasions: ['platonic'] },

  // Family bouquets
  { id: 'family-love', name: 'Family Love', description: 'Warm roses with baby\'s breath, eucalyptus & ivy in kraft wrap', color: 'Warm Tones', image: 'https://images.unsplash.com/photo-1499830847023-c550f97dc3e3?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 35, recipients: ['family'], occasions: ['platonic', 'sacrament'] },
  { id: 'mothers-embrace', name: "Mother's Embrace", description: 'Pink roses with waxflower, ruscus & myrtle in pink pastel wrap', color: 'Pink & White', image: 'https://images.unsplash.com/photo-1485196978736-1f926c24b7fb?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 38, recipients: ['family'], occasions: ['platonic'] },
  { id: 'gentle-grace', name: 'Gentle Grace', description: 'Elegant lilies with statice, eucalyptus & fern in white wrap', color: 'White & Green', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 36, recipients: ['family'], occasions: ['platonic', 'sacrament'] },
  { id: 'home-blessings', name: 'Home Blessings', description: 'Mixed tulips with aster, ivy & pittosporum in kraft wrap', color: 'Seasonal Mix', image: 'https://images.unsplash.com/photo-1520399580965-c77de30de4da?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 28, recipients: ['family'], occasions: ['platonic'] },
  { id: 'grandmas-garden', name: "Grandma's Garden", description: 'Cottage carnations with veronica, ruscus & myrtle in kraft wrap', color: 'Cottage Mix', image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 26, recipients: ['family'], occasions: ['platonic'] },
  { id: 'fathers-pride', name: "Father's Pride", description: 'Bold orchids with caspia, eucalyptus & fern in black wrap', color: 'Deep Tones', image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 34, recipients: ['family'], occasions: ['platonic'] },
  { id: 'sacred-blessing', name: 'Sacred Blessing', description: 'White lilies with baby\'s breath, ruscus & ivy in white wrap', color: 'Pure White', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 40, recipients: ['family'], occasions: ['sacrament'] },
  { id: 'holy-communion', name: 'Holy Communion', description: 'White roses with waxflower, eucalyptus & myrtle in white wrap', color: 'White', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$$', basePrice: 50, recipients: ['family'], occasions: ['sacrament'] },
  { id: 'confirmation-joy', name: 'Confirmation Joy', description: 'White lilies with statice, ruscus & pittosporum in white wrap', color: 'White', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 42, recipients: ['family'], occasions: ['sacrament'] },

  // Memorial bouquets
  { id: 'peaceful-rest', name: 'Peaceful Rest', description: 'Serene white lilies with baby\'s breath, eucalyptus & fern in white wrap', color: 'White', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 38, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'eternal-memory', name: 'Eternal Memory', description: 'White roses with caspia, ruscus & ivy in white wrap', color: 'White & Green', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 40, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'heavenly-peace', name: 'Heavenly Peace', description: 'Pure white roses with waxflower, eucalyptus & myrtle in white wrap', color: 'Pure White', image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$$', basePrice: 55, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'tender-goodbye', name: 'Tender Goodbye', description: 'Soft carnations with aster, ruscus & fern in white wrap', color: 'Soft Pastels', image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 30, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'sacred-tribute', name: 'Sacred Tribute', description: 'White lilies with veronica, eucalyptus & pittosporum in white wrap', color: 'White & Green', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 42, recipients: ['deceased'], occasions: ['sacrament'] },
  { id: 'in-loving-memory', name: 'In Loving Memory', description: 'White carnations with statice, ivy & myrtle in white wrap', color: 'White', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop&auto=format', priceIndicator: '$', basePrice: 28, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'angels-wings', name: "Angel's Wings", description: 'White orchids with baby\'s breath, ruscus & fern in white wrap', color: 'White', image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 45, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'serenity', name: 'Serenity', description: 'Peaceful peonies with waxflower, eucalyptus & ivy in white wrap', color: 'Soft White', image: 'https://images.unsplash.com/photo-1587392879738-baca04e9aee3?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$', basePrice: 38, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
  { id: 'final-farewell', name: 'Final Farewell', description: 'Elegant lilies with caspia, ruscus & pittosporum in white wrap', color: 'White', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format', priceIndicator: '$$$', basePrice: 65, recipients: ['deceased'], occasions: ['platonic', 'sacrament'] },
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
    flora: {
      rose: 'Rose', tulip: 'Tulip', lily: 'Lily', orchid: 'Orchid', peony: 'Peony', carnation: 'Carnation',
      'babys-breath': "Baby's Breath", waxflower: 'Waxflower', statice: 'Statice', aster: 'Aster', veronica: 'Veronica', caspia: 'Caspia',
      eucalyptus: 'Eucalyptus', ruscus: 'Ruscus', myrtle: 'Myrtle', ivy: 'Ivy', fern: 'Fern', pittosporum: 'Pittosporum',
      kraft: 'Kraft Paper', white: 'White', black: 'Black', 'pink-pastel': 'Pink Pastel', red: 'Red',
    } as Record<string, string>,
    colors: {
      'Deep Red': 'Deep Red', 'Blush Pink': 'Blush Pink', 'Red & Pink': 'Red & Pink', 'Pure White': 'Pure White',
      'Mixed Pastels': 'Mixed Pastels', 'Burgundy': 'Burgundy', 'Coral Sunset': 'Coral Sunset', 'White & Green': 'White & Green',
      'Soft Pink': 'Soft Pink', 'Yellow & Orange': 'Yellow & Orange', 'Rainbow': 'Rainbow', 'Mixed Colors': 'Mixed Colors',
      'Mixed Brights': 'Mixed Brights', 'Pastels': 'Pastels', 'Purple & Yellow': 'Purple & Yellow', 'Tropical Mix': 'Tropical Mix',
      'Soft Mix': 'Soft Mix', 'Golden Yellow': 'Golden Yellow', 'Warm Tones': 'Warm Tones', 'Pink & White': 'Pink & White',
      'Seasonal Mix': 'Seasonal Mix', 'Cottage Mix': 'Cottage Mix', 'Deep Tones': 'Deep Tones', 'White': 'White',
      'Soft Pastels': 'Soft Pastels', 'Soft White': 'Soft White',
    } as Record<string, string>,
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
    flora: {
      rose: 'Ruža', tulip: 'Tulipan', lily: 'Ljiljan', orchid: 'Orhideja', peony: 'Božur', carnation: 'Karanfil',
      'babys-breath': 'Djevičica', waxflower: 'Voskovac', statice: 'Morski lavandić', aster: 'Aster', veronica: 'Veronika', caspia: 'Limonijum',
      eucalyptus: 'Eukaliptus', ruscus: 'Ruskus', myrtle: 'Mirta', ivy: 'Bršljan', fern: 'Paprat', pittosporum: 'Pitospor',
      kraft: 'Kraft papir', white: 'Bijeli omot', black: 'Crni omot', 'pink-pastel': 'Pastelno ružičasti', red: 'Crveni omot',
    } as Record<string, string>,
    colors: {
      'Deep Red': 'Tamnocrvena', 'Blush Pink': 'Rumen ružičasta', 'Red & Pink': 'Crvena i ružičasta', 'Pure White': 'Čisto bijela',
      'Mixed Pastels': 'Mješoviti pasteli', 'Burgundy': 'Burgund', 'Coral Sunset': 'Koraljni zalazak', 'White & Green': 'Bijela i zelena',
      'Soft Pink': 'Mekano ružičasta', 'Yellow & Orange': 'Žuta i narančasta', 'Rainbow': 'Duga', 'Mixed Colors': 'Mješovite boje',
      'Mixed Brights': 'Jarke boje', 'Pastels': 'Pasteli', 'Purple & Yellow': 'Ljubičasta i žuta', 'Tropical Mix': 'Tropska mješavina',
      'Soft Mix': 'Mješovito mekano', 'Golden Yellow': 'Zlatno žuta', 'Warm Tones': 'Topli tonovi', 'Pink & White': 'Ružičasta i bijela',
      'Seasonal Mix': 'Sezonska mješavina', 'Cottage Mix': 'Rustikalna mješavina', 'Deep Tones': 'Duboki tonovi', 'White': 'Bijela',
      'Soft Pastels': 'Mekani pasteli', 'Soft White': 'Mekana bijela',
    } as Record<string, string>,
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
  const valid = new Set<Occasion>()
  for (const b of sampleBouquets) {
    if (b.recipients.includes(recipient)) {
      b.occasions.forEach(o => valid.add(o))
    }
  }
  return Array.from(valid)
}

// Helper to filter bouquets
export function filterBouquets(recipient: Recipient, occasion: Occasion): Bouquet[] {
  return sampleBouquets.filter(
    (b) => b.recipients.includes(recipient) && b.occasions.includes(occasion)
  ).slice(0, 6)
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
