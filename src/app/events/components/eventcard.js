'use client'
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/shared/components/button';
import useDateFormat from '@/app/shared/useDateFormat';
import styles from './eventcard.module.css'


export default function EventCard ({title, description, startdate, enddate, poster, id}) {

    const eventTime = useDateFormat(startdate, enddate)
    
    const displayTime = eventTime.isSameDay
    ? `${eventTime.end.year} / ${eventTime.start.month} ${eventTime.start.day} at ${eventTime.start.time}`
    : `${eventTime.end.year} / ${eventTime.start.month} ${eventTime.start.day} - ${eventTime.end.month} ${eventTime.end.day}`

    return (
        <Link href={`/events/${id}`} className={styles.eventlink}>
            <article className={styles.event}> 

                <time>
                    {displayTime}
                </time>

                <h1>{title}</h1>

                <Image 
                    priority
                    src={poster}
                    alt={`${title} event poster`}
                    width={1500}
                    height={0}
                />

                <p>{description}</p>

                <Button 
                    buttontext='Learn more'
                    faux
                />

            </article>
        </Link>
    );
}   