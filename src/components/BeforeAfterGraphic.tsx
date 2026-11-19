import styles from "./BeforeAfterGraphic.module.css";

export default function BeforeAfterGraphic() {
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.side}>
          <div className={styles.messy}>
            <span className={`${styles.tile} ${styles.m1}`} />
            <span className={`${styles.tile} ${styles.m2}`} />
            <span className={`${styles.tile} ${styles.m3}`} />
            <span className={`${styles.tile} ${styles.m4}`} />
            <span className={`${styles.tile} ${styles.m5}`} />
            <span className={`${styles.tile} ${styles.m6}`} />
            <span className={`${styles.tile} ${styles.m7}`} />
            <span className={`${styles.tile} ${styles.m8}`} />
            <span className={`${styles.burst}`} />
          </div>
          <p className={styles.label}>Camera roll</p>
        </div>

        <div className={styles.divider} aria-hidden>
          <span className={styles.arrow} />
        </div>

        <div className={styles.side}>
          <div className={styles.polish}>
            <article className={`${styles.post} ${styles.p1}`}>
              <span className={styles.postMedia} />
              <span className={styles.postBar} />
            </article>
            <article className={`${styles.post} ${styles.p2}`}>
              <span className={styles.postMedia} />
              <span className={styles.postBar} />
            </article>
            <article className={`${styles.post} ${styles.p3}`}>
              <span className={styles.postMedia} />
              <span className={styles.postBar} />
            </article>
          </div>
          <p className={styles.label}>Ready to post</p>
        </div>
      </div>
    </div>
  );
}
