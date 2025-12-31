
export enum BookingTab {
  STAYS = 'Stays',
  FLIGHTS = 'Flights',
  CAR_RENTALS = 'Car Rentals'
}

export enum View {
  HOME = 'home',
  STAYS_PAGE = 'stays_page',
  FLIGHTS_PAGE = 'flights_page',
  CARS_PAGE = 'cars_page',
  SIGN_IN = 'sign_in',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot_password',
  PROFILE = 'profile',
  ADMIN_SIGN_IN = 'admin_sign_in',
  ADMIN_DASHBOARD = 'admin_dashboard',
  RESULTS = 'results',
  DETAILS = 'details',
  CHECKOUT = 'checkout',
  CONFIRMATION = 'confirmation',
  DHL_LOGISTICS = 'dhl_logistics',
  ADMISSION_PROCESSING = 'admission_processing',
  TOURS_PAGE = 'tours_page',
  CONTACT_PAGE = 'contact_page',
  ABOUT_US = 'about_us'
}

export interface DealCardProps {
  title: string;
  subtitle: string;
  isLocal?: boolean;
  onClick?: () => void;
  price?: string;
  image?: string;
}

export interface TravelItem {
  id: string;
  type: BookingTab;
  title: string;
  location: string;
  price: string;
  details: string[];
  rating: string;
  badge?: string;
  description?: string;
  image?: string;
}
