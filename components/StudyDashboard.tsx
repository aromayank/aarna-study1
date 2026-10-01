'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, BadgeCheck, BookOpenText, ChartNoAxesColumnIncreasing, CircleHelp, ClipboardList, House, Menu, Sparkles, SpellCheck, Volume2, X } from 'lucide-react';
import { curriculum, type Module, type Question } from '@/lib/curriculum';
import { ACTIVITY_QUESTION_COUNT, buildActivityQuestionSet, getActivityQuestionCount } from '@/lib/questionBank';
import { speakSpellingWord } from '@/lib/speech';
import { getSpellingWords, shuffleSpellingWords, spellingLevels, type SpellingLevel, type SpellingWord } from '@/lib/spelling';
import { getVocabularyTerms, vocabularySubjects } from '@/lib/vocabulary';

type ActivityMode = 'practice' | 'assignment' | 'assessment' | 'quiz';
type DashboardView = 'overview' | 'spelling' | 'vocabulary' | 'parent';
type Progress = Record<string, { attempts: number; best: number; last: number; totalScore?: number }>;
type ActivityRecord = { id: string; moduleId: string; moduleTitle: string; subject: string; mode: ActivityMode | 'spelling'; score: number; correct: number; total: number; completedAt: string; detail?: string };
type StudySession = { module: Module; mode: ActivityMode; questions: Question[]; index: number; correct: number; choice: string | null; checked: boolean; finished?: boolean; finalScore?: number };

const subjects = ['All subjects', 'ELA', 'Math', 'Science', 'Social Studies'];
const curriculumGuides = [
  { label: 'ELA · Grade 7', subject: 'ELA', url: './curriculum/ELA_-_Grade_7.pdf' },
  { label: 'ELA · Honors', subject: 'ELA', url: './curriculum/ELA_Honors_-_Grade_7.pdf' },
  { label: 'Math · Honors', subject: 'Math', url: './curriculum/Mathematics_Honors_-_Grade_7.pdf' },
  { label: 'Science · Grade 7', subject: 'Science', url: './curriculum/Science---Grade-7.pdf' },
  { label: 'Social Studies · Grade 7', subject: 'Social Studies', url: './curriculum/Middle_School_Social_Studies_-_Grade_7.pdf' },
  { label: 'G.L.O.B.E. · Grades 6–7', subject: 'Interdisciplinary', url: './curriculum/G.L.O.B.E.---Grades-6-7.pdf' }
];

function readProgress(): Progress {
  try {
    return JSON.parse(window.localStorage.getItem('aarna-study-progress') || window.localStorage.getItem('salk-study-progress') || '{}') as Progress;
  } catch {
    return {};
  }
}

function readCompleted(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem('aarna-study-completed') || window.localStorage.getItem('salk-study-completed') || '[]') as string[];
  } catch {
    return [];
  }
}

function readActivityRecords(): ActivityRecord[] {
  try {
    const records: unknown = JSON.parse(window.localStorage.getItem('aarna-study-activity-records') || '[]');
    return Array.isArray(records) ? records as ActivityRecord[] : [];
  } catch {
    return [];
  }
}

function getPeriodLabel(periodId: string) {
  return curriculum.find((item) => item.id === periodId)?.name ?? 'Marking Period 1';
}

