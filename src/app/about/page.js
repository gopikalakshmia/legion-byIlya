import Hero from '../shared/components/hero';
import LeaderCard from './components/leadercard';
import { leaderData } from './assets/leaderdata';
import styles from './about.module.css'

export const metadata = {
  title: {
    default: 'About Us',
  },
  description: 'Learn about our mission, history, and leadership team dedicated to preserving veterans\' legacy in San Francisco through the American Legion War Memorial Commission.',
  openGraph: {
    title: "About Us",
    description: 'Learn about our mission, history, and leadership team dedicated to preserving veterans\' legacy in San Francisco through the American Legion War Memorial Commission.',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function About() {
  return (
      <main> 

          <Hero 
              head = "about us"
              p1="As part of the broader American Legion organization, which was founded in 1919, the Commission carries out the vital mission of ensuring that the sacrifices of veterans are remembered and commemorated through physical monuments and memorial spaces in San Francisco."
              p2="Through its affiliation with the American Legion, the Commission combines local memorial preservation with the larger national mission of honoring military service members."
          />

          <article className={styles.content}>
              
              <h1>
                  Our Leadership
              </h1>

              <section>
                  {leaderData.map((leader, index) => (
                      <LeaderCard 
                          key={index} 
                          name={leader.name}
                          photo={leader.photo}
                          title={leader.title}
                          bio={leader.shortbio}
                          path={index}
                      />
                  ))}
              </section>

          </article>
          
      </main>
  );
}
