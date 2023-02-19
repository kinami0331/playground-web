import styles from "@/styles/Footer.module.scss";


export function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Powered by <a href={"https://nextjs.org/"}>Next.js</a>
      </p>
    </div>
  );
}