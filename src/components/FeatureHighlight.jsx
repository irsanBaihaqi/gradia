export default function FeatureHighlight({ eyebrow, title, text, mediaClass }) {
  return (
    <section className="feature-highlight" id="services">
      <div className="wrap">
        <div className={`media ${mediaClass}`} data-reveal="media" />
        <div className="content" data-reveal>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </section>
  )
}