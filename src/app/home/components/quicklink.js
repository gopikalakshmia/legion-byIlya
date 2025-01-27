import Image from "next/image"
import Link from "next/link"
import styles from "./quicklink.module.css"

export default function QuickLink({path, icon, alt, text}) {
    return (
        <Link href={path} className={styles.quicklink}>

            <Image 
                src={icon}
                alt={alt}
                width={55}
                height={55}
            />

            <p>{text}</p>

        </Link>
    );
  }