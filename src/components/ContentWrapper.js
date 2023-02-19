import styles from "@/styles/ContentWrapper.module.scss";

export function ContentWrapper({children}) {
    return (
        <div className={styles.contentWrapper}>
            {children}
        </div>
    )
}