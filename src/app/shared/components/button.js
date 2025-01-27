import Link from "next/link"
import styles from "./button.module.css"

export default function Button ({buttontext, path, invert, faux, external, onClick}) {
    return (
        faux ? (
          <div onClick={onClick} className={invert ? styles.invbutton : styles.button}>{buttontext}</div>
        ) : (
          <Link 
            href={path} 
            className={invert ? styles.invbutton : styles.button}
            {...(external && {
              target: "_blank",
              rel: "noopener noreferrer"
            })}
          >
            {buttontext}
          </Link>
        )
      )
}