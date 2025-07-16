// components/Footer.jsx
import { useState } from "react";

const footerData = [
  {
    title: "Product Info",
    links: [
      { name: "Campaign", href: "#" },
      { name: "Services", href: "#" },
      { name: "Konbini Points", href: "#" },
      { name: "Konbini T Card", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Company Info", href: "#" },
      { name: "Recruitment", href: "#" },
      { name: "News Release", href: "#" },
      { name: "Sustainability", href: "#" },
    ],
  },
  {
    title: "Policies",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Use", href: "#" },
      { name: "Sitemap", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  },
];

const socialIcons = [
  {
    name: "Twitter",
    href: "#",
    src: "https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png",
  },
  {
    name: "Instagram",
    href: "#",
    src: "https://www.svgrepo.com/show/452229/instagram-1.svg",
  },
  {
    name: "LINE",
    href: "#",
    src: "https://img.icons8.com/?size=96&id=21746&format=png",
  },
  {
    name: "Facebook",
    href: "#",
    src: "https://img.icons8.com/?size=96&id=lRtQAp17Ei7V&format=gif",
  },
  {
    name: "YouTube",
    href: "#",
    src: "https://img.icons8.com/?size=96&id=19318&format=png",
  },
  {
    name: "TikTok",
    href: "#",
    src: "https://img.icons8.com/?size=96&id=kM0cd7be1NC1&format=gif",
  },
];

export default function Footer() {
  const [expanded, setExpanded] = useState(null);

  return (
    <footer className="bg-gray-100 border-t text-sm text-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-8">
        {/* Top: Logo + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Logo Section */}
          <div className="flex flex-col gap-4">
            <img
              src="/images/konbini-logo.png"
              alt="Konbini Logo"
              className="w-28 object-contain"
            />
          </div>

          {/* Footer Links */}
          {footerData.map((section, index) => (
            <div key={index}>
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="font-bold flex justify-between w-full md:pointer-events-none"
              >
                {section.title}
                <span className="md:hidden">{expanded === index ? "−" : "+"}</span>
              </button>
              <ul
                className={`mt-2 space-y-2 ${
                  expanded === index || typeof window !== "undefined" && window.innerWidth >= 768
                    ? "block"
                    : "hidden"
                }`}
              >
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-blue-600 block transition">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Language */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-6">
          {/* Social Media Icons */}
          <div className="flex gap-4">
            {socialIcons.map((icon, idx) => (
              <a
                key={idx}
                href={icon.href}
                aria-label={icon.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="w-6 h-6 hover:scale-110 transition-transform"
                />
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
            <span>日本語</span>
            <span>English</span>
            <span>한국어</span>
            <span>繁體中文</span>
            <span>简体中文</span>
          </div>
        </div>

        {/* Legal */}
        <div className="text-center text-xs text-gray-500 mt-6">
          © 2025 Konbini Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
