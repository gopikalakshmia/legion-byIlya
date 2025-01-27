import Hero from '../shared/components/hero';
import styles from './activities.module.css'

export const metadata = {
  title: {
    default: 'Veteran Activities',
  },
  description: 'Veterans of all service branches are welcome to join our community activities including memorial services, peer support meetings, and cultural events at the War Memorial Veterans Building.',
  openGraph: {
    title: 'Veteran Activities and Support Programs',
    description: 'Connect with fellow veterans through our range of activities and support programs. Open to veterans of all service branches - join our welcoming community today.',
    images: [
      {
        url: '/og-activities.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Calendar = () => (
  <div className={styles.calendarcontainer}>
      <div className="absolute right-0 mt-8 w-[100px] h-[34px] bg-[#f0f3f9]"></div>
      <iframe className={styles.calendar} src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&showTitle=0&showTabs=0&showCalendars=0&showTz=0&src=YWx3bWNzZkBnbWFpbC5jb20&src=aGM5N3RxcDJsdmluMmZtc3VxNHB2dHZsNTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=b2h2dW5rMjlmaTRibzczcGhudHBpOWM1dmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=bzE4aDYydDBoN2o1dDZnYXRobXJiam4yMGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ajBmczBnaHNpZTZmcnRwcjZsYTVwNGhoNG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW9zdGJkYTJqMG1wNW0xdmdwZWx2dnNpODhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F09300&color=%23EF6C00&color=%23E67C73&color=%23616161&color=%23F6BF26&color=%234285F4"></iframe>
      <div className="absolute bottom-2.5 h-8 w-full bg-slate-100"> </div>
  </div>
)

export default function Activities() {
  return (
      <main>

          <Hero 
              head = "veteran activities"
              p1 = "The American Legion War Memorial Commission hosts a range of activities to support and connect our veteran community. "
              p2="Veterans of all service branches are warmly welcomed to join these activities and become part of our community. Whether you're interested in participating in memorial services, joining peer support meetings, or attending cultural events, we encourage you to reach out to the Commission to learn more about getting involved."
          /> 

          <article className={styles.content}>
              <Calendar />
          </article>
          
      </main>
  );
}
