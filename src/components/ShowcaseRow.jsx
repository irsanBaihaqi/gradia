export default function ShowcaseRow({ title, text, mediaClass, reversed }) {
  return (
    <div className={`showcase-row${reversed ? ' is-reversed' : ''}`}>
      <div className="wrap">
        <div className={`media ${mediaClass}`} data-reveal="media" />
        <div className="content" data-reveal>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}