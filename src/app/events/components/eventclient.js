'use client'
import Image from "next/image"
import styles from "./event.module.css"
import useDateFormat from "@/app/shared/useDateFormat";


export default function EventClient ({title, details, startdate, enddate, poster, location}) {

    const paragraphs = details
        .split('\n')
        .filter((p) => p.trim() !== '');

    const eventTime = useDateFormat(startdate, enddate)
    

    return(
        <>
            <header 
                className={styles.hero} 
            >
                <Image
                    src={poster}
                    alt={`${title} event background`}
                    width={2000}
                    height={900}
                    priority
                    className={styles.bgimage}
                />
                <Image 
                    priority
                    src={poster}
                    alt={`${title} event poster`}
                    width={750}
                    height={500}
                />
                <h1>{title}</h1>
                
                {eventTime.isSameDay ? (
                    <h2>
                        {eventTime.start.fullMonth} {eventTime.start.day}, {eventTime.start.weekday} •{" "}
                        <span>{eventTime.start.time}-{eventTime.end.time}</span>
                    </h2>
                    ) : (
                    <h2>
                        {eventTime.start.fullMonth} {eventTime.start.day} - {eventTime.end.fullMonth} {eventTime.end.day}
                    </h2>
                )}
                    
                <address> {location} </address>
            </header>

            <article className={styles.content}>
                <h1>About the Event</h1>

                {paragraphs.map((paragraph, index) => (
                <p key={index}>
                    {paragraph}
                </p>
                ))}

            </article>
        </>
    )
}