import React, {
  useEffect,
  useMemo,
} from 'react';

export default function SpaceFlight({
  duration = 3200,
  onComplete,
}) {
  const stars = useMemo(() => {
    return Array.from(
      { length: 180 },
      (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        depth: Math.random(),
        size: 1 + Math.random() * 3,
        delay: Math.random() * 0.45,
        duration:
          0.75 + Math.random() * 1.1,
      })
    );
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration, onComplete]);

  return (
    <div className="space-flight">
      <div className="space-flight-vignette" />

      <div className="space-flight-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="flight-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              '--depth': star.depth.toFixed(2),
            }}
          />
        ))}
      </div>

      <div className="space-flight-streaks">
        {Array.from(
          { length: 75 },
          (_, index) => (
            <span
              key={index}
              className="flight-streak"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${
                  Math.random() * 0.65
                }s`,
                animationDuration: `${
                  0.55 +
                  Math.random() * 0.6
                }s`,
              }}
            />
          )
        )}
      </div>

      <div className="space-flight-core" />

      <div className="space-flight-ring ring-one" />
      <div className="space-flight-ring ring-two" />
      <div className="space-flight-ring ring-three" />

      <div className="space-flight-text">
        <div className="space-flight-small">
          entrando en
        </div>

        <div className="space-flight-title">
          nuestra galaxia
        </div>
      </div>

      <div className="space-flight-flash" />
    </div>
  );
}