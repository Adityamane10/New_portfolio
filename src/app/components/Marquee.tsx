import { site } from '../../data/site'
import { Mark } from './Mark'

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {site.marquee.map((item) => (
              <span className="marquee__item" key={`${group}-${item}`}>
                {item}
                <Mark size={14} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
