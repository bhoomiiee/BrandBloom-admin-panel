import React, { useState } from 'react';

export function RevenueTrendChart({ data = [], height = 240 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#806B73' }}>
        No trend data available
      </div>
    );
  }

  const padding = { top: 20, right: 30, bottom: 35, left: 65 };
  const width = 640;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const revenues = data.map(d => d.revenue);
  const minVal = Math.min(...revenues) * 0.9;
  const maxVal = Math.max(...revenues) * 1.08;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((d.revenue - minVal) / (maxVal - minVal)) * innerHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="burgundyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#632D40" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#BD7C91" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F1D9DF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = padding.top + innerHeight * (1 - ratio);
          const val = Math.round(minVal + (maxVal - minVal) * ratio);
          return (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#E8DDE0"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#806B73"
                fontFamily="sans-serif"
              >
                ₹{(val / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#burgundyGradient)" />

        {/* Line stroke */}
        <path d={pathD} fill="none" stroke="#632D40" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points & Interactive circles */}
        {points.map((p, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <g
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 6 : 4}
                fill={isHovered ? '#F1D9DF' : '#632D40'}
                stroke={isHovered ? '#632D40' : '#FFFFFF'}
                strokeWidth="2"
                style={{ transition: 'all 0.15s ease' }}
              />
              <circle cx={p.x} cy={p.y} r="18" fill="transparent" />

              {/* X Axis Label */}
              <text
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#806B73"
                fontWeight={isHovered ? '700' : '500'}
              >
                {p.date}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating tooltip */}
      {hoveredIdx !== null && points[hoveredIdx] && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 16,
          background: '#4A1E2E',
          color: '#FFFFFF',
          padding: '6px 14px',
          borderRadius: 8,
          fontSize: '0.82rem',
          border: '1px solid #BD7C91',
          boxShadow: '0 6px 16px rgba(74, 30, 46, 0.25)',
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}>
          <span style={{ color: '#F1D9DF', fontWeight: 700 }}>{points[hoveredIdx].date}:</span>
          <span>₹{points[hoveredIdx].revenue.toLocaleString('en-IN')}</span>
          <span style={{ color: '#D49EAE' }}>({points[hoveredIdx].orders} orders)</span>
        </div>
      )}
    </div>
  );
}

export function CategoryBarChart({ data = [] }) {
  if (!data || data.length === 0) return null;

  const barColors = ['#632D40', '#BD7C91', '#D49EAE', '#E4C0CA', '#CCA5B0'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {data.map((item, idx) => (
        <div key={idx}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 5 }}>
            <span style={{ fontWeight: 600, color: '#3D202B' }}>{item.category}</span>
            <span style={{ color: '#806B73', fontWeight: 500 }}>
              ₹{item.revenue?.toLocaleString('en-IN')} ({item.percentage}%)
            </span>
          </div>
          <div style={{ height: 8, background: '#F2EAEC', borderRadius: 999, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${item.percentage}%`,
                background: barColors[idx % barColors.length],
                borderRadius: 999,
                transition: 'width 0.6s ease'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
