import Link from "next/link"
import styles from "./footer.module.css"


export default function Footer () {
    return (
        <footer className={styles.footer}>
            <span>
                <p>
                    The War Memorial Commission operates in affiliation with the&nbsp;
                        <Link 
                            href="https://www.legion.org" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            American Legion
                        </Link>
                    , serving to honor and preserve the memory of our veterans. 
                </p>
                <div>
                    <p>
                        © Copyright 2025 The American Legion War Memorial Commission
                    </p>
                    <address>
                        401 Van Ness Ave, Ste 101, San Francisco, CA 94102. 
                    </address>
                </div>
            </span>
        </footer>
    )
}