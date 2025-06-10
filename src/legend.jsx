import styles from "./legend.module.css";
import piggy from "./assets/piggy.jpeg";
import bunbun from "./assets/bunbun.jpeg";
import whiskers from "./assets/whiskers.jpeg";
import crybear from "./assets/crybear.jpeg";
import duke from "./assets/duke.jpeg";

function Legend({ found }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftside}>
        <h2 className={styles.title}>Where's Whiskers?</h2>
        <span className={styles.desc}>
          Whiskers and her pals are at the beach, and it's crowded! Can you find
          all 5 of our furry friends? Click around and find out. Hurry up,
          clock's ticking!
        </span>
      </div>
      <div className={styles.icongrid}>
        <div className={styles.iconbox}>
          <img className={styles.icon} src={piggy}></img>
          <div
            className={`${styles.heart} ${
              found.piggy ? styles.show : styles.hide
            }`}
          >
            &#10084;
          </div>
        </div>
        <div className={styles.iconbox}>
          <img className={styles.icon} src={bunbun}></img>
          <div
            className={`${styles.heart} ${
              found.bunbun ? styles.show : styles.hide
            }`}
          >
            &#10084;
          </div>
        </div>
        <div className={styles.iconbox}>
          <img className={styles.icon} src={whiskers}></img>
          <div
            className={`${styles.heart} ${
              found.whiskers ? styles.show : styles.hide
            }`}
          >
            &#10084;
          </div>
        </div>
        <div className={styles.iconbox}>
          <img className={styles.icon} src={crybear}></img>
          <div
            className={`${styles.heart} ${
              found.crybear ? styles.show : styles.hide
            }`}
          >
            &#10084;
          </div>
        </div>
        <div className={styles.iconbox}>
          <img className={styles.icon} src={duke}></img>
          <div
            className={`${styles.heart} ${
              found.duke ? styles.show : styles.hide
            }`}
          >
            &#10084;
          </div>
        </div>
        <span className={styles.name}>Piggy</span>
        <span className={styles.name}>Bunbun</span>
        <span className={styles.name}>Whiskers</span>
        <span className={styles.name}>CryBear</span>
        <span className={styles.name}>Duke</span>
      </div>
    </div>
  );
}

export { Legend };
