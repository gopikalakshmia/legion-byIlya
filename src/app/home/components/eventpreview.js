'use client'
import Button from "@/app/shared/components/button"
import useDateFormat from "@/app/shared/useDateFormat"
import styles from "./eventpreview.module.css"

export default function EventPreview ({entries}) {

    const latestEvent = entries.reduce((latest, current) => {
        return new Date(current.fields.endDate) > new Date(latest.fields.endDate) ? current : latest;
    });

    const startdate = latestEvent.fields.startDate
    const enddate = latestEvent.fields.endDate
    const eventTime = useDateFormat(startdate, enddate)
    
    return(
        <article className={styles.event}> 

            <header>
                <h1>Featured Event</h1>
                <time>
                    {eventTime.isSameDay?
                        <>
                            <span>{eventTime.start.month} {eventTime.start.day}</span>
                            <span>at {eventTime.start.time}</span>
                        </>
                        :
                        <span>{eventTime.start.month} {eventTime.start.day} - {eventTime.end.month} {eventTime.end.day}</span>
                    }
                </time>
            </header>

            <section>
                <h2>{latestEvent.fields.eventName}</h2>
                <p>{latestEvent.fields.shortDescription}</p>
            </section>

            <Button buttontext='Learn more' path={`/events/${latestEvent.sys.id}`}/>

        </article>
    )
}