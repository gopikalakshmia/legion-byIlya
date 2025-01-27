'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { roomData } from '../assets/roomdata';

const RoomDropdown = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const rooms = [
    ...Object.keys(roomData).map((id) => `Room ${id}`),
    'Herbst Theatre & Green Room',
  ];

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" px-6 py-2 mt-4 mb-8 text-3xl flex items-center justify-center text-navy-900 bg-white hover:bg-gray-100/40 border-2 border-navy-900 rounded-full font-semibold focus:outline-none uppercase"
      >
        <span className="flex-1">{selected}</span>
        <ChevronDown
          className={`min-w-7 h-10 ml-1 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute w-full mt-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 border-spacing-0">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => {
                setSelected(room);
                setIsOpen(false);
                if (room === 'Herbst Theatre & Green Room') {
                  router.push('/reservations?room=herbst');
                } else {
                  const roomNumber = room.replace('Room ', '');
                  router.push(`/reservations?room=${roomNumber}`);
                }
              }}
              className="w-full px-4 py-2 text-middle hover:bg-gray-100 focus:outline-none"
            >
              {room}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomDropdown;