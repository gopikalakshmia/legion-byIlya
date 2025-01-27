import Image from "next/image"
import Button from "@/app/shared/components/button"
import { leaderData } from "../assets/leaderdata"
import styles from "../components/leaderpage.module.css"

export async function generateMetadata({ params }) {
  const leader = leaderData[params.id]
  if (!leader) return { title: 'Not Found' }

  return {
    metadataBase: new URL('https://legion-three.vercel.app/'),
    title: leader.name,
    description: leader.shortbio,
    openGraph: {
      title: leader.name,
      description: leader.shortbio,
      images: [{
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
      }],
    },
  }
}


export default function LeaderPage({ params }) {
  
    const leader = leaderData[params.id]
    if (!leader) {
        return <p>Person not found.</p>
    }

  return (
    <main>

      <article className={styles.content}>

        <header>
          <section>
            <h1>{leader.name}</h1>
            <h2>{leader.title}</h2>
          </section>

          <Image
            priority
            src={leader.herophoto}
            width={400}
            height={0}
            alt={`portrait photo of ${leader.name}`}
            />
        </header>

        <div>
          {leader.fullbio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <Button buttontext='Back' path='/about' invert />
        </div>

      </article>

    </main>
  )
}