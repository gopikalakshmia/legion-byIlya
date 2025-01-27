'use client'
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/app/shared/components/button';
import ReservationForm from './reservationform';
import { roomData } from '../assets/roomdata';



function RoomDetails({ roomNumber, showForm, setShowForm, selected }) {

  useEffect(() => {
    setShowForm(false);
  }, [selected, setShowForm]);

  
 const room = roomData[roomNumber];
 if (!room) return null;

 const renderAmenities = () => {
   const { amenities } = room;
   return (
     <>
       {amenities.furnishings && (
         <>
           <dt>Furnishings:</dt>
           {amenities.furnishings.map((item, index) => (
             <dd key={`furnishing-${index}`}>{item}</dd>
           ))}
         </>
       )}
       {amenities.technology && (
         <>
           <dt>Technology:</dt>
           {amenities.technology.map((item, index) => (
             <dd key={`tech-${index}`}>{item}</dd>
           ))}
         </>
       )}
       {amenities.kitchen && (
         <>
           <dt>Access to Kitchen (Room {amenities.kitchen.room}):</dt>
           {amenities.kitchen.features.map((feature, index) => (
             <dd key={`kitchen-${index}`}>{feature}</dd>
           ))}
         </>
       )}
       {amenities.accessToRooms &&
         Object.entries(amenities.accessToRooms).map(([roomName, details]) => (
           <React.Fragment key={roomName}>
             <dt>Access to {details.type} ({roomName}):</dt>
             {details.features.map((feature, index) => (
               <dd key={`${roomName}-${index}`}>{feature}</dd>
             ))}
           </React.Fragment>
         ))}
     </>
   );
 };

 return (
  <dl>
    <span>About the Space</span>
    <p>{room.about}</p>
    
    <section>
      <AnimatePresence mode="popLayout">
        {showForm ? (
          <motion.div
            key="form"
            layout
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ReservationForm roomNumber={roomNumber} setShowForm={setShowForm} />
          </motion.div>
        ) : (
          <motion.div
            key="button"
            className='mt-6'
            initial={{ opacity: 0, y: 20, height: '0px', width: '130px' }}
            animate={{ opacity: 1, y: 0, height: 'auto', width: '130px' }}
            transition={{ duration: 0.1 }}
          >
            <Button buttontext="Reserve Room" faux invert onClick={() => setShowForm(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
 
    <motion.div layout transition={{ duration: 0.3 }}>
      <span>Room Details</span>
      <dt>Dimensions:</dt>
      {room.dimensions.map((dimension, index) => (
        <dd key={`dim-${index}`}>{dimension}</dd>
      ))}
      
      <dt>Seating Capacity:</dt>
      {room.seating.map((seating, index) => (
        <dd key={`seating-${index}`}>{seating}</dd>
      ))}
 
      {renderAmenities()}
 
      <dt>Usage Guidelines</dt>
      {room.usageGuidelines.map((guideline, index) => (
        <dd
          key={`guideline-${index}`}
          style={{ textTransform: 'none', margin: '4px 0' }}
        >
          {guideline}
        </dd>
      ))}
    </motion.div>
  </dl>
 );}

export default RoomDetails;