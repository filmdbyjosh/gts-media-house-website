import styles from "./TalkingReels.module.css";

const cropClass = {
  close: styles.close,
  mid: styles.mid,
  full: styles.full,
} as const;

type Crop = keyof typeof cropClass;

const columns: {
  duration: string;
  delay: string;
  frames: { src: string; crop: Crop }[];
}[] = [
  {
    duration: "30s",
    delay: "-8s",
    frames: [
      { src: "/reels/runner2.jpg", crop: "full" },
      { src: "/reels/shop.jpg", crop: "close" },
      { src: "/reels/duffel2.jpg", crop: "full" },
    ],
  },
  {
    duration: "26s",
    delay: "-16s",
    frames: [
      { src: "/reels/rider2.jpg", crop: "full" },
      { src: "/reels/gym2.jpg", crop: "close" },
      { src: "/reels/bottle2.jpg", crop: "mid" },
    ],
  },
  {
    duration: "34s",
    delay: "-4s",
    frames: [
      { src: "/reels/helmet2.jpg", crop: "mid" },
      { src: "/reels/track2.jpg", crop: "close" },
      { src: "/reels/gear2.jpg", crop: "mid" },
    ],
  },
];

function Frame({ src, crop }: { src: string; crop: Crop }) {
  return (
    <div className={`${styles.frame} ${cropClass[crop]}`}>
      <img src={src} alt="" />
      <span className={styles.captions}>
        <i />
        <i />
      </span>
    </div>
  );
}

function Column({
  duration,
  delay,
  frames,
  hiddenOnMobile,
}: {
  duration: string;
  delay: string;
  frames: { src: string; crop: Crop }[];
  hiddenOnMobile?: boolean;
}) {
  return (
    <div className={`${styles.column} ${hiddenOnMobile ? styles.side : ""}`}>
      <div className={styles.window}>
        <div
          className={styles.feed}
          style={{ animationDuration: duration, animationDelay: delay }}
        >
          {[0, 1].map((copy) => (
            <div className={styles.group} key={copy}>
              {frames.map((frame) => (
                <Frame key={`${copy}-${frame.src}`} src={frame.src} crop={frame.crop} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TalkingReels() {
  return (
    <div className={styles.stage} aria-hidden="true">
      {columns.map((column, index) => (
        <Column
          key={column.duration}
          duration={column.duration}
          delay={column.delay}
          frames={column.frames}
          hiddenOnMobile={index !== 1}
        />
      ))}
    </div>
  );
}
