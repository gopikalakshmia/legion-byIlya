'use client'
import { useState, useEffect } from 'react';
import Hero from '../shared/components/hero';
import EventCard from './components/eventcard';
import styles from './events.module.css';

export default function EventsClient({entries}) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setIsLoading(true); 
    const currentDate = new Date();
    
    const upcoming = entries
      .filter((entry) => new Date(entry.fields.endDate) >= currentDate)
      .sort((a, b) => new Date(a.fields.endDate) - new Date(b.fields.startDate));
    
    const past = entries
      .filter((entry) => new Date(entry.fields.endDate) < currentDate)
      .sort((a, b) => new Date(b.fields.startDate) - new Date(a.fields.startDate));
    
    setUpcomingEvents(upcoming);
    setPastEvents(past);
    setIsLoading(false); 
  }, [entries]);

  return (
    <main>

      <Hero
        head="public events"
        p1="The American Legion War Memorial Commission welcomes the public to attend special events throughout the year at the War Memorial Veterans Building. Our programs include art exhibitions, historical displays, commemorative ceremonies, and educational presentations that connect the community with veterans' experiences and military history."
        p2="We invite you to join us for these meaningful events - check our upcoming programs."
      />

      <article className={styles.content}>
        <section>

          <h1>Upcoming Events</h1>
          
          <div>
            {!isLoading && ( 
              <>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((entry) => (
                    <EventCard
                      key={entry.sys.id}
                      title={entry.fields.eventName}
                      description={entry.fields.shortDescription}
                      startdate={entry.fields.startDate}
                      enddate={entry.fields.endDate}
                      id={entry.sys.id}
                      poster={`https:${entry.fields.eventImage.fields.file.url}`}
                    />
                  ))
                ) : (
                  <p className={styles.noevents}>
                    We're actively planning exciting new programs for the community. Please check back soon.
                  </p>
                )}
              </>
            )}
          </div>

        </section>

        <div className={styles.separator}></div>

        <section>

          <h1>Past Events</h1>

          <div>
            {!isLoading && 
              pastEvents.map((entry) => (
                <EventCard
                  key={entry.sys.id}
                  title={entry.fields.eventName}
                  description={entry.fields.shortDescription}
                  startdate={entry.fields.startDate}
                  enddate={entry.fields.endDate}
                  id={entry.sys.id}
                  poster={`https:${entry.fields.eventImage.fields.file.url}`}
                />
              ))
            }
          </div>
          
        </section>
      </article>
    </main>
  );
}