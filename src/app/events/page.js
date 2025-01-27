import { createClient } from 'contentful';
import EventsClient from "./eventsclient";

export const revalidate = 60; 

export const metadata = {
  title: {
    default: 'Public Events',
  },
  description: 'Join us for special events at the War Memorial Veterans Building including art exhibitions, historical displays, commemorative ceremonies, and educational presentations that connect the community with veterans\' experiences.',
  openGraph: {
    title: 'Public Events at War Memorial Commission',
    description: 'Discover our upcoming events featuring veteran art exhibitions, historical displays, commemorative ceremonies and educational programs that bridge military and civilian communities.',
    images: [
      {
        url: '/og-events.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Events() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client.getEntries().then((response) => response.items);


  return (
    <EventsClient entries={entries} />
  );
}
