import { site } from '../../data/site'
import { Mark } from './Mark'
import { Tilt } from './motion'

export function IdentityCard() {
  return (
    <Tilt className="id-card">
      <div className="id-card__noise" aria-hidden="true" />
      <div className="id-card__top">
        <span className="id-card__brand">
          <Mark size={16} />
          Aditya Mane
        </span>
        <span>Profile / 001</span>
      </div>

      <div className="id-card__portrait">
        <div className="id-card__orbit" aria-hidden="true" />
        <div className="id-card__glow" aria-hidden="true" />
        <Mark className="id-card__mark" size={78} />
        <span className="id-card__portrait-label">Full-stack / AI</span>
        <span className="id-card__portrait-corner">16.70° N</span>
        <span className="id-card__portrait-corner id-card__portrait-corner--right">74.24° E</span>
      </div>

      <div className="id-card__name">
        Aditya <em>Mane</em>
      </div>
      <p className="id-card__role">{site.role} / AI systems</p>

      <dl className="id-card__facts">
        <div>
          <dt>Based</dt>
          <dd>Kolhapur, IN</dd>
        </div>
        <div>
          <dt>Current</dt>
          <dd>MCA ’26</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Web · AI</dd>
        </div>
      </dl>

      <div className="id-card__foot">
        <span className="status status--small">
          <i aria-hidden="true" />
          Open to work
        </span>
        <span className="id-card__barcode" aria-hidden="true" />
        <span className="id-card__year">AM / 2026</span>
      </div>
    </Tilt>
  )
}
