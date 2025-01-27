import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/shared/components/button';
import styles from './leadercard.module.css'

export default function LeaderCard ({photo, name, title, bio, path}) {
    return (
        <Link href={`/about/${path}`} className={styles.leaderlink}>

            <article className={styles.leader}> 

                <Image 
                    priority
                    src={photo}
                    alt={`photo of ${name}`}
                    width={200}
                    height={0}
                />

                <h1>{name}</h1>
                <h2>{title} </h2>
                <p>
                    {bio}
                </p>

                <Button 
                    buttontext='Learn more'
                    faux
                />
                
            </article>

        </Link>
    );
}