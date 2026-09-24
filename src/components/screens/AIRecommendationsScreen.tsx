import React, { useState } from 'react';
import { NavScreenId } from '../../types';
import { recommendations } from '../../data/mock';
import { cn, Icon, PageHeader, Section, Card, Badge, Button } from '../ui';

interface AirecommendationsScreenProps {
  onNavigate: (screen: NavScreenId) => void;
  onShowToast: (msg: string) => void;
}

const toneStyle: Record<string, { badge: 'good' | 'warn' | 'bad' | 'neutral' | 'primary'; icon: string; bar: string }> = {
  good: { badge: 'good', icon: 'trending_up', bar: 'bg-good' },
  warn: { badge: 'warn', icon: 'warning', bar: 'bg-warn' },
  bad: { badge: 'bad', icon: 'crisis_alert', bar: 'bg-bad' },
  neutral: { badge: 'neutral', icon: 'info', bar: 'bg-muted' },
  primary: { badge: 'primary', icon: 'auto_awesome', bar: 'bg-primary' },
};

export const AIRecommendationsScreen: React.FC<AirecommendationsScreenProps> = ({ onNavigate, onShowToast }) => {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const active = recommendations.filter((r) => !dismissed[r.id]);
  const avgConfidence = Math.round(active.reduce((s, r) => s + (r.confidence || 0), 0) / Math.max(active.length, 1));

  return (
    <div className="kf-fade-up">
      <PageHeader
        title="AI Recommendations"
        subtitle="What happened, why it matters, and what to do next — in one consistent feed."
        actions={
          active.length > 0 ? (
            <Button variant="ghost" size="sm" icon="done_all" onClick={() => onShowToast('All recommendations marked as reviewed.')}>
              Mark all reviewed
            </Button>
          ) : undefined
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="kf-eyebrow">Waiting on you</p>
          <p className="kf-metric-value mt-1.5">{active.length}</p>
          <p className="kf-helper mt-1.5">actionable recommendations in queue</p>
        </Card>
        <Card className="p-4">
          <p className="kf-eyebrow">Avg. model confidence</p>
          <p className="kf-metric-value mt-1.5 text-primary">{avgConfidence}%</p>
          <p className="kf-helper mt-1.5">XGBoost + Prophet ensemble</p>
        </Card>
        <Card className="p-4">
          <p className="kf-eyebrow">Priority mix</p>
          <p className="kf-metric-value mt-1.5">
            {active.filter((r) => r.tone === 'good').length}
            <span className="text-sm font-semibold text-muted"> opportunity</span> /{' '}
            {active.filter((r) => r.tone === 'bad' || r.tone === 'warn').length}
            <span className="text-sm font-semibold text-muted"> risk</span>
          </p>
          <p className="kf-helper mt-1.5">re-ordered by dollar impact</p>
        </Card>
      </div>

      <Section title="Recommended actions" subtitle="Each item follows the same format: what happened, why it matters, what to do" spacing>
        <div className="space-y-3">
          {active.length === 0 && (
            <Card className="p-10 text-center">
              <Icon name="task_alt" size={28} className="text-good" />
              <p className="mt-3 text-[15px] font-semibold text-ink">All caught up</p>
              <p className="kf-helper mt-1">No pending recommendations. New signals will appear here automatically.</p>
            </Card>
          )}
          {active.map((r) => {
            const style = toneStyle[r.tone];
            return (
              <Card key={r.id} className="relative overflow-hidden">
                <span className={cn('absolute inset-y-0 left-0 w-1', style.bar)} />
                <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={style.badge} dot>{r.tag}</Badge>
                      {r.confidence !== undefined && (
                        <span className="text-[11px] text-faint">Confidence {r.confidence}%</span>
                      )}
                    </div>
                    <h3 className="mt-2 text-[15px] font-semibold text-ink">{r.title}</h3>
                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[13px] sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <Icon name="lightbulb" size={15} className="mt-0.5 shrink-0 text-warn" />
                        <p className="text-muted">
                          <span className="font-semibold text-ink">Why it matters — </span>
                          {r.why}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="task_alt" size={15} className="mt-0.5 shrink-0 text-primary" />
                        <p className="text-muted">
                          <span className="font-semibold text-ink">Recommended action — </span>
                          {r.action}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2 lg:flex-col">
                    <Button
                      icon="arrow_forward"
                      onClick={() => r.navigate && onNavigate(r.navigate as NavScreenId)}
                      className="flex-1 lg:w-40"
                    >
                      Take action
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="close"
                      className="lg:w-40"
                      onClick={() => {
                        setDismissed((d) => ({ ...d, [r.id]: true }));
                        onShowToast('Recommendation dismissed.');
                      }}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </div>
  );
};