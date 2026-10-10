import React from 'react';

/**
 * BotanicalDefs: Central SVG gradient & filter definitions
 * Reusable across all botanical components to maintain visual unity and performance.
 */
export const BotanicalDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
    <defs>
      {/* Burgundy Stem & Deep Leaf Gradient */}
      <linearGradient id="bb-burgundy-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4A1E2E" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#632D40" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#7E3A52" stopOpacity="0.9" />
      </linearGradient>

      {/* Dusty Rose Foliage Gradient */}
      <linearGradient id="bb-dusty-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D49EAE" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#BD7C91" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#A5657A" stopOpacity="0.9" />
      </linearGradient>

      {/* Soft Blush Petal Gradient */}
      <linearGradient id="bb-blush-grad" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#FBF4F6" stopOpacity="0.8" />
        <stop offset="45%" stopColor="#F1D9DF" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#E4C0CA" stopOpacity="0.8" />
      </linearGradient>

      {/* Muted Rose Sheen */}
      <linearGradient id="bb-sheen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#F1D9DF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#BD7C91" stopOpacity="0.1" />
      </linearGradient>

      {/* Dark Sidebar Leaf Gradient */}
      <linearGradient id="bb-sidebar-leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F1D9DF" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#BD7C91" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#D49EAE" stopOpacity="0.18" />
      </linearGradient>

      {/* Sidebar Stem Glow */}
      <linearGradient id="bb-sidebar-stem-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#BD7C91" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#F1D9DF" stopOpacity="0.35" />
      </linearGradient>

      {/* Soft Drop Shadow for Highlights */}
      <filter id="bb-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#4A1E2E" floodOpacity="0.08" />
      </filter>
    </defs>
  </svg>
);

/**
 * SidebarBotanicalIllustration:
 * Large, elegant botanical branch placed along the bottom-left portion of the sidebar.
 * Layered curved leaves, delicate stems, and floating petals in soft translucent blush and dusty rose.
 */
