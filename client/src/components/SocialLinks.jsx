import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export const XIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const PinterestIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
  </svg>
);

export const officialSocialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/coursedivine/',
    icon: Instagram,
    hoverBg: 'hover:bg-[#E1306C]',
    hoverBorder: 'hover:border-[#E1306C]',
    color: '#E1306C',
    ariaLabel: 'Follow Course Divine on Instagram'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61552188554923',
    icon: Facebook,
    hoverBg: 'hover:bg-[#1877F2]',
    hoverBorder: 'hover:border-[#1877F2]',
    color: '#1877F2',
    ariaLabel: 'Connect with Course Divine on Facebook'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@COURSE-DIVINE',
    icon: Youtube,
    hoverBg: 'hover:bg-[#FF0000]',
    hoverBorder: 'hover:border-[#FF0000]',
    color: '#FF0000',
    ariaLabel: 'Subscribe to Course Divine on YouTube'
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/CourseDivine',
    icon: XIcon,
    hoverBg: 'hover:bg-black',
    hoverBorder: 'hover:border-slate-500',
    color: '#000000',
    ariaLabel: 'Follow Course Divine on X'
  },
  {
    name: 'Pinterest',
    url: 'https://in.pinterest.com/coursedivine/',
    icon: PinterestIcon,
    hoverBg: 'hover:bg-[#BD081C]',
    hoverBorder: 'hover:border-[#BD081C]',
    color: '#BD081C',
    ariaLabel: 'Follow Course Divine on Pinterest'
  }
];

const SocialLinks = ({ size = 'md', variant = 'default', showLabels = false, className = '' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      {officialSocialLinks.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className={`rounded-xl border flex items-center justify-center transition-all duration-300 group shadow-sm ${
              sizeClasses[size] || sizeClasses.md
            } ${
              variant === 'light'
                ? `bg-white border-slate-200 text-slate-700 hover:text-white ${item.hoverBg} ${item.hoverBorder}`
                : variant === 'pill'
                ? `px-3 py-1.5 w-auto h-auto bg-slate-800/80 border-slate-700 text-slate-200 hover:text-white ${item.hoverBg} ${item.hoverBorder}`
                : `bg-[#061833]/90 border-slate-700/60 text-slate-300 hover:text-white ${item.hoverBg} ${item.hoverBorder}`
            }`}
          >
            <IconComponent className={iconSizes[size] || iconSizes.md} />
            {showLabels && (
              <span className="text-xs font-bold ml-2 hidden sm:inline">
                {item.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

