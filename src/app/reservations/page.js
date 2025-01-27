import { Suspense } from "react";
import ReservationsClient from "./reservationsclient";

export const metadata = {
  title: {
    default: 'Meeting Rooms',
  },
  description: 'Reserve meeting rooms on the second floor of the War Memorial Veterans Building for meetings, classes, workshops, art exhibitions, conferences, memorials, and celebrations.',
  openGraph: {
    title: 'Meeting Room Reservations',
    description: 'Book our versatile meeting spaces for veteran organization events, classes, workshops, exhibitions and gatherings. All activities must be sponsored by Veterans Building organizations.',
    images: [
      {
        url: '/og-reservations.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};


export default function Reservations() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservationsClient />
    </Suspense>
  );
}