export const SidebarBotanicalIllustration = ({ className = '' }) => (
  <div className={`botanical-sidebar-wrapper ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 280 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="botanical-sidebar-svg"
      preserveAspectRatio="xMinYMax meet"
    >
      {/* Background Soft Ambient Aura */}
      <ellipse cx="60" cy="270" rx="90" ry="80" fill="url(#bb-sidebar-stem-grad)" opacity="0.4" filter="blur(30px)" />

      {/* Secondary Background Branch */}
      <path
        d="M -10 350 C 30 320, 65 260, 50 190 C 40 140, 75 100, 95 75"
        stroke="url(#bb-sidebar-stem-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Secondary leaves */}
      <path
        d="M 50 190 C 70 175, 100 178, 105 198 C 98 214, 68 210, 50 190 Z"
        fill="url(#bb-sidebar-leaf-grad)"
        opacity="0.6"
      />
      <path
        d="M 60 150 C 85 135, 115 142, 118 160 C 105 174, 80 166, 60 150 Z"
        fill="url(#bb-sidebar-leaf-grad)"
        opacity="0.5"
      />
      <path
        d="M 80 110 C 105 92, 132 98, 134 115 C 122 128, 98 122, 80 110 Z"
        fill="url(#bb-sidebar-leaf-grad)"
        opacity="0.7"
      />
      <path
        d="M 95 75 C 112 60, 130 65, 132 80 C 120 90, 105 85, 95 75 Z"
        fill="url(#bb-sidebar-leaf-grad)"
        opacity="0.8"
      />

      {/* Primary Sweeping Main Stem */}
      <path
        d="M -20 360 C 25 330, 85 285, 90 205 C 95 130, 140 85, 185 45"
        stroke="url(#bb-sidebar-stem-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Layer 1 Leaves (Lower Arch) */}
      <g opacity="0.85">
        {/* Leaf 1 - Bottom Left */}
        <path
          d="M 22 315 C 35 285, 70 280, 82 298 C 80 320, 48 335, 22 315 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        <path d="M 22 315 Q 52 298 82 298" stroke="rgba(241, 217, 223, 0.4)" strokeWidth="0.8" />

        {/* Leaf 2 - Mid Left outward */}
        <path
          d="M 60 255 C 35 235, 25 200, 45 190 C 70 195, 80 230, 60 255 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        <path d="M 60 255 Q 45 220 45 190" stroke="rgba(241, 217, 223, 0.35)" strokeWidth="0.8" />

        {/* Leaf 3 - Mid Right inner */}
        <path
          d="M 88 230 C 125 215, 155 228, 152 248 C 132 268, 98 255, 88 230 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        <path d="M 88 230 Q 125 235 152 248" stroke="rgba(241, 217, 223, 0.4)" strokeWidth="0.8" />
      </g>

      {/* Layer 2 Leaves (Mid-Stem Lush Cluster) */}
      <g opacity="0.9">
        {/* Leaf 4 - Center Elegance */}
        <path
          d="M 92 185 C 75 155, 68 125, 90 115 C 115 125, 118 160, 92 185 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        <path d="M 92 185 Q 85 145 90 115" stroke="rgba(241, 217, 223, 0.4)" strokeWidth="0.8" />

        {/* Leaf 5 - Facing Right */}
        <path
          d="M 115 155 C 150 142, 182 155, 178 175 C 155 192, 125 180, 115 155 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        <path d="M 115 155 Q 150 160 178 175" stroke="rgba(241, 217, 223, 0.35)" strokeWidth="0.8" />

        {/* Leaf 6 - Left High */}
        <path
          d="M 125 120 C 105 95, 108 68, 130 65 C 152 75, 150 102, 125 120 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        <path d="M 125 120 Q 120 90 130 65" stroke="rgba(241, 217, 223, 0.4)" strokeWidth="0.8" />
      </g>

      {/* Top Foliage & Blooming Petal Tip */}
      <g opacity="0.95">
        {/* Leaf 7 - Tip branch */}
        <path
          d="M 155 80 C 185 70, 210 82, 208 98 C 188 112, 165 100, 155 80 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        {/* Final Apex Leaf */}
        <path
          d="M 185 45 C 205 32, 228 38, 226 52 C 210 65, 192 60, 185 45 Z"
          fill="url(#bb-sidebar-leaf-grad)"
        />
        {/* Delicate Flower Bud/Petal Accent */}
        <circle cx="185" cy="45" r="4.5" fill="#F1D9DF" opacity="0.8" />
        <circle cx="192" cy="40" r="3" fill="#BD7C91" opacity="0.75" />
      </g>

      {/* Gentle Floating Petals around sidebar base */}
      <path
        d="M 140 280 C 148 272, 160 274, 162 284 C 158 292, 145 292, 140 280 Z"
        fill="url(#bb-sidebar-leaf-grad)"
        opacity="0.6"
      />
      <path
        d="M 180 230 C 186 224, 195 226, 196 233 C 192 240, 182 240, 180 230 Z"
        fill="url(#bb-sidebar-leaf-grad)"
        opacity="0.5"
      />
      <path
        d="M 45 105 C 50 98, 60 100, 62 108 C 58 115, 48 114, 45 105 Z"
        fill="url(#bb-sidebar-leaf-grad)"
        opacity="0.55"
      />
    </svg>
  </div>
);

/**
 * HeaderBotanicalFoliage:
 * Elegant botanical leaves and petals positioned in the top-right area of the dashboard header.
 * Layered with gentle dusty rose, blush, and burgundy tints, giving the header an elevated luxury feel.
 */
export const HeaderBotanicalFoliage = ({ className = '' }) => (
  <div className={`botanical-header-leaves ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 220 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="botanical-header-svg"
      preserveAspectRatio="xMaxYMin meet"
    >
      {/* Background Soft Wash */}
      <path
        d="M 50 0 C 110 5, 160 15, 220 0 L 220 70 C 170 50, 100 45, 50 0 Z"
        fill="url(#bb-blush-grad)"
        opacity="0.12"
      />

      {/* Main Arching Stem from top right */}
      <path
        d="M 230 -10 C 180 10, 130 25, 60 22"
        stroke="url(#bb-dusty-grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Stem branch */}
      <path
        d="M 150 18 C 120 28, 95 38, 75 52"
        stroke="url(#bb-dusty-grad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Curved Leaves Along Main Stem */}
      <g>
        {/* Leaf 1 - Far Right */}
        <path
          d="M 195 6 C 180 20, 185 34, 198 32 C 210 26, 212 12, 195 6 Z"
          fill="url(#bb-dusty-grad)"
          opacity="0.65"
        />
        <path d="M 195 6 Q 192 22 198 32" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.6" />

        {/* Leaf 2 - Mid Top */}
        <path
          d="M 165 14 C 145 2, 130 8, 138 22 C 150 28, 162 24, 165 14 Z"
          fill="url(#bb-blush-grad)"
          opacity="0.8"
        />

        {/* Leaf 3 - Mid Hanging */}
        <path
          d="M 135 22 C 122 36, 126 50, 140 46 C 150 40, 148 26, 135 22 Z"
          fill="url(#bb-dusty-grad)"
          opacity="0.7"
        />
        <path d="M 135 22 Q 132 38 140 46" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />

        {/* Leaf 4 - Center Leaf */}
        <path
          d="M 105 24 C 88 12, 75 20, 84 34 C 95 38, 104 32, 105 24 Z"
          fill="url(#bb-blush-grad)"
          opacity="0.85"
        />

        {/* Leaf 5 - Lower Branch Leaf */}
        <path
          d="M 115 32 C 98 44, 102 58, 116 54 C 125 48, 124 38, 115 32 Z"
          fill="url(#bb-burgundy-grad)"
          opacity="0.45"
        />

        {/* Leaf 6 - Tip Leaflet */}
        <path
          d="M 75 52 C 60 58, 64 68, 76 65 C 84 60, 82 54, 75 52 Z"
          fill="url(#bb-dusty-grad)"
          opacity="0.75"
        />

        {/* Apex Tip */}
        <path
          d="M 60 22 C 45 20, 48 30, 58 30 C 64 28, 65 24, 60 22 Z"
          fill="url(#bb-blush-grad)"
          opacity="0.9"
        />
      </g>

      {/* Floating flower petals */}
      <path
        d="M 40 38 C 34 32, 25 36, 26 44 C 32 48, 42 46, 40 38 Z"
        fill="url(#bb-blush-grad)"
        opacity="0.8"
      />
      <circle cx="34" cy="41" r="1.5" fill="#BD7C91" opacity="0.6" />

      <path
        d="M 85 8 C 80 4, 74 6, 75 12 C 80 15, 87 14, 85 8 Z"
        fill="url(#bb-dusty-grad)"
        opacity="0.55"
      />
    </svg>
  </div>
);

/**
 * BotanicalCornerFlourish:
 * Flexible corner ornament featuring elegant layered botanical vines, contoured leaves, and floating petals.
 * Can be positioned at any corner: 'top-right', 'top-left', 'bottom-right', 'bottom-left'.
 */
export const BotanicalCornerFlourish = ({
  corner = 'bottom-right',
  size = 'md',
  opacity = 1,
  className = ''
}) => {
  const sizeMap = {
    sm: { width: 140, height: 140 },
    md: { width: 200, height: 200 },
    lg: { width: 280, height: 280 }
  };
  const dims = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`botanical-corner-flourish ${corner} ${size} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: dims.width, height: dims.height }}
      >
        {/* Soft Ambient Radial Bloom */}
        <ellipse cx="160" cy="160" rx="80" ry="80" fill="url(#bb-blush-grad)" opacity="0.25" filter="blur(25px)" />

        {/* Primary Stem curving gracefully outward from corner (200, 200) */}
        <path
          d="M 210 210 C 180 160, 140 120, 70 85 C 40 70, 20 40, 10 10"
          stroke="url(#bb-dusty-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Secondary Delicate Branch */}
        <path
          d="M 140 120 C 110 95, 80 85, 45 92"
          stroke="url(#bb-dusty-grad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Layer 1 - Deep / Base Leaves */}
        <g opacity="0.65">
          <path
            d="M 175 160 C 145 175, 128 155, 142 138 C 160 128, 185 140, 175 160 Z"
            fill="url(#bb-burgundy-grad)"
          />
          <path d="M 175 160 Q 155 152 142 138" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />

          <path
            d="M 125 105 C 100 115, 88 100, 100 85 C 115 78, 135 88, 125 105 Z"
            fill="url(#bb-burgundy-grad)"
          />
        </g>

        {/* Layer 2 - Mid Dusty Rose Leaves */}
        <g opacity="0.85">
          {/* Broad Curved Leaf 1 */}
          <path
            d="M 160 135 C 178 110, 168 85, 145 95 C 130 108, 140 128, 160 135 Z"
            fill="url(#bb-dusty-grad)"
          />
          <path d="M 160 135 Q 162 108 145 95" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5" />

          {/* Broad Leaf 2 */}
          <path
            d="M 108 98 C 85 75, 90 52, 112 58 C 126 70, 124 90, 108 98 Z"
            fill="url(#bb-dusty-grad)"
          />
          <path d="M 108 98 Q 100 75 112 58" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.5" />

          {/* Side Leaf 3 */}
          <path
            d="M 80 88 C 60 70, 48 80, 58 95 C 70 102, 85 96, 80 88 Z"
            fill="url(#bb-dusty-grad)"
          />
        </g>

        {/* Layer 3 - Blush Highlights & Blooming Petals */}
        <g opacity="0.9">
          {/* Soft Blush Leaflet */}
          <path
            d="M 68 75 C 50 55, 42 40, 60 38 C 76 46, 76 65, 68 75 Z"
            fill="url(#bb-blush-grad)"
          />
          <path d="M 68 75 Q 58 52 60 38" stroke="rgba(241, 217, 223, 0.8)" strokeWidth="0.6" />

          {/* Slender Tip Leaflet */}
          <path
            d="M 35 48 C 20 32, 18 20, 32 18 C 44 24, 44 38, 35 48 Z"
            fill="url(#bb-blush-grad)"
          />

          {/* Apex Bud */}
          <circle cx="10" cy="10" r="4" fill="#BD7C91" />
          <circle cx="16" cy="14" r="2.5" fill="#F1D9DF" />
        </g>

        {/* Floating Delicate Petals */}
        <g opacity="0.75">
          <path
            d="M 115 145 C 105 138, 104 126, 114 125 C 122 130, 124 140, 115 145 Z"
            fill="url(#bb-blush-grad)"
          />
          <path
            d="M 65 125 C 56 120, 55 110, 64 108 C 72 112, 72 122, 65 125 Z"
            fill="url(#bb-dusty-grad)"
          />
          <path
            d="M 45 35 C 38 30, 38 22, 46 22 C 52 26, 52 32, 45 35 Z"
            fill="url(#bb-blush-grad)"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * CardBotanicalAccent:
 * Subtle, polished botanical leaf and petal accent for selected dashboard card corners.
 * Sits unobtrusively in the background (z-index: 0, pointer-events: none) without impacting card text or interactions.
 */
export const CardBotanicalAccent = ({
  position = 'top-right',
  size = 'md',
  opacity = 0.28,
  className = ''
}) => {
  const sizeMap = {
    sm: { width: 90, height: 90 },
    md: { width: 120, height: 120 },
    lg: { width: 150, height: 150 }
  };
  const dims = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`card-botanical-accent ${position} ${size} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: dims.width, height: dims.height }}
      >
        {/* Soft Background Tint */}
        <circle cx="100" cy="20" r="45" fill="url(#bb-blush-grad)" opacity="0.4" filter="blur(16px)" />

        {/* Graceful Arching Sprig */}
        <path
          d="M 125 -5 C 95 15, 65 40, 25 65"
          stroke="url(#bb-dusty-grad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Leaf 1 - Outward */}
        <path
          d="M 98 8 C 82 22, 85 36, 100 32 C 110 26, 112 14, 98 8 Z"
          fill="url(#bb-dusty-grad)"
        />
        <path d="M 98 8 Q 94 24 100 32" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.5" />

        {/* Leaf 2 - Mid Accent */}
        <path
          d="M 75 22 C 58 12, 45 22, 55 35 C 68 40, 75 32, 75 22 Z"
          fill="url(#bb-blush-grad)"
        />

        {/* Leaf 3 - Hanging */}
        <path
          d="M 58 35 C 42 46, 45 58, 58 55 C 68 50, 68 40, 58 35 Z"
          fill="url(#bb-burgundy-grad)"
          opacity="0.6"
        />

        {/* Leaf 4 - Tip Leaflet */}
        <path
          d="M 35 55 C 20 62, 22 72, 34 70 C 42 66, 42 58, 35 55 Z"
          fill="url(#bb-dusty-grad)"
        />

        {/* Drift Petal */}
        <path
          d="M 22 45 C 16 38, 8 42, 10 50 C 16 54, 25 52, 22 45 Z"
          fill="url(#bb-blush-grad)"
        />
        <circle cx="14" cy="46" r="1.5" fill="#BD7C91" />
      </svg>
    </div>
  );
};

