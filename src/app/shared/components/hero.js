import styles from "./hero.module.css"

export default function Hero ({head, p1, p2}) {
    return (
        <header className={styles.hero}>
            <div>
                <h1>
                    {head}
                </h1>
                <p>
                    {p1}
                </p>
                <p>
                    {p2}
                </p>
            </div>
        </header>
    )
}