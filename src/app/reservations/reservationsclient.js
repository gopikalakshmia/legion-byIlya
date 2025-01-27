'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Hero from '../shared/components/hero';
import Button from '../shared/components/button';
import Gallery from './components/gallery';
import RoomDropdown from './components/roomdropdown';
import RoomDetails from './components/roomdetails';
import BuildingImage from '../shared/assets/img-bldg.png';
import HerbstImage from './assets/HT.jpg';
import GreenRoomImage from './assets/GR.jpg';
import { roomData } from './assets/roomdata';
import styles from './reservations.module.css';


export default function ReservationsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room');
  const [showForm, setShowForm] = useState(false);

  
  const getInitialRoomSelection = (roomParam) => {
    if (!roomParam) return 'SELECT A ROOM';
    
    if (roomParam === 'herbst') {
      return 'Herbst Theatre & Green Room';
    }
    
    const roomNumber = parseInt(roomParam, 10);
    return roomData.hasOwnProperty(roomNumber) ? `Room ${roomNumber}` : 'SELECT A ROOM';
  };
  

  const [selected, setSelected] = useState(getInitialRoomSelection(roomParam));

  useEffect(() => {
    if (roomParam && roomParam !== 'herbst') {
      const roomNumber = parseInt(roomParam, 10);
      if (!roomData.hasOwnProperty(roomNumber)) {
        router.push('/reservations');
      }
    }
  }, [roomParam, router]);

  useEffect(() => {
    setSelected(getInitialRoomSelection(roomParam));
  }, [roomParam]);

  const getRoomNumber = (roomString) => {
    const number = parseInt(roomString.replace('Room ', ''), 10);
    return isNaN(number) ? null : number;
  };
  const roomNumber = getRoomNumber(selected);

  return (
    <main>
      <Hero
        head="meeting rooms"
        p1="Veterans may reserve meeting rooms on the second floor of the War Memorial Veterans Building for a variety of activities. These spaces are ideal for meetings, classes, workshops, art exhibitions, conferences, memorials, celebrations, and retreats. "
        p2="Please contact us to reserve a room. All activities must be sponsored by one of the Veterans organizations housed in the Veterans' Building."
      />
      <section className={styles.content}>

        <RoomDropdown selected={selected} setSelected={setSelected} />
       
        {(() => {
          switch (selected) {
            case 'SELECT A ROOM':
              return null;
                    
            case 'Herbst Theatre & Green Room':
              return (
                <motion.article 
                  className={styles.altvenues}
                  initial={{opacity: 0, y: -20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{ duration: 0.3}}
                >

                  <div>
                    <p>
                      The War Memorial Veterans Building offers two stunning rental venues which were
                      recently renovated: the elegant <strong>Green Room</strong> and the historic{' '}
                      <strong>Herbst Theater</strong>.
                    </p>
                    
                    <p>
                      Formerly known as Veterans Library and Veterans Auditorium, the facilities are
                      available to rent through the Performing Arts Center for both public and veterans, with
                      veterans receiving special discounts on these meticulously maintained spaces that
                      honor their service and heritage.
                    </p>

                    <Button
                      buttontext="Rent through the Performing Arts Center"
                      path="https://sfwarmemorial.org/venues/"
                      invert
                      external
                    />
                  </div>

                  <div>
                    <Image 
                      priority 
                      src={GreenRoomImage} 
                      alt="Green Room" 
                      width={400} 
                      height={0} 
                    />
                    <Image 
                      priority 
                      src={HerbstImage} 
                      alt="Herbst Theater" 
                      width={400} 
                      height={0} 
                    />
                  </div>

                </motion.article>
              );
                    
            default:
              return (
                <motion.article
                  initial={{opacity: 0, y: -20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{ duration: 0.3}}
                >

                  <figure>
                    <Gallery id={roomNumber} />
                  </figure>

                  <div className={styles.roomdata}>
                    <RoomDetails roomNumber={roomNumber} showForm={showForm} setShowForm={setShowForm} selected={selected}/>
                  </div>
                  
                </motion.article>
              );
          }
        })()}
      </section>
      
      {selected === 'SELECT A ROOM' && (
        <Image
          priority
          src={BuildingImage}
          alt="War Memorial Veterans Building"
          width={1550}
          className={styles.buildingimage}
        />
      )}

    </main>
  );
}