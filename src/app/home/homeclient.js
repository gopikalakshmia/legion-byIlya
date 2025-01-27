import Image from "next/image";
import QuickLink from "./components/quicklink";
import EventPreview from "./components/eventpreview";
import HeroLogo from "./assets/logo-wmc.svg"
import IconActivities from "./assets/icon-activities.svg"
import IconReserve from "./assets/icon-reserve.svg"
import BuildingImage from "../shared/assets/img-bldg.png"
import styles from "./home.module.css";

export default async function HomeClient ({entries}) {

    return (
        <main> 
      
            <header className={styles.hero}> 
                <Image src={HeroLogo} priority alt="War Memorial Comission" width={500} height={0}/>
                <p>Helping veterans and communities to thrive together</p>
            </header>

            <section className={styles.content}>
                
                <div></div>
                <EventPreview
                    entries={entries}
                />

                <div></div>

                <nav aria-label="Quick links">

                    <QuickLink
                        path="/reservations"
                        icon={IconReserve}
                        text="Book a room"
                        alt="calendar"
                    />

                    <QuickLink
                        path="/activities"
                        icon={IconActivities}
                        text="Veteran Activities"
                        alt="two people high fiving each other"
                    />

                </nav>
            </section>

            <Image priority src={BuildingImage} alt="War Memorial Veterans Building" width={1100} />

        </main>
    );
}