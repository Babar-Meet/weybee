/**
 * WhyWeyBeeIcons — Professional SVG icons matching original weybee.com style
 * Dark outlines with coral/red accent dots
 */

const iconStyle = { width: '100%', height: '100%' };
const accent = '#E8573A'; // coral-red accent matching original

const icons = {
  'dedicated-developers': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="26" width="32" height="18" rx="2" stroke="#222" strokeWidth="2"/>
      <path d="M24 4L6 22h36L24 4z" stroke="#222" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="24" cy="18" r="4" fill={accent}/>
      <path d="M16 36h16M20 40h8" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'transparent-operations': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" stroke="#222" strokeWidth="2"/>
      <line x1="29" y1="29" x2="42" y2="42" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="5" fill={accent} opacity="0.3"/>
      <circle cx="36" cy="8" r="4" fill={accent}/>
    </svg>
  ),
  'diverse-expertise': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="18" height="18" rx="3" stroke="#222" strokeWidth="2"/>
      <rect x="26" y="4" width="18" height="18" rx="3" stroke="#222" strokeWidth="2"/>
      <rect x="4" y="26" width="18" height="18" rx="3" stroke="#222" strokeWidth="2"/>
      <rect x="26" y="26" width="18" height="18" rx="3" stroke="#222" strokeWidth="2"/>
      <circle cx="35" cy="13" r="4" fill={accent}/>
      <circle cx="13" cy="35" r="4" fill={accent}/>
    </svg>
  ),
  'long-term-partnership': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 28c0-4 4-8 8-8h2l6-6 6 6h2c4 0 8 4 8 8v4H8v-4z" stroke="#222" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="16" cy="14" r="6" stroke="#222" strokeWidth="2"/>
      <circle cx="32" cy="14" r="6" stroke="#222" strokeWidth="2"/>
      <path d="M20 36l4 6 4-6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="38" cy="8" r="4" fill={accent}/>
    </svg>
  ),
  'client-satisfaction': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="#222" strokeWidth="2"/>
      <circle cx="17" cy="20" r="2.5" fill="#222"/>
      <circle cx="31" cy="20" r="2.5" fill="#222"/>
      <path d="M16 30c2 4 6 6 8 6s6-2 8-6" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="38" cy="8" r="4" fill={accent}/>
    </svg>
  ),
  'proven-growth': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="40" height="40" rx="4" stroke="#222" strokeWidth="2"/>
      <polyline points="10,36 18,24 26,30 38,12" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="32,12 38,12 38,18" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="38" cy="12" r="4" fill={accent}/>
    </svg>
  ),
  'innovative-approach': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 38h12M20 42h8" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 4c-8 0-14 6-14 14 0 5 2.5 9 7 12v4h14v-4c4.5-3 7-7 7-12 0-8-6-14-14-14z" stroke="#222" strokeWidth="2"/>
      <path d="M24 14v10M20 20h8" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'skilled-talent': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="14" r="8" stroke="#222" strokeWidth="2"/>
      <path d="M8 42c0-8 7-14 16-14s16 6 16 14" stroke="#222" strokeWidth="2"/>
      <circle cx="36" cy="10" r="4" fill={accent}/>
      <path d="M20 14l3 3 5-6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'strategic-partnership': (
    <svg viewBox="0 0 48 48" style={iconStyle} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="#222" strokeWidth="2"/>
      <circle cx="24" cy="24" r="12" stroke="#222" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="6" stroke="#222" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="2.5" fill={accent}/>
      <circle cx="38" cy="8" r="4" fill={accent}/>
    </svg>
  )
};

// Map from icon key in JSON to SVG component
export const getIcon = (key) => {
  // Map emojis (used in seeded database) to correct icon keys
  const mapEmojiToKey = {
    '🎓': 'dedicated-developers',
    '🔍': 'transparent-operations',
    '🧩': 'diverse-expertise',
    '🤝': 'long-term-partnership',
    '😊': 'client-satisfaction',
    '📈': 'proven-growth',
    '💡': 'innovative-approach',
    '👨‍💻': 'skilled-talent',
    '🎯': 'strategic-partnership'
  };
  
  const finalKey = mapEmojiToKey[key] || key;
  
  if (icons[finalKey]) {
    return icons[finalKey];
  }
  
  // Fallback to rendering the text/emoji if no SVG is found
  return <span style={{ fontSize: '28px' }}>{key}</span>;
};

export default icons;
