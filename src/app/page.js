import HomeClient from "./home/homeclient";
import { createClient } from 'contentful';
export const revalidate = 60; 



export default async function Home() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  
    const entries = await client.getEntries().then((response) => response.items);

  return (
    <HomeClient entries={entries} />
  );
}