export default function StudyDashboard() {
  const [periodId, setPeriodId] = useState(curriculum[0].id);
  const [subject, setSubject] = useState('All subjects');
  const [view, setView] = useState<DashboardView>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState<Progress>({});
  const [completed, setCompleted] = useState<string[]>([]);
  const [activityRecords, setActivityRecords] = useState<ActivityRecord[]>([]);
  const [session, setSession] = useState<StudySession | null>(null);
  const [spellingLevel, setSpellingLevel] = useState<SpellingLevel>('easy');
  const [spellingRound, setSpellingRound] = useState<SpellingWord[]>(() => shuffleSpellingWords(getSpellingWords(curriculum[0].id, 'easy')));
  const [spellingIndex, setSpellingIndex] = useState(0);
  const [spellingAnswer, setSpellingAnswer] = useState('');
  const [spellingFeedback, setSpellingFeedback] = useState('');
  const [vocabularySubject, setVocabularySubject] = useState<(typeof vocabularySubjects)[number]>('ELA');
  const [revealedVocabulary, setRevealedVocabulary] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setProgress(readProgress());
      setCompleted(readCompleted());
      setActivityRecords(readActivityRecords());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  const period = curriculum.find((item) => item.id === periodId) ?? curriculum[0];
  const modules = period.modules.filter((module) => subject === 'All subjects' || module.domain === subject || (subject === 'ELA' && module.domain.includes('ELA')));
  const totalAttempts = activityRecords.length || Object.values(progress).reduce((sum, item) => sum + item.attempts, 0);
  const average = activityRecords.length
    ? Math.round(activityRecords.reduce((sum, record) => sum + record.score, 0) / activityRecords.length)
    : totalAttempts
      ? Math.round(Object.values(progress).reduce((sum, item) => sum + (item.totalScore ?? item.last), 0) / totalAttempts)
    : null;
  const assignmentCount = Math.max(completed.length, activityRecords.filter((record) => record.mode === 'assignment').length);
  const modeLabels: Record<ActivityRecord['mode'], string> = { practice: 'Practice', assignment: 'Assignments', assessment: 'Assessments', quiz: 'Quizzes', spelling: 'Spelling' };
  const activityCounts = (Object.keys(modeLabels) as ActivityRecord['mode'][]).map((mode) => ({ mode, label: modeLabels[mode], count: activityRecords.filter((record) => record.mode === mode).length }));

  function moduleProgress(moduleId: string) {
    const records = Object.entries(progress).filter(([key]) => key.startsWith(`${moduleId}:`)).map(([, record]) => record);
    return records.length ? { attempts: records.reduce((sum, record) => sum + record.attempts, 0), best: Math.max(...records.map((record) => record.best)) } : null;
  }

  function startActivity(module: Module, mode: ActivityMode) {
    const questions = buildActivityQuestionSet(module.id, ACTIVITY_QUESTION_COUNT);
    if (questions.length) setSession({ module, mode, questions, index: 0, correct: 0, choice: null, checked: false });
  }

  function navigateToView(nextView: DashboardView) {
    setView(nextView);
    setIsMobileMenuOpen(false);
  }

  function finishActivity(correct: number, count: number) {
    if (!session) return;
    const score = Math.round((correct / count) * 100);
    const key = `${session.module.id}:${session.mode}`;
    const next = { ...progress, [key]: {
      attempts: (progress[key]?.attempts ?? 0) + 1,
      best: Math.max(progress[key]?.best ?? 0, score),
      last: score,
      totalScore: (progress[key]?.totalScore ?? progress[key]?.last ?? 0) + score
    } };
    setProgress(next);
    window.localStorage.setItem('aarna-study-progress', JSON.stringify(next));
    const record: ActivityRecord = {
      id: `${session.module.id}-${session.mode}-${Date.now()}`,
      moduleId: session.module.id,
      moduleTitle: session.module.title,
      subject: session.module.domain,
      mode: session.mode,
      score,
      correct,
      total: count,
      completedAt: new Date().toISOString()
    };
    const nextRecords = [record, ...activityRecords];
    setActivityRecords(nextRecords);
    window.localStorage.setItem('aarna-study-activity-records', JSON.stringify(nextRecords));
    if (session.mode === 'assignment' && !completed.includes(session.module.id)) {
      const nextCompleted = [...completed, session.module.id];
      setCompleted(nextCompleted);
      window.localStorage.setItem('aarna-study-completed', JSON.stringify(nextCompleted));
    }
    setSession({ ...session, finished: true, finalScore: score });
  }

  function hearWord() {
    const currentWord = spellingRound[spellingIndex]?.word;
    if (currentWord) speakSpellingWord(currentWord);
  }

  function checkSpelling() {
    const currentWord = spellingRound[spellingIndex];
    if (!currentWord) return;
    const correct = spellingAnswer.trim().toLowerCase() === currentWord.word;
    setSpellingFeedback(correct ? 'That’s right. Nicely spelled.' : `Not quite. The word was “${currentWord.word}”.`);
    const score = correct ? 100 : 0;
    const record: ActivityRecord = {
      id: `spelling-${periodId}-${spellingLevel}-${Date.now()}`,
      moduleId: `spelling-${periodId}-${spellingLevel}`,
      moduleTitle: `${getPeriodLabel(periodId)} spelling bee · ${spellingLevel}`,
      subject: 'Spelling',
      mode: 'spelling',
      score,
      correct: correct ? 1 : 0,
      total: 1,
      completedAt: new Date().toISOString(),
      detail: currentWord.word
    };
    const nextRecords = [record, ...activityRecords];
    setActivityRecords(nextRecords);
    window.localStorage.setItem('aarna-study-activity-records', JSON.stringify(nextRecords));
    const spellingKey = `${record.moduleId}:spelling`;
    const old = progress[spellingKey];
    const nextProgress = { ...progress, [spellingKey]: { attempts: (old?.attempts ?? 0) + 1, best: Math.max(old?.best ?? 0, score), last: score, totalScore: (old?.totalScore ?? old?.last ?? 0) + score } };
    setProgress(nextProgress);
    window.localStorage.setItem('aarna-study-progress', JSON.stringify(nextProgress));
  }

  function nextSpellingWord() {
    if (spellingIndex + 1 >= spellingRound.length) {
      setSpellingRound(shuffleSpellingWords(getSpellingWords(periodId, spellingLevel)));
      setSpellingIndex(0);
    } else {
      setSpellingIndex((index) => index + 1);
    }
    setSpellingAnswer('');
    setSpellingFeedback('');
  }

  function startSpellingRound(level: SpellingLevel) {
    setSpellingLevel(level);
    setSpellingRound(shuffleSpellingWords(getSpellingWords(periodId, level)));
    setSpellingIndex(0);
    setSpellingAnswer('');
    setSpellingFeedback('');
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar${isMobileMenuOpen ? ' mobile-open' : ''}`}>
        <a className="brand" href="#home" onClick={() => navigateToView('overview')}><span className="brand-mark"><Image src="/aarna-muse.svg" alt="" width={40} height={40} priority /></span><span>Aarna <span className="brand-light">Study</span></span></a>
        <div className="school-label">JONAS SALK MIDDLE SCHOOL</div>
        <nav className="side-nav" id="study-main-navigation" aria-label="Main navigation">
          <button className={view === 'overview' ? 'nav-link active' : 'nav-link'} onClick={() => navigateToView('overview')}><House className="nav-icon" size={17} strokeWidth={1.8} />My learning</button>
          <button className={view === 'spelling' ? 'nav-link active' : 'nav-link'} onClick={() => { navigateToView('spelling'); startSpellingRound('easy'); }}><SpellCheck className="nav-icon" size={17} strokeWidth={1.8} />Spelling bee</button>
          <button className={view === 'vocabulary' ? 'nav-link active' : 'nav-link'} onClick={() => { navigateToView('vocabulary'); setRevealedVocabulary({}); }}><BookOpenText className="nav-icon" size={17} strokeWidth={1.8} />Vocabulary</button>
          <button className={view === 'parent' ? 'nav-link active' : 'nav-link'} onClick={() => navigateToView('parent')}><ChartNoAxesColumnIncreasing className="nav-icon" size={17} strokeWidth={1.8} />Progress report</button>
        </nav>
        <div className="sidebar-bottom"><span className="avatar">A</span><span><strong>Aarna</strong><small>7th grade</small></span><span className="local-badge" title="Saved only on this device">●</span></div>
      </aside>
      {isMobileMenuOpen && <button className="mobile-nav-scrim" type="button" aria-label="Close navigation" onClick={() => setIsMobileMenuOpen(false)} />}

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-leading">
            <button className="mobile-menu-button" type="button" aria-label="Open main menu" aria-controls="study-main-navigation" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(true)}><Menu size={20} /></button>
            <a className="mobile-brand" href="#home" onClick={() => navigateToView('overview')}><Image src="/aarna-muse.svg" alt="" width={38} height={38} priority /><span>Aarna <strong>Study</strong></span></a>
            <span className="desktop-breadcrumb">Aarna <span className="crumb">/ {view === 'spelling' ? 'Spelling bee' : view === 'vocabulary' ? 'Vocabulary' : view === 'parent' ? 'Progress report' : 'My learning'}</span></span>
          </div>
          <span className="today-label">A little practice goes a long way</span>
        </header>
        <div className="content-wrap">
          {view === 'vocabulary' && <section className="vocabulary-view">
            <p className="eyebrow">WORDS FROM YOUR STUDY PLAN</p>
            <h1>Curriculum vocabulary</h1>
            <p className="welcome-copy">Review key terms from the ELA, Math, and Social Studies units for each marking period.</p>
            <div className="period-tabs" role="tablist" aria-label="Vocabulary marking period">{curriculum.map((item, index) => <button key={item.id} role="tab" aria-selected={periodId === item.id} className={periodId === item.id ? 'period-tab selected' : 'period-tab'} onClick={() => { setPeriodId(item.id); setRevealedVocabulary({}); }}><span>MP {index + 1}</span><small>{['Sep – Nov', 'Nov – Jan', 'Jan – Mar', 'Mar – Jun'][index]}</small></button>)}</div>
            <div className="vocabulary-subjects" role="tablist" aria-label="Vocabulary subject">{vocabularySubjects.map((name) => <button key={name} role="tab" aria-selected={vocabularySubject === name} className={vocabularySubject === name ? 'vocabulary-subject selected' : 'vocabulary-subject'} onClick={() => { setVocabularySubject(name); setRevealedVocabulary({}); }}>{name}</button>)}</div>
            <div className="vocabulary-heading"><div><p className="eyebrow">{period.name.toUpperCase()} · {vocabularySubject.toUpperCase()}</p><h2>{period.modules.find((module) => module.domain === vocabularySubject)?.title}</h2><p>Tap a term to reveal its meaning in this unit.</p></div><span className="vocabulary-count">{getVocabularyTerms(periodId, vocabularySubject).length} TERMS</span></div>
            <div className="vocabulary-grid">{getVocabularyTerms(periodId, vocabularySubject).map((item, index) => {
              const key = `${periodId}-${vocabularySubject}-${item.term}`;
              const revealed = Boolean(revealedVocabulary[key]);
              return <button key={item.term} className={revealed ? 'vocabulary-card revealed' : 'vocabulary-card'} aria-expanded={revealed} onClick={() => setRevealedVocabulary((current) => ({ ...current, [key]: !current[key] }))}>
                <span className="vocabulary-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.term}</strong>
                <span className="vocabulary-definition">{revealed ? item.definition : 'Tap to reveal definition'}</span>
              </button>;
            })}</div>
          </section>}

          {view === 'overview' && <>
            <div className="welcome-row"><div><p className="eyebrow">YOUR LEARNING, AT YOUR PACE</p><h1>Aarna</h1><p className="welcome-copy">Your Grade 7 study space. Pick up where you left off, or choose something new.</p></div><div className="week-note"><span className="week-sun"><Sparkles size={17} /></span><span><strong>One step at a time</strong><small>Every question is progress.</small></span></div></div>
            <section className="stats-row" aria-label="Your study stats">
              <div className="stat-item"><span className="stat-label">PRACTICE SESSIONS</span><strong>{totalAttempts}</strong><span className="stat-note">completed</span></div>
              <div className="stat-item"><span className="stat-label">AVERAGE SCORE</span><strong>{average === null ? '—' : `${average}%`}</strong><span className="stat-note">across your attempts</span></div>
              <div className="stat-item"><span className="stat-label">ASSIGNMENTS</span><strong>{assignmentCount}</strong><span className="stat-note">submitted</span></div>
              <div className="stat-item stat-accent"><span className="stat-label">THIS PERIOD</span><strong>{period.modules.length}</strong><span className="stat-note">learning modules</span></div>
            </section>

            <section className="curriculum-section">
              <div className="section-heading"><div><p className="eyebrow">YOUR STUDY PLAN</p><h2>Explore your subjects</h2></div><label className="subject-select"><span className="sr-only">Filter by subject</span><select value={subject} onChange={(event) => setSubject(event.target.value)}>{subjects.map((name) => <option key={name}>{name}</option>)}</select></label></div>
              <div className="period-tabs" role="tablist" aria-label="Marking period">{curriculum.map((item, index) => <button key={item.id} role="tab" aria-selected={periodId === item.id} className={periodId === item.id ? 'period-tab selected' : 'period-tab'} onClick={() => setPeriodId(item.id)}><span>MP {index + 1}</span><small>{['Sep – Nov', 'Nov – Jan', 'Jan – Mar', 'Mar – Jun'][index]}</small></button>)}</div>
              <div className="period-intro"><span className="period-dot"/><div><strong>{period.name}</strong><p>{period.focus}</p></div></div>
              <section className="source-panel" aria-label="District curriculum documents"><div className="source-heading"><div><strong>District curriculum guides</strong><p>Each activity draws 60 randomized questions from unit-aligned prompts. Generated variations need teacher review before publishing.</p></div><span className="source-status">GRADE 7</span></div><div className="source-links">{curriculumGuides.map((guide) => <a key={guide.url} href={guide.url} target="_blank" rel="noreferrer">{guide.label}<ArrowUpRight aria-hidden="true" size={11} /></a>)}</div></section>
              <div className="module-grid">{modules.length ? modules.map((module, index) => {
                const record = moduleProgress(module.id);
                return <article className="module-card" key={module.id}>
                  <div className="module-top"><span className={`subject-tag subject-${module.domain.toLowerCase().replace(/[^a-z]/g, '')}`}>{module.domain}</span><span className="module-number">0{index + 1}</span></div>
                  <h3>{module.title}</h3><span className="module-level">{module.courseLevel}</span><p className="module-goal">{module.practiceGoal}</p>
                  <div className="practice-meta"><span>{getActivityQuestionCount(module.id)} randomized questions per activity</span>{record && <span>Best {record.best}%</span>}</div>
                  <div className="module-actions"><button className="primary-button" onClick={() => startActivity(module, 'practice')}><BookOpenText size={14} />Practice</button><button className="activity-button" onClick={() => startActivity(module, 'assignment')}><ClipboardList size={14} />Assignment</button><button className="activity-button" onClick={() => startActivity(module, 'assessment')}><BadgeCheck size={14} />Assessment</button><button className="activity-button" onClick={() => startActivity(module, 'quiz')}><CircleHelp size={14} />Quiz</button></div>
                  {(completed.includes(module.id) || activityRecords.some((record) => record.moduleId === module.id && record.mode === 'assignment')) && <p className="assignment-complete"><BadgeCheck size={13} /> Assignment submitted in this browser</p>}
                </article>;
              }) : <div className="empty-state">No {subject} module is listed for this marking period yet.</div>}</div>
            </section>
            <p className="data-note">Progress is saved in this browser on this device and appears in Aarna’s progress report.</p>
          </>}

          {view === 'spelling' && <section className="spelling-view"><p className="eyebrow">LISTEN, THINK, SPELL</p><h1>Aarna Spelling Bee</h1><p className="welcome-copy">Choose a marking period and difficulty. Words are shuffled from the Grade 7 study lists.</p><div className="spelling-controls"><label>Marking period<select value={periodId} onChange={(event) => { setPeriodId(event.target.value); setSpellingRound(shuffleSpellingWords(getSpellingWords(event.target.value, spellingLevel))); setSpellingIndex(0); setSpellingAnswer(''); setSpellingFeedback(''); }}>{curriculum.map((item, index) => <option key={item.id} value={item.id}>Marking Period {index + 1}</option>)}</select></label><div className="difficulty-control" aria-label="Word difficulty">{spellingLevels.map((level) => <button key={level} className={spellingLevel === level ? 'difficulty-button selected' : 'difficulty-button'} aria-pressed={spellingLevel === level} onClick={() => startSpellingRound(level)}>{level}</button>)}</div></div><div className="spelling-panel"><span className="word-count">WORD {spellingIndex + 1} OF {spellingRound.length} · {spellingLevel.toUpperCase()}</span><div className="sound-orbit"><Volume2 size={25} /></div><h2>Listen for your word</h2><p className="spelling-hint">Hint: {spellingRound[spellingIndex]?.hint}</p><button className="primary-button listen-button" onClick={hearWord}><Volume2 size={15} /><span>Listen to the word</span></button><form className="spelling-form" onSubmit={(event) => { event.preventDefault(); checkSpelling(); }}><label htmlFor="spelling-answer">Your spelling</label><div className="spelling-input-row"><input id="spelling-answer" value={spellingAnswer} onChange={(event) => setSpellingAnswer(event.target.value)} autoComplete="off" placeholder="Type the word here" disabled={Boolean(spellingFeedback)}/><button className="primary-button" type="submit" disabled={!spellingAnswer.trim() || Boolean(spellingFeedback)}>Check</button></div></form>{spellingFeedback && <div className={spellingFeedback.startsWith('That') ? 'spelling-feedback correct' : 'spelling-feedback'} role="status">{spellingFeedback}<button onClick={nextSpellingWord}>Next word <ArrowRight size={12} /></button></div>}<p className="speech-note">Your spelling results are included in this device’s progress report.</p></div></section>}

          {view === 'parent' && <section className="report-view"><p className="eyebrow">A CLEAR VIEW OF THE WORK</p><h1>Aarna’s progress</h1><p className="welcome-copy">Activity results, scores, and assignment submissions saved on this device.</p><div className="report-summary"><div><span className="stat-label">ACTIVITIES</span><strong>{totalAttempts}</strong></div><div><span className="stat-label">AVERAGE SCORE</span><strong>{average === null ? '—' : `${average}%`}</strong></div><div><span className="stat-label">ASSIGNMENTS SUBMITTED</span><strong>{assignmentCount}</strong></div></div><div className="mode-summary">{activityCounts.map((item) => <div className="mode-summary-item" key={item.mode}><span>{item.label}</span><strong>{item.count}</strong></div>)}</div><h2>By learning module</h2><div className="report-list">{curriculum.flatMap((item) => item.modules).map((module) => { const records = activityRecords.filter((record) => record.moduleId === module.id); const record = moduleProgress(module.id); return <div className="report-row" key={module.id}><span className={`subject-tag subject-${module.domain.toLowerCase().replace(/[^a-z]/g, '')}`}>{module.domain}</span><strong>{module.title}</strong><span>{records.length ? `${records.length} activities · best ${record?.best}% · latest ${records[0].score}%` : 'Not started'}</span></div>; })}</div><h2 className="recent-heading">Recent activity</h2>{activityRecords.length ? <div className="recent-activity">{activityRecords.slice(0, 12).map((record) => <div className="recent-row" key={record.id}><span className="recent-result"><strong>{record.score}%</strong><small>{record.correct}/{record.total} correct</small></span><span className="recent-description"><strong>{record.moduleTitle}</strong><small>{modeLabels[record.mode]}{record.detail ? ` · ${record.detail}` : ''} · {new Date(record.completedAt).toLocaleString()}</small></span></div>)}</div> : <p className="empty-state">Completed practice, assignments, assessments, quizzes, and spelling words will appear here.</p>}<p className="data-note">Parent monitoring is currently local to this browser. It is not a secure account or synced across devices; private sign-in and consent controls are needed before sharing student records online.</p></section>}
        </div>
      </section>

      {session && <div className="modal-backdrop" role="presentation"><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><div className="quiz-header"><div><span className="eyebrow">{session.mode.toUpperCase()} · {session.mode === 'assignment' ? 'WEEKLY WORK' : session.mode === 'assessment' ? 'SCORED CHECK' : 'GUIDED PRACTICE'}</span><h2 id="quiz-title">{session.module.title}</h2></div><button className="close-button" onClick={() => setSession(null)} aria-label="Close activity"><X size={17} /></button></div>{session.finished ? <div className="activity-result"><BadgeCheck size={34} /><p className="eyebrow">{session.mode === 'assignment' ? 'ASSIGNMENT SUBMITTED' : 'SESSION COMPLETE'}</p><h3>{session.finalScore}%</h3><p>{session.correct} of {session.questions.length} answers correct.</p><button className="primary-button" onClick={() => setSession(null)}>Back to study plan</button></div> : <>{session.mode === 'assignment' && <div className="assignment-brief"><ClipboardList size={16} /><p>{session.module.assignment}</p></div>}<div className="quiz-progress"><span style={{ width: `${((session.index + 1) / session.questions.length) * 100}%` }}/></div><p className="question-count">QUESTION {session.index + 1} OF {session.questions.length}</p><h3 className="question-prompt">{session.questions[session.index].prompt}</h3><div className="choice-list">{session.questions[session.index].choices.map((choice, index) => <button key={choice} className={`choice-button${session.choice === choice ? ' chosen' : ''}${session.checked && session.mode !== 'assessment' && choice === session.questions[session.index].answer ? ' answer-correct' : ''}${session.checked && session.mode !== 'assessment' && session.choice === choice && choice !== session.questions[session.index].answer ? ' answer-wrong' : ''}`} disabled={session.checked} onClick={() => setSession({ ...session, choice })}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div>{session.checked && session.mode !== 'assessment' && <p className="answer-explanation">{session.choice === session.questions[session.index].answer ? 'Correct. ' : 'Not quite. '}{session.questions[session.index].explanation}</p>}<div className="quiz-footer"><span>{session.correct} correct so far</span><button className="primary-button" disabled={!session.choice && !session.checked} onClick={() => {
        if (!session.checked) {
          setSession({ ...session, checked: true, correct: session.correct + (session.choice === session.questions[session.index].answer ? 1 : 0) });
          return;
        }
        if (session.index + 1 === session.questions.length) finishActivity(session.correct, session.questions.length);
        else setSession({ ...session, index: session.index + 1, choice: null, checked: false });
      }}>{session.checked ? session.index + 1 === session.questions.length ? 'Submit activity' : 'Next question' : 'Check answer'}</button></div></>}</section></div>}
    </main>
  );
}
