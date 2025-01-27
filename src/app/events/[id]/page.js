import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from 'contentful';
import Button from '@/app/shared/components/button';
import EventClient from '../components/eventclient';
import BuildingImage from "../../shared/assets/img-bldg.png";

export async function generateMetadata({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client.getEntries();
  const event = entries.items.find((entry) => entry.sys.id === params.id);

  if (!event) return { notFound: true };

  return {
    title: event.fields.eventName,
    description: event.fields.shortDescription,
    openGraph: {
      title: event.fields.eventName,
      description: event.fields.shortDescription,
    }
  };
}


export default async function EventPage({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client.getEntries().then((response) => response.items);
  const event = entries.find((entry) => entry.sys.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <EventClient
        title={event.fields.eventName}
        description={event.fields.shortDescription}
        details={event.fields.fullDescription}
        startdate={event.fields.startDate}
        enddate={event.fields.endDate}
        location={event.fields.eventLocation}
        poster={`https:${event.fields.eventImage.fields.file.url}`}
      />

      <Button buttontext="More events" path="/events" invert />

      <Image
        priority
        src={BuildingImage}
        alt="War Memorial Veterans Building"
        width={1100}
        style={{ marginTop: '50px' }}
      />
      
    </main>
  );
}