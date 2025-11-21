import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 1. Define your translations here
const resources = {
  en: {
    translation: {
      // Accessibility Screen (from previous set)
      "vision": "VISION",
      "screen_reader": "Screen Reader",
      "screen_reader_sub": "Provides spoken feedback",
      "color_blind": "Colorblind Mode",
      "color_blind_sub": "Adjust colors for clarity",
      "language": "LANGUAGE",
      "urdu": "اردو",
      "general": "GENERAL",
      "larger_text": "Larger Text",
      "larger_text_sub": "Increase global font size",

      // Login Screen (from previous set)
      "phone_label": "Phone Number",
      "login_btn": "LOGIN",

      // Home Screen (from previous set)
      "ride_card_title": "Ride",
      "helpline_card_title": "Helpline",
      "delivery_card_title": "Delivery",

      // ChooseRideScreen (from previous set)
      "pickup_location": "National Stadium, Karachi",
      "sheet_title": "Choose a ride",
      "motorbike_name": "Motorbike",
      "motorbike_desc": "1 Passenger",
      "car_name": "Car",
      "car_desc": "3–4 Passengers",
      "rickshaw_name": "RickShaw",
      "rickshaw_desc": "3 Passengers",
      "find_ride_btn": "FIND RIDE",
      "enter_fare_popup_title": "Enter Fare",
      "enter_amount_placeholder": "Enter amount",
      "cancel_btn": "Cancel",
      "ok_btn": "OK",

      // OTPVerificationScreen (from previous set)
      "otp_title": "Enter OTP",
      "otp_subtitle": "We have sent a verification code",
      "verify_btn": "Verify",
      "resend_otp_timer": "Resend OTP in {{timer}}s",
      "resend_otp_btn": "Resend OTP",

      // PickupScreen (from previous set)
      "pickup_static_location": "National Stadium, Karachi",
      "destination_placeholder": "Enter your Destination",
      "recent_locations_title": "Recent Locations",

      // RideRequestScreen (from previous set)
      "keep_looking_btn": "KEEP LOOKING",
      "cancel_ride_btn": "CANCEL RIDE",
      "driver_offer_eta": "mins away",

      "recent_loc_1": "Iba, University Road, Karachi",
      "recent_loc_2": "Falcon complex, Siam house",
      "recent_loc_3": "Saima mall, North Nazimabad",

      // RideInProgressScreen (from previous set)
      "status_on_way": "Rider is on his way",
      "action_share": "Share",
      "action_contact": "Contact",

      // ProfileScreen (from previous set)
      "profile_title": "Profile",
      "personal_info_menu": "Personal Information",
      "saved_places_menu": "Saved Places",
      "download_data_menu": "Download Data",

      // RideHistoryScreen (from previous set)
      "history_title": "Ride History",
      "search_history_placeholder": "Search for booking",

      // NEW STRINGS FROM COMPONENTS

      // Logo.tsx
      "logo_text": "Bykea",

      // Sidebar.tsx
      "user_name": "Saad Imam", // This is a placeholder for the user's name
      "sidebar_profile": "Profile",
      "sidebar_history": "Booking History",
      "sidebar_settings": "Settings",
      "sidebar_legal": "Legal",
      "sidebar_accessibility": "Accessibility",
      "sidebar_logout": "Logout",

      // CustomFareModal.tsx
      "custom_fare_title": "Enter Custom Fare",
      "apply_fare_btn": "APPLY FARE",

      // DriverOfferCard.tsx
      "accept_btn": "Accept",
      "reject_btn": "Reject",
    },
  },
  ur: {
    translation: {
      // Accessibility Screen (Translated)
      "vision": "بصارت",
      "screen_reader": "اسکرین ریڈر",
      "screen_reader_sub": "بول کر فیڈبک فراہم کرتا ہے",
      "color_blind": "کلر بلائنڈ موڈ",
      "color_blind_sub": "وضاحت کے لیے رنگوں کو ایڈجسٹ کریں",
      "language": "زبان",
      "urdu": "English",
      "general": "عام",
      "larger_text": "بڑا متن",
      "larger_text_sub": "پورے فونٹ کا سائز بڑھائیں",

      // Login Screen
      "phone_label": "فون نمبر",
      "login_btn": "لاگ ان کریں",

      // Home Screen
      "ride_card_title": "سفر",
      "helpline_card_title": "ہیلپ لائن",
      "delivery_card_title": "ڈیلیوری",

      // ChooseRideScreen
      "pickup_location": "نیشنل اسٹیڈیم، کراچی",
      "sheet_title": "سفر کا انتخاب کریں",
      "motorbike_name": "موٹر بائیک",
      "motorbike_desc": "1 مسافر",
      "car_name": "کار",
      "car_desc": "3–4 مسافر",
      "rickshaw_name": "رکشہ",
      "rickshaw_desc": "3 مسافر",
      "find_ride_btn": "سفر تلاش کریں",
      "enter_fare_popup_title": "کرایہ درج کریں",
      "enter_amount_placeholder": "رقم درج کریں",
      "cancel_btn": "منسوخ کریں",
      "ok_btn": "ٹھیک ہے",

      // OTPVerificationScreen
      "otp_title": "او ٹی پی درج کریں",
      "otp_subtitle": "ہم نے ایک تصدیقی کوڈ بھیجا ہے",
      "verify_btn": "تصدیق کریں",
      "resend_otp_timer": "{{timer}}س میں دوبارہ بھیجیں",
      "resend_otp_btn": "او ٹی پی دوبارہ بھیجیں",

      // PickupScreen
      "pickup_static_location": "نیشنل اسٹیڈیم، کراچی",
      "destination_placeholder": "اپنی منزل درج کریں",
      "recent_locations_title": "حالیہ مقامات",

      // RideRequestScreen
      "keep_looking_btn": "تلاش جاری رکھیں",
      "cancel_ride_btn": "سفر منسوخ کریں",
      "driver_offer_eta": "منٹ دور",
      "recent_loc_1": "آئی بی اے، یونیورسٹی روڈ، کراچی",
      "recent_loc_2": "فالکن کمپلیکس، سیام ہاؤس",
      "recent_loc_3": "سائما مال، نارتھ ناظم آباد",
      // RideInProgressScreen
      "status_on_way": "رائڈر راستے میں ہے",
      "action_share": "شیئر کریں",
      "action_contact": "رابطہ کریں",

      // ProfileScreen
      "profile_title": "پروفائل",
      "personal_info_menu": "ذاتی معلومات",
      "saved_places_menu": "محفوظ کردہ مقامات",
      "download_data_menu": "ڈیٹا ڈاؤن لوڈ کریں",

      // RideHistoryScreen
      "history_title": "سفر کی تاریخ",
      "search_history_placeholder": "بکنگ تلاش کریں",

      // NEW STRINGS FROM COMPONENTS

      // Logo.tsx
      "logo_text": "بائیکیا",

      // Sidebar.tsx
      "user_name": "سعد امام",
      "sidebar_profile": "پروفائل",
      "sidebar_history": "بکنگ کی تاریخ",
      "sidebar_settings": "سیٹنگز",
      "sidebar_legal": "قانونی",
      "sidebar_accessibility": "رسائی",
      "sidebar_logout": "لاگ آؤٹ",

      // CustomFareModal.tsx
      "custom_fare_title": "اپنی مرضی کا کرایہ درج کریں",
      "apply_fare_btn": "کرایہ لاگو کریں",

      // DriverOfferCard.tsx
      "accept_btn": "قبول کریں",
      "reject_btn": "مسترد کریں",
    },
  },
};

// 2. Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React handles escaping already
    },
  });

export default i18n;