// components/Footer.jsx
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail
} from "lucide-react";

const footerData = [
  {
    title: "Connect",
    links: [
      { name: "Facebook", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "YouTube", href: "#" },
      { name: "LINE", href: "#" },
      { name: "App", href: "#" },
      { name: "Newsletter", href: "#" },
      { name: "Commercial Video", href: "#" },
      { name: "Our Initiatives", href: "#" },
    ],
  },
  {
    title: "Product Information",
    links: [
      { name: "New products this week", href: "#" },
      { name: "New products next week", href: "#" },
      { name: "Allergy info & nutrition", href: "#" },
      { name: "Fried food, Franks, Yakitori", href: "#" },
      { name: "Oden / Chinese buns", href: "#" },
      { name: "Seven Cafe", href: "#" },
      { name: "Now accepting reservations", href: "#" },
      { name: "Bento / Gifts", href: "#" },
      { name: "Sales Campaigns", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Multi-copy machine", href: "#" },
      { name: "Copy / Print", href: "#" },
      { name: "Scan / Fax", href: "#" },
      { name: "Ticket", href: "#" },
      { name: "Prepaid Service", href: "#" },
      { name: "Lottery / Government Services", href: "#" },
      { name: "Insurance / Education", href: "#" },
      { name: "nanaco", href: "#" },
      { name: "Courier", href: "#" },
    ],
  },
  {
    title: "Store & Payment",
    links: [
      { name: "Postage / Stamps", href: "#" },
      { name: "Seven Bank ATM", href: "#" },
      { name: "Available Payment Methods", href: "#" },
      { name: "Paying Bills", href: "#" },
      { name: "Photo Services", href: "#" },
      { name: "Cleaning Club", href: "#" },
      { name: "Delivery Lockers", href: "#" },
      { name: "Bicycle / Battery Sharing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Greetings", href: "#" },
      { name: "Company Profile", href: "#" },
      { name: "News Release", href: "#" },
      { name: "Philosophy", href: "#" },
      { name: "Store Numbers", href: "#" },
      { name: "Sales & Stats", href: "#" },
      { name: "History", href: "#" },
      { name: "Balance Sheet", href: "#" },
    ],
  },
  {
    title: "Sustainability & Contact",
    links: [
      { name: "Founding Philosophy", href: "#" },
      { name: "Challenges & Change", href: "#" },
      { name: "GREEN CHALLENGE 2050", href: "#" },
      { name: "Reports & News", href: "#" },
      { name: "Store Locator", href: "#" },
      { name: "Online Shopping", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Recruitment & Jobs", href: "#" },
      { name: "Franchise / Property", href: "#" },
    ],
  },
];

export default function Footer() {
  const [expanded, setExpanded] = useState(null);

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        {/* Newsletter */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-700 pb-6">
          <div className="text-white font-semibold text-lg">
            📬 Subscribe to our Newsletter
          </div>
          <div className="flex w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l bg-white text-gray-900"
            />
            <button className="bg-red-600 hover:bg-pink-700 px-4 py-2 rounded-r text-white font-medium">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {footerData.map((section, index) => (
            <div key={index}>
              <button
                onClick={() =>
                  setExpanded(expanded === index ? null : index)
                }
                className="text-white font-bold w-full flex justify-between items-center lg:cursor-default lg:pointer-events-none"
              >
                {section.title}
                <span className="lg:hidden">{expanded === index ? "−" : "+"}</span>
              </button>
              <ul
                className={`mt-2 space-y-1 ${
                  expanded === index || window.innerWidth >= 1024 ? "block" : "hidden"
                }`}
              >
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:underline block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Social + Language */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3 text-gray-400">
            <a href="#" className="hover:text-white"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white"><Twitter size={18} /></a>
            <a href="#" className="hover:text-white"><Instagram size={18} /></a>
            <a href="#" className="hover:text-white"><Youtube size={18} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-white"><Mail size={18} /></a>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-400">
            <span>English (Corporate)</span>
            <span>English (Services)</span>
            <span>繁體中文</span>
            <span>简体中文</span>
            <span>한국어</span>
            <span>ภาษาไทย</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 mt-6">
          © SEVEN-ELEVEN JAPAN CO.,LTD. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

