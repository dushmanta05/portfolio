import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Simple gradient background -->
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0751cf;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#042a5c;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Decorative circles - well positioned -->
      <circle cx="950" cy="120" r="100" fill="rgba(255,255,255,0.06)"/>
      <circle cx="1100" cy="250" r="60" fill="rgba(255,255,255,0.04)"/>
      <circle cx="150" cy="500" r="40" fill="rgba(255,255,255,0.05)"/>
      <circle cx="1050" cy="520" r="80" fill="rgba(255,255,255,0.03)"/>
      
      <!-- Code decoration </> - positioned left of upper circle -->
      <text x="620" y="160" font-family="JetBrains Mono, monospace" 
            font-size="140" font-weight="300" fill="rgba(255,255,255,0.08)">
        &lt;/&gt;
      </text>
      
      <!-- Name -->
      <text x="120" y="220" font-family="system-ui, -apple-system, sans-serif" 
            font-size="72" font-weight="700" fill="white">
        Dushmanta
      </text>
      
      <!-- Roles with pipes -->
      <text x="120" y="280" font-family="system-ui, -apple-system, sans-serif" 
            font-size="28" font-weight="400" fill="rgba(255,255,255,0.8)">
        Full-Stack Developer | Tech Blogger | Freelancer | Educator
      </text>
      
      <!-- Code block with better background -->
      <rect x="120" y="330" width="600" height="80" fill="rgba(0,0,0,0.4)" rx="8" 
            stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      
      <text x="140" y="360" font-family="JetBrains Mono, Monaco, 'Courier New', monospace" 
            font-size="16" font-weight="400" fill="rgba(255,255,255,0.85)">
        const developer = {
      </text>
      <text x="160" y="380" font-family="JetBrains Mono, Monaco, 'Courier New', monospace" 
            font-size="16" font-weight="400" fill="rgba(255,255,255,0.85)">
        passion: "building efficient solutions"
      </text>
      <text x="140" y="400" font-family="JetBrains Mono, Monaco, 'Courier New', monospace" 
            font-size="16" font-weight="400" fill="rgba(255,255,255,0.85)">
        };
      </text>
      
      <!-- Curly braces decoration -->
      <text x="860" y="500" font-family="JetBrains Mono, monospace" 
            font-size="80" font-weight="300" fill="rgba(255,255,255,0.06)">
        { }
      </text>
      
    </svg>
  `;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
