import { useEffect, useState } from "react";
import {
  ShoppingCart,
  CalendarDays,
  ChevronDown,
  Search,
  MapPin,
  Globe,
  LocateFixed,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";

export default function TopNavSection({ search, setSearch, onSearchSubmit }) {
  const [language, setLanguage] = useState("en");
  const [location, setLocation] = useState("🇯🇵 Japan");
  const [currentDate, setCurrentDate] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const options = { weekday: "short", month: "short", day: "numeric" };
    const locale =
      language === "ja" ? "ja-JP" : language === "ko" ? "ko-KR" : "en-US";
    setCurrentDate(today.toLocaleDateString(locale, options));
  }, [language]);

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        },
        () => alert("Location permission denied or unavailable.")
      );
    } else {
      alert("Geolocation is not supported.");
    }
  };

  return (
    <div className="sticky top-0 z-[40] bg-white border-b shadow text-sm font-sans">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between px-4 md:px-6 py-3 gap-2 md:gap-0">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/home">
            <img
              src="/images/konbini-logo.png"
              alt="Konbini Logo"
              className="min-w-[80px] w-24 md:w-28 h-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={onSearchSubmit}
          className="flex-1 mx-2 flex items-center max-w-full sm:max-w-[240px] md:max-w-[700px] bg-white rounded-xl shadow-md px-3 py-2 border border-gray-300 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-300 transition-all duration-200"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                navigate(`/home?search=${encodeURIComponent(search)}`);
              }
            }}
            placeholder={
              language === "ja"
                ? "ラーメン、寿司、カレー..."
                : language === "ko"
                ? "라면, 김밥, 치킨..."
                : "ramen, sushi, curry..."
            }
            className="flex-1 bg-transparent outline-none text-base"
          />
          <button
            type="submit"
            className="ml-2 bg-yellow-400 hover:bg-orange-500 text-white rounded-full p-2"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Right Controls */}
        <div className="flex items-center gap-3 md:gap-6 flex-wrap md:flex-nowrap text-gray-700">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1 font-medium hover:text-blue-600"
            >
              <Globe size={16} />
              {language === "ja"
                ? "日本語"
                : language === "ko"
                ? "한국어"
                : "English"}
              <ChevronDown size={16} />
            </button>
            {languageOpen && (
              <div className="absolute left-0 top-8 bg-white rounded shadow text-sm w-36 z-50 border border-gray-200">
                {["en", "ja", "ko"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLanguageOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                  >
                    {lang === "en"
                      ? "🇺🇸 English"
                      : lang === "ja"
                      ? "🇯🇵 日本語"
                      : "🇰🇷 한국어"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1 font-medium hover:text-blue-600"
            >
              <MapPin size={16} />
              {location}
              <ChevronDown size={16} />
            </button>
            {locationOpen && (
              <div className="absolute left-0 top-8 bg-white rounded shadow text-sm w-48 z-50 border border-gray-200">
                <button
                  onClick={() => {
                    setLocation("Japan");
                    setLocationOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <MapPin size={16} /> Japan
                </button>
                <button
                  onClick={() => {
                    setLocation("Korea");
                    setLocationOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <MapPin size={16} /> Korea
                </button>
                <button
                  onClick={() => {
                    getLiveLocation();
                    setLocationOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <LocateFixed size={16} /> Use My Location
                </button>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-gray-600 font-medium">
            <CalendarDays size={16} />
            {currentDate}
          </div>

          {/* Cart */}
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-full"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">My Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-blue-900 font-bold text-xs px-2 py-0.5 rounded-full border border-blue-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="flex gap-4 overflow-x-auto px-4 md:px-6 py-2 text-sm font-medium whitespace-nowrap">
        <button className="hover:text-pink-600">Global+</button>
        <button className="hover:text-pink-600">New arrivals</button>
        <button className="hover:text-pink-600">Bestsellers</button>
        <button className="hover:text-pink-600">Deals</button>
        <button className="text-purple-600">Refer Friends, Get $20</button>
      </div>

      {/* Cart Drawer */}
      {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
    </div>
  );
}
