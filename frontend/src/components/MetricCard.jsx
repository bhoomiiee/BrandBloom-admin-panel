import React from 'react';
import { CardBotanicalAccent } from './BotanicalDecorations';

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  highlight = 'none', // 'yellow', 'red', 'blue'
  description,
  onClick
}) {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <div
      className={`kpi-card ${highlight !== 'none' ? `highlight-${highlight}` : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {highlight !== 'none' && <CardBotanicalAccent position="top-right" size="sm" opacity={0.18} />}
      <div className="kpi-header">
        <span className="kpi-label">{title}</span>
        {Icon && (
          <div className={`kpi-icon-box ${highlight === 'red' ? 'red' : highlight === 'yellow' ? 'yellow' : ''}`}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="kpi-value">{value}</div>

      <div className="kpi-meta">
        {trend !== undefined && (
          <span className={`trend-badge ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
            {isPositive ? `+${trend}%` : `${trend}%`}
          </span>
        )}
        <span>{trendLabel || description}</span>
      </div>
    </div>
  );
}
