
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
  PROFILE = 'profile',
  ADMIN_SIGN_IN = 'admin_sign_in',
  ADMIN_DASHBOARD = 'admin_dashboard',
  RESULTS = 'results',
  DETAILS = 'details',
  CHECKOUT = 'checkout',
  ABOUT_US = "ABOUT_US",
  DHL_LOGISTICS = "DHL_LOGISTICS",
  ADMISSION_PROCESSING = "ADMISSION_PROCESSING",
  TOURS_PAGE = "TOURS_PAGE",
  CONTACT_PAGE = "CONTACT_PAGE"
}

export interface DealCardProps {
  title: string;
  subtitle: string;
  isLocal?: boolean;
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
}
