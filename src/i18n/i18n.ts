import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 1. Define your translations here
const resources = {
  en: {
    translation: {
      // Accessibility Screen
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
      // SearchingRiderScreen
      "searching_rider_title": "Finding Rider…",
      "cancel_delivery_btn": "CANCEL DELIVERY",


      // Login Screen
      "phone_label": "Phone Number",
      "login_btn": "LOGIN",

      // Home Screen (cards)
      "ride_card_title": "Ride",
      "helpline_card_title": "Helpline",
      "delivery_card_title": "Delivery",

      // --- HOME SCREEN NEW KEYS ---
      "home_where_to": "Where would you like to go?",
      "home_send_parcel": "Send a parcel",
      "home_mode_ride": "Ride",
      "home_mode_delivery": "Delivery",
      "home_search_destination": "Search for a destination",

      "home_saved_iba_title": "IBA University Road",
      "home_saved_iba_subtitle": "Karachi, Pakistan",

      "home_saved_saima_title": "Saima Mall",
      "home_saved_saima_subtitle": "North Nazimabad, Karachi",

      "home_pickup_placeholder": "Pickup location",
      "home_dropoff_placeholder": "Drop-off location",

      "home_parcel_details_title": "Parcel Details",
      "home_parcel_details_subtitle": "Add weight, size, and category",
      // --- END HOME SCREEN KEYS ---

      // ChooseRideScreen
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
       "status_completed": "Ride Finished",
       "enter_feedback": "Leave your feedback...",
       "submit_btn": "Submit",

      // OTPVerificationScreen
      "otp_title": "Enter OTP",
      "otp_subtitle": "We have sent a verification code",
      "verify_btn": "Verify",
      "resend_otp_timer": "Resend OTP in {{timer}}s",
      "resend_otp_btn": "Resend OTP",

      // PickupScreen
      "pickup_static_location": "National Stadium, Karachi",
      "destination_placeholder": "Enter your Destination",
      "recent_locations_title": "Recent Locations",

      // RideRequestScreen
      "keep_looking_btn": "KEEP LOOKING",
      "cancel_ride_btn": "CANCEL RIDE",
      "driver_offer_eta": "mins away",

      "recent_loc_1": "Iba, University Road, Karachi",
      "recent_loc_2": "Falcon complex, Siam house",
      "recent_loc_3": "Saima mall, North Nazimabad",

      // RideInProgressScreen
      "status_on_way": "Rider is on his way",
      "action_share": "Share",
      "action_contact": "Contact",

      // ProfileScreen
      "profile_title": "Profile",
      "personal_info_menu": "Personal Information",
      "saved_places_menu": "Saved Places",
      "download_data_menu": "Download Data",

      // RideHistoryScreen
      "history_title": "Ride History",
      "search_history_placeholder": "Search for booking",
       hl_faq_1: "I got into an accident, now what?",
        hl_faq_2: "What are my payment options?",
        hl_faq_3: "My parcel got damaged during delivery, now what?",
        hl_chevron_down: "⌄",
        hl_complaint_title: "Lodge a Complaint",
        hl_web_portal: "Using our web portal",
        hl_or: "OR",
        hl_contact_us: "Contact Us",

        // Accessibility Screen
        high_contrast: "High Contrast",
        high_contrast_sub: "Increase visibility & borders",

        acc_language_title: "Language",
        acc_language_english: "English",

        acc_general_title: "General",
        dark_mode: "Dark Mode",
        dark_mode_sub: "Toggle light/dark theme",

      // NEW STRINGS FROM COMPONENTS
      // Logo.tsx
      "logo_text": "Bykea",

      // Sidebar.tsx
      "user_name": "Saad Imam",
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
      "parcel_title": "Delivery Details",
      "parcel_pickup_label": "PICK-UP LOCATION",
      "parcel_pickup_placeholder": "Pickup location",
      "parcel_dropoff_label": "RECIPIENT’S LOCATION",
      "parcel_dropoff_placeholder": "Drop-off location",

      "parcel_details_title": "Parcel Details",
      "parcel_item_placeholder": "Item Description (e.g., Documents)",
      "parcel_weight_placeholder": "Weight (kg)",
      "parcel_value_placeholder": "Estimated Value",

      "parcel_service_title": "Bykea Delivery",
      "parcel_service_subtitle": "Documents & Parcels",

      "parcel_confirm_btn": "Confirm Delivery",
      "sidebar_user": "User",
        "sidebar_view_profile": "View Profile",
        "sidebar_ride_history": "Ride History",
        "sidebar_delivery_history": "Delivery History",
        "sidebar_payment_methods": "Payment Methods",
        "sidebar_promotions": "Promotions",
        "sidebar_help_support": "Help & Support",
        "sidebar_settings": "Settings",
        "sidebar_logout": "Logout",

    },
  },

  ur: {
    translation: {
      // Accessibility Screen
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
      "status_completed": "سفر مکمل ہوگیا",
      "enter_feedback": "اپنی رائے لکھیں...",
       "submit_btn": "جمع کریں",
        "parcel_title": "ڈیلیوری کی تفصیلات",
        "parcel_pickup_label": "پک اپ مقام",
        "parcel_pickup_placeholder": "پک اپ لوکیشن",
        "parcel_dropoff_label": "وصول کنندہ کا مقام",
        "parcel_dropoff_placeholder": "ڈراپ آف لوکیشن",

        "parcel_details_title": "پارسل کی تفصیلات",
        "parcel_item_placeholder": "آئٹم کی تفصیل (مثلاً دستاویزات)",
        "parcel_weight_placeholder": "وزن (کلوگرام)",
        "parcel_value_placeholder": "اندازاً قیمت",
        // SearchingRiderScreen
        "searching_rider_title": "رائڈر تلاش کیا جا رہا ہے...",
        "cancel_delivery_btn": "ڈیلیوری منسوخ کریں",
          hl_faq_1: "میرا حادثہ ہوگیا، اب کیا کروں؟",
          hl_faq_2: "ادائیگی کے کیا طریقے ہیں؟",
          hl_faq_3: "میرا پارسل ڈلیوری کے دوران خراب ہوگیا، اب کیا کروں؟",
          hl_chevron_down: "⌄",
          hl_complaint_title: "شکایت درج کریں",
          hl_web_portal: "ویب پورٹل استعمال کریں",
          hl_or: "یا",
          hl_contact_us: "ہم سے رابطہ کریں",

          // Accessibility Screen
          high_contrast: "ہائی کنٹراسٹ",
          high_contrast_sub: "نمایاں بارڈر اور بہتر نظر",

          acc_language_title: "زبان",
          acc_language_english: "انگریزی",

          acc_general_title: "عام",
          dark_mode: "ڈارک موڈ",
          dark_mode_sub: "لائٹ/ڈارک موڈ تبدیل کریں",

        "parcel_service_title": "بائیکیا ڈیلیوری",
        "parcel_service_subtitle": "دستاویزات اور پارسل",

        "parcel_confirm_btn": "ڈیلیوری کی تصدیق کریں",

      // Login Screen
      "phone_label": "فون نمبر",
      "login_btn": "لاگ ان کریں",
       "sidebar_user": "صارف",
       "sidebar_view_profile": "پروفائل دیکھیں",
        "sidebar_ride_history": "رائیڈ ہسٹری",
       "sidebar_delivery_history": "ڈلیوری ہسٹری",
        "sidebar_payment_methods": "ادائیگی کے طریقے",
          "sidebar_promotions": "پروموشنز",
          "sidebar_help_support": "مدد اور معاونت",
          "sidebar_settings": "سیٹنگز",
          "sidebar_logout": "لاگ آؤٹ",
      // Home Screen (cards)
      "ride_card_title": "سفر",
      "helpline_card_title": "ہیلپ لائن",
      "delivery_card_title": "ڈیلیوری",

      // --- HOME SCREEN NEW KEYS (URDU) ---
      "home_where_to": "آپ کہاں جانا چاہیں گے؟",
      "home_send_parcel": "پارسل بھیجیں",
      "home_mode_ride": "سفر",
      "home_mode_delivery": "ڈیلیوری",
      "home_search_destination": "منزل تلاش کریں",

      "home_saved_iba_title": "آئی بی اے یونیورسٹی روڈ",
      "home_saved_iba_subtitle": "کراچی، پاکستان",

      "home_saved_saima_title": "سائما مال",
      "home_saved_saima_subtitle": "نارتھ ناظم آباد، کراچی",

      "home_pickup_placeholder": "پک اپ مقام",
      "home_dropoff_placeholder": "ڈراپ آف مقام",

      "home_parcel_details_title": "پارسل کی تفصیلات",
      "home_parcel_details_subtitle": "وزن، سائز اور کیٹیگری شامل کریں",
      // --- END HOME SCREEN KEYS ---

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
