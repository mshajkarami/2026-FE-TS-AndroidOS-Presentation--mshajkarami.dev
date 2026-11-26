import { useState } from 'react';
import { Award, CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { CLASS_QUIZ_QUESTIONS } from '../data/presentationData';

export function ClassQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = CLASS_QUIZ_QUESTIONS.filter((q) => answers[q.id] === q.correctId).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
      <div
        className="glass-card stagger-1"
        style={{
          padding: '0.8rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: answeredCount === CLASS_QUIZ_QUESTIONS.length ? '#3ddc84' : 'var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Trophy size={20} color="#fbbf24" />
          <span style={{ fontWeight: 800, fontSize: '0.96rem' }}>
            امتیاز کلاس تا این لحظه:{' '}
            <span className="mono" style={{ color: '#3ddc84' }}>
              {correctCount} / {CLASS_QUIZ_QUESTIONS.length}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setAnswers({})}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            border: '1px solid var(--border-subtle)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={13} />
          <span>شروع مجدد</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.95rem' }}>
        {CLASS_QUIZ_QUESTIONS.map((q, idx) => {
          const picked = answers[q.id];
          const isCorrect = picked === q.correctId;

          return (
            <div
              key={q.id}
              className={`glass-card stagger-${idx + 2}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
                borderTop: picked
                  ? `2.5px solid ${isCorrect ? '#3ddc84' : '#fb7185'}`
                  : '2.5px solid #38bdf8',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.92rem', lineHeight: 1.65 }}>
                {q.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.42rem' }}>
                {q.options.map((opt) => {
                  const isThisPicked = picked === opt.id;
                  const isThisCorrect = opt.id === q.correctId;
                  let border = '1px solid var(--border-subtle)';
                  let bg = 'rgba(255,255,255,0.03)';
                  let color = '#e2e8f0';

                  if (picked) {
                    if (isThisCorrect) {
                      border = '1.5px solid #3ddc84';
                      bg = 'rgba(61,220,132,0.16)';
                      color = '#3ddc84';
                    } else if (isThisPicked) {
                      border = '1.5px solid #fb7185';
                      bg = 'rgba(251,113,133,0.16)';
                      color = '#fb7185';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                      style={{
                        textAlign: 'right',
                        padding: '0.52rem 0.72rem',
                        borderRadius: '10px',
                        border,
                        background: bg,
                        color,
                        fontSize: '0.8rem',
                        fontWeight: isThisPicked || (picked && isThisCorrect) ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.4rem',
                      }}
                    >
                      <span>{opt.text}</span>
                      {picked && isThisCorrect && <CheckCircle2 size={15} color="#3ddc84" />}
                      {picked && isThisPicked && !isThisCorrect && <XCircle size={15} color="#fb7185" />}
                    </button>
                  );
                })}
              </div>

              {picked && (
                <div
                  className="slide-animate"
                  style={{
                    marginTop: 'auto',
                    padding: '0.55rem 0.7rem',
                    borderRadius: '9px',
                    background: 'rgba(255,255,255,0.035)',
                    fontSize: '0.76rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  <Award size={13} color="#fbbf24" style={{ display: 'inline', marginLeft: '4px' }} />
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
