import './SkeletonLoader.css';

export function SkeletonHero() {
  return (
    <section className="skeleton-hero">
      <div className="container skeleton-hero-inner">
        <div className="skeleton-hero-image skeleton-pulse"></div>
        <div className="skeleton-hero-text">
          <div className="skeleton-line skeleton-pulse" style={{ width: '60%', height: '14px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '85%', height: '40px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '70%', height: '40px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '90%', height: '16px', marginTop: '20px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '75%', height: '16px' }}></div>
          <div className="skeleton-btn skeleton-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export function SkeletonCards({ count = 4 }) {
  return (
    <section className="skeleton-section">
      <div className="container">
        <div className="skeleton-line skeleton-pulse skeleton-heading"></div>
        <div className="skeleton-grid">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-card-img skeleton-pulse"></div>
              <div className="skeleton-line skeleton-pulse" style={{ width: '70%', height: '20px' }}></div>
              <div className="skeleton-line skeleton-pulse" style={{ width: '90%', height: '14px' }}></div>
              <div className="skeleton-line skeleton-pulse" style={{ width: '80%', height: '14px' }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonTextBlock() {
  return (
    <section className="skeleton-section">
      <div className="container skeleton-text-block">
        <div className="skeleton-text-side">
          <div className="skeleton-line skeleton-pulse" style={{ width: '30%', height: '12px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '60%', height: '32px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '100%', height: '14px', marginTop: '15px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '95%', height: '14px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '88%', height: '14px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '70%', height: '14px' }}></div>
          <div className="skeleton-stats">
            {[1,2,3,4].map(i => (
              <div key={i}>
                <div className="skeleton-line skeleton-pulse" style={{ width: '60px', height: '28px' }}></div>
                <div className="skeleton-line skeleton-pulse" style={{ width: '80px', height: '12px' }}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="skeleton-img-side skeleton-pulse"></div>
      </div>
    </section>
  );
}

export function SkeletonPage() {
  return (
    <div className="skeleton-page">
      <SkeletonHero />
      <SkeletonTextBlock />
      <SkeletonCards count={4} />
      <SkeletonTextBlock />
      <SkeletonCards count={3} />
    </div>
  );
}

export default SkeletonPage;
