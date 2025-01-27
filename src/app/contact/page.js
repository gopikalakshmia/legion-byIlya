import Image from 'next/image';
import { MapPin, Phone, Mail, SquareParking } from 'lucide-react';
import BuildingImage from '../shared/assets/img-bldg.png'
import styles from './contact.module.css';


export const metadata = {
  title: {
    default: 'Contact us',
  },
  description: 'Get in touch with the War Memorial Commission for inquiries about events, veteran activities, room reservations, or general information.',
  openGraph: {
    title: 'Contact War Memorial Commission',
    description: 'Reach out to learn more about our veteran services, events, and facilities. We\'re here to help connect veterans and communities.',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Contact() {
  return (
    <main className={styles.content}> 

      <header>
        <h1>Contact Us</h1>
      </header>

      <article>

        <section>
          <header>American Legion War Memorial Comission</header>

          <div>
            <MapPin size={20} />
            <address>
              401 Van Ness Ave. #101<br />
              San Francisco, CA 94102
            </address>
          </div>

          <div>
            <Phone size={20} />
            <a href="tel:+14158614920">
                (415) 861-4920
            </a>
          </div>

          <div>
            <Mail size={20} />
            <a href="mailto:mercmartinelli@alwmcsf.org">
                mercmartinelli@alwmcsf.org
            </a>
          </div>
        </section>

        <section>
          <header>Parking Information</header>

          <div>
            <SquareParking size={20} />
            <h1>Civic Center Garage:</h1>
            <address>355 McAllister Street</address>
          </div>

          <div>
            <SquareParking size={20} />
            <h1>Performing Arts Garage:</h1>
            <address>360 Grove Street</address>
          </div>
        </section>

      </article>

      <Image
          priority
          src={BuildingImage}
          alt="War Memorial Veterans Building"
          width={1500}
          className={styles.buildingimage}
        />

    </main>
  );
}
