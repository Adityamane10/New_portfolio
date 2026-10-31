import type { CSSProperties } from 'react'

import type { Project } from '../../data/site'
import { cx } from '../lib/cx'
import { Mark } from './Mark'

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  const style = { '--project-accent': project.accent } as CSSProperties

  return (
    <div
      className={cx('pv', `pv--${project.visual}`, large && 'pv--large')}
      style={style}
      aria-hidden="true"
    >
      <div className="pv__grid" />
      <div className="pv__glow" />
      <div className="pv__noise" />

      <div className="pv__chrome">
        <span className="pv__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pv__crumb">
          <Mark size={11} />
          {project.visual === 'crm' && 'hcp / new interaction'}
          {project.visual === 'soccer' && 'soccer-solver / reconcile'}
          {project.visual === 'chat' && 'realtime-chat / #product-build'}
        </span>
        <span className="pv__live">
          <i />
          {project.visual === 'crm' && '06 tools'}
          {project.visual === 'soccer' && '27 tests'}
          {project.visual === 'chat' && 'live'}
        </span>
      </div>

      <div className="pv__stage">
        {project.visual === 'crm' && <CrmVisual />}
        {project.visual === 'soccer' && <SoccerVisual />}
        {project.visual === 'chat' && <ChatVisual />}
      </div>
    </div>
  )
}

function CrmVisual() {
  return (
    <div className="crm">
      <div className="crm__panels">
        <div className="crm__panel">
          <div className="pv-label">
            <span>Raw note</span>
            <span>00:09</span>
          </div>
          <p className="crm__note">
            Met the HCP after the session — discussed <mark>CardioX</mark> dosing and a{' '}
            <mark>two-week follow-up</mark>.
          </p>
          <div className="crm__scan" />
          <div className="crm__listening">
            <span className="crm__wave">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            capturing
          </div>
        </div>

        <div className="crm__bridge">
          <span className="crm__bridge-pill">06</span>
          <span className="crm__bridge-label">agent<br />tools</span>
          <span className="crm__bridge-line" />
        </div>

        <div className="crm__panel crm__panel--record">
          <div className="pv-label">
            <span>Structured record</span>
            <span className="crm__ready">ready</span>
          </div>
          <div className="crm__field">
            <span>HCP</span>
            <b>Dr. R.</b>
          </div>
          <div className="crm__field">
            <span>Topic</span>
            <b>CardioX</b>
          </div>
          <div className="crm__field">
            <span>Next</span>
            <b>Follow-up</b>
          </div>
          <div className="crm__compliance">
            <span>✓</span> compliance validated
          </div>
        </div>
      </div>

      <div className="crm__tool-row">
        {['extract', 'validate', 'classify', 'link', 'summarise', 'draft'].map((tool, index) => (
          <span key={tool} className="crm__tool">
            <i>{String(index + 1).padStart(2, '0')}</i>
            {tool}
          </span>
        ))}
      </div>

      <div className="pv__foot">
        <span>review before save</span>
        <span>postgres / persisted</span>
      </div>
    </div>
  )
}

function SoccerVisual() {
  return (
    <div className="soccer">
      <svg className="soccer__pitch" viewBox="0 0 600 340" fill="none">
        <rect x="20" y="20" width="560" height="300" rx="2" stroke="currentColor" strokeOpacity="0.2" />
        <path d="M300 20V320" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="300" cy="170" r="58" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="300" cy="170" r="3" fill="currentColor" fillOpacity="0.4" />
        <path d="M20 105H90V235H20M580 105H510V235H580" stroke="currentColor" strokeOpacity="0.2" />
        <path d="M20 170H48M580 170H552" stroke="currentColor" strokeOpacity="0.2" />
      </svg>

      <div className="soccer__sources">
        <span className="pv-label">Three sources</span>
        {[
          ['A. SILVA', 'DS 01'],
          ['SILVA, ADRIEL', 'DS 02'],
          ['ADRIEL S.', 'DS 03'],
        ].map(([name, source], index) => (
          <div className="soccer__source" key={name} style={{ '--i': index } as CSSProperties}>
            <span>{name}</span>
            <i>{source}</i>
          </div>
        ))}
        <div className="soccer__merge">
          <span />
          fuzzy match
        </div>
      </div>

      <div className="soccer__record">
        <div className="pv-label">
          <span>Unified / sample</span>
          <span className="soccer__match">matched</span>
        </div>
        <strong className="soccer__player">SILVA, A.</strong>
        <div className="soccer__rank">
          <span>Rank 01</span>
          <span className="soccer__bar">
            <i style={{ width: '86%' }} />
          </span>
          <em>0.92</em>
        </div>
        <div className="soccer__rank">
          <span>Rank 02</span>
          <span className="soccer__bar">
            <i style={{ width: '68%' }} />
          </span>
          <em>0.81</em>
        </div>
        <div className="soccer__rank">
          <span>Rank 03</span>
          <span className="soccer__bar">
            <i style={{ width: '54%' }} />
          </span>
          <em>0.74</em>
        </div>
        <div className="soccer__confidence">
          <span>Confidence scoring</span>
          <span>transparent by design</span>
        </div>
      </div>

      <span className="soccer__badge">
        <i />
        27 backend tests
      </span>

      <div className="pv__foot">
        <span>3 datasets → 1 record</span>
        <span>weighted ranking</span>
      </div>
    </div>
  )
}

function ChatVisual() {
  return (
    <div className="chat">
      <div className="chat__rooms">
        <span className="pv-label">Rooms / 03</span>
        <div className="chat__room is-active">
          <span># product-build</span>
          <i>3</i>
        </div>
        <div className="chat__room">
          <span>@ direct</span>
          <i>1</i>
        </div>
        <div className="chat__room">
          <span># random</span>
          <i>6</i>
        </div>
        <div className="chat__room-status">
          <span className="chat__pulse" />
          socket / connected
        </div>
      </div>

      <div className="chat__thread">
        <div className="chat__thread-head">
          <span># product-build</span>
          <span className="chat__presence">
            <i />
            06 online
          </span>
        </div>

        <div className="chat__messages">
          <div className="chat__message chat__message--in">
            <span className="chat__avatar">R</span>
            <div className="chat__bubble">Socket layer is behaving.</div>
            <span className="chat__time">09:41</span>
          </div>
          <div className="chat__message chat__message--out">
            <div className="chat__bubble">Receipts too?</div>
            <span className="chat__time">
              09:41 <b>✓✓</b>
            </span>
          </div>
          <div className="chat__message chat__message--in">
            <span className="chat__avatar">R</span>
            <div className="chat__bubble chat__bubble--typing">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        <div className="chat__thread-foot">
          <span className="chat__typing-label">typing indicator</span>
          <span>read at 09:42</span>
        </div>
      </div>

      <div className="pv__foot">
        <span>private + group rooms</span>
        <span>delivery / read receipts</span>
      </div>
    </div>
  )
}