/**
 * PetalAccentCluster:
 * Delicate, organic petal cluster specifically tailored for AI recommendation cards,
 * banners, and empty feature areas.
 */
export const PetalAccentCluster = ({
  position = 'top-right',
  size = 'md',
  opacity = 0.35,
  className = ''
}) => {
  return (
    <div
      className={`petal-accent-cluster ${position} ${size} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size === 'sm' ? 65 : size === 'lg' ? 120 : 85, height: size === 'sm' ? 65 : size === 'lg' ? 120 : 85 }}
      >
        {/* Petal 1 - Large central rose petal */}
        <path
          d="M 50 15 C 30 15, 20 35, 35 55 C 50 70, 70 55, 65 35 C 60 20, 55 15, 50 15 Z"
          fill="url(#bb-blush-grad)"
        />
        <path
          d="M 50 15 Q 45 40 35 55"
          stroke="#BD7C91"
          strokeWidth="0.6"
          opacity="0.4"
        />

        {/* Petal 2 - Overlapping dusty rose petal */}
        <path
          d="M 65 35 C 80 40, 92 60, 75 75 C 60 85, 48 70, 52 55 C 55 45, 60 35, 65 35 Z"
          fill="url(#bb-dusty-grad)"
          opacity="0.8"
        />

        {/* Petal 3 - Small floating blush petal */}
        <path
          d="M 25 55 C 15 62, 14 75, 25 80 C 35 82, 40 70, 34 60 C 30 54, 28 54, 25 55 Z"
          fill="url(#bb-blush-grad)"
          opacity="0.7"
        />

        {/* Small pollen/dew drops */}
        <circle cx="50" cy="48" r="2.2" fill="#632D40" opacity="0.5" />
        <circle cx="56" cy="52" r="1.6" fill="#BD7C91" opacity="0.6" />
        <circle cx="44" cy="53" r="1.4" fill="#D49EAE" opacity="0.7" />
      </svg>
    </div>
  );
};

/**
 * BotanicalBannerFoliage:
 * Subtle decorative foliage designed to frame feature banners (e.g. Website Upgrades, At-Risk alert).
 */
export const BotanicalBannerFoliage = ({ position = 'right', className = '' }) => (
  <div className={`botanical-banner-foliage ${position} ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 180 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMid meet"
      style={{ width: 180, height: 80 }}
    >
      <ellipse cx="140" cy="40" rx="50" ry="30" fill="url(#bb-blush-grad)" opacity="0.3" filter="blur(15px)" />

      {/* Sweeping Stem */}
      <path
        d="M 190 70 C 150 65, 110 45, 70 30 C 50 22, 30 18, 10 20"
        stroke="url(#bb-dusty-grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Leaves along banner edge */}
      <path
        d="M 140 55 C 125 40, 130 25, 145 28 C 158 35, 155 48, 140 55 Z"
        fill="url(#bb-dusty-grad)"
        opacity="0.75"
      />
      <path
        d="M 110 42 C 92 52, 95 68, 110 65 C 122 58, 122 46, 110 42 Z"
        fill="url(#bb-burgundy-grad)"
        opacity="0.4"
      />
      <path
        d="M 80 32 C 68 18, 55 24, 62 38 C 72 44, 82 38, 80 32 Z"
        fill="url(#bb-blush-grad)"
        opacity="0.85"
      />
      <path
        d="M 45 22 C 32 10, 22 18, 28 30 C 38 35, 46 28, 45 22 Z"
        fill="url(#bb-dusty-grad)"
        opacity="0.7"
      />

      {/* Trailing petals */}
      <path
        d="M 20 40 C 14 35, 6 38, 8 45 C 14 48, 22 46, 20 40 Z"
        fill="url(#bb-blush-grad)"
        opacity="0.8"
      />
    </svg>
  </div>
);

/**
 * BotanicalFooter:
 * A decorative botanical footer with flowing organic wave shapes, contoured leafy stems,
 * and floating petals. Anchors the bottom of the platform elegantly.
 */
export const BotanicalFooter = ({ className = '' }) => (
  <footer className={`botanical-footer ${className}`}>
    {/* Flowing Organic SVG Wave & Foliage Header */}
    <div className="botanical-footer-wave" aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Deep Translucent Flowing Curve (Layer 1) */}
        <path
          d="M 0 45 C 240 15, 480 65, 720 35 C 960 5, 1200 55, 1440 25 L 1440 90 L 0 90 Z"
          fill="url(#bb-blush-grad)"
          opacity="0.3"
        />

        {/* Secondary Overlapping Curve (Layer 2) */}
        <path
          d="M 0 60 C 320 30, 640 75, 960 40 C 1200 15, 1340 50, 1440 40 L 1440 90 L 0 90 Z"
          fill="#FFFFFF"
          opacity="0.8"
        />

        {/* Foreground Solid Wave (Layer 3) */}
        <path
          d="M 0 72 C 360 48, 720 80, 1080 55 C 1260 42, 1380 62, 1440 58 L 1440 90 L 0 90 Z"
          fill="#FFFFFF"
        />

        {/* Left Foliage Flourish on the Wave */}
        <g transform="translate(60, 20) scale(0.65)" opacity="0.8">
          <path
            d="M 0 50 C 30 40, 70 20, 120 10"
            stroke="url(#bb-dusty-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 35 38 C 25 20, 40 10, 55 18 C 65 28, 55 40, 35 38 Z"
            fill="url(#bb-dusty-grad)"
          />
          <path
            d="M 75 22 C 70 5, 88 -2, 100 8 C 108 20, 95 30, 75 22 Z"
            fill="url(#bb-blush-grad)"
          />
          <path
            d="M 115 10 C 112 -2, 128 -8, 136 2 C 142 12, 132 18, 115 10 Z"
            fill="url(#bb-dusty-grad)"
          />
        </g>

        {/* Center Floating Petal Accents */}
        <g transform="translate(680, 35) scale(0.6)" opacity="0.75">
          <path
            d="M 0 10 C 10 2, 22 5, 24 15 C 20 25, 8 24, 0 10 Z"
            fill="url(#bb-blush-grad)"
          />
          <path
            d="M 40 5 C 48 -2, 58 0, 60 8 C 56 16, 46 15, 40 5 Z"
            fill="url(#bb-dusty-grad)"
          />
        </g>

        {/* Right Foliage Flourish on the Wave */}
        <g transform="translate(1260, 18) scale(0.65)" opacity="0.8">
          <path
            d="M 160 50 C 130 38, 90 22, 40 10"
            stroke="url(#bb-dusty-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 125 38 C 135 20, 120 10, 105 18 C 95 28, 105 40, 125 38 Z"
            fill="url(#bb-dusty-grad)"
          />
          <path
            d="M 85 22 C 90 5, 72 -2, 60 8 C 52 20, 65 30, 85 22 Z"
            fill="url(#bb-blush-grad)"
          />
          <path
            d="M 45 10 C 48 -2, 32 -8, 24 2 C 18 12, 28 18, 45 10 Z"
            fill="url(#bb-dusty-grad)"
          />
        </g>
      </svg>
    </div>

    {/* Footer Content Area */}
    <div className="botanical-footer-content">
      <div className="botanical-footer-inner">
        <div className="botanical-footer-brand">
          <div className="botanical-footer-logo">
            <span className="flower-symbol">🌸</span>
            <strong>Brand<span>Bloom</span></strong>
          </div>
          <p className="botanical-footer-tagline">
            Intelligent E-Commerce Optimization & Merchant Simulation Suite
          </p>
        </div>

        <div className="botanical-footer-meta">
          <div className="botanical-pill">
            <span className="pulse-leaf">🍃</span>
            <span>Botanical Design System Active</span>
          </div>
          <div className="botanical-copyright">
            © 2026 BrandBloom Commerce. All merchant improvements require owner verification.
          </div>
        </div>
      </div>
    </div>
  </footer>
);

/**
 * OrganicBackgroundCurves:
 * Gentle flowing organic background shapes placed in empty page areas
 * to elevate the overall ambient aesthetic without distracting from the UI.
 */
export const OrganicBackgroundCurves = () => (
  <div className="organic-bg-curves" aria-hidden="true">
    <div className="organic-blob blob-1" />
    <div className="organic-blob blob-2" />
    <div className="organic-blob blob-3" />
  </div>
);
