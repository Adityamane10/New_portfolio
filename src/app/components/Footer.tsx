import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { site, socials } from '../../data/site'
import { copyText } from '../lib/clipboard'
import { useLocalTime } from '../lib/useLocalTime'
import { Mark } from './Mark'
import { Lines, Reveal } from './motion'

export function Footer() {
  const time = useLocalTime()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    const ok = await copyText(site.email)
    if (!ok) {
      window.location.href = `mailto:${site.email}`
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  const backToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer id="contact" className="footer">
      <div className="container footer__main">
        <div className="footer__kicker">
          <span className="footer__index">04</span>
          <span>Contact</span>
          <span className="footer__kicker-line" aria-hidden="true" />
          <span className="footer__status">
            <i aria-hidden="true" />
            {site.availability}
          </span>
        </div>

        <div className="footer__head">
          <Lines
            as="h2"
            className="footer__headline"
            lines={[
              <>Let’s build</>,
              <>something</>,
              <>
                <em>that thinks.</em>
              </>,
            ]}
          />

          <Reveal className="footer__contact" delay={0.1}>
            <p>
              Have a product to ship, a workflow to untangle, or a role that needs
              someone comfortable across the stack? My inbox is open.
            </p>
            <a href={`mailto:${site.email}`} className="footer__email">
              <span>{site.email}</span>
              <ArrowUpRight size={20} strokeWidth={1.6} />
            </a>
            <button type="button" className="footer__copy" onClick={copyEmail} data-cursor="copy">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Email copied to clipboard' : 'Copy email address'}
            </button>
          </Reveal>
        </div>

        <div className="footer__grid">
          <Reveal className="footer__cell">
            <p className="footer__label">Availability</p>
            <p className="footer__big">{site.available ? 'Open to work' : 'Currently booked'}</p>
            <p className="footer__muted">
              Full-stack, AI engineering, and interesting product builds. Based in {site.location}.
            </p>
          </Reveal>

          <Reveal className="footer__cell" delay={0.08}>
            <p className="footer__label">Elsewhere</p>
            <ul className="footer__socials">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span>{social.label}</span>
                    <span className="footer__social-handle">{social.handle}</span>
                    <ArrowUpRight size={14} strokeWidth={1.6} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="footer__cell" delay={0.16}>
            <p className="footer__label">Local time</p>
            <p className="footer__time">
              {time} <span>IST</span>
            </p>
            <p className="footer__muted">{site.coords}</p>
            <p className="footer__update">
              <Mark size={12} /> Portfolio / 2026
            </p>
          </Reveal>
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        <div className="footer__wordmark-track">
          {[0, 1].map((group) => (
            <div className="footer__wordmark-group" key={group}>
              <span>Aditya Mane</span>
              <Mark className="footer__wordmark-mark" size={84} />
              <span>Aditya Mane</span>
              <Mark className="footer__wordmark-mark" size={84} />
            </div>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Aditya Mane</p>
        <p className="footer__built">Designed &amp; built with React, TypeScript &amp; Motion</p>
        <button type="button" onClick={backToTop} className="footer__top">
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}
