import NavBar from './elements/navbar';

const navItems = [
    { text: 'About Us', path: '/about' },
    { text: 'Public Events', path: '/events' },
    { text: 'Veteran Activities', path: '/activities' },
    { text: 'Meeting Rooms', path: '/reservations' },
    { text: 'Contact', path: '/contact' }
  ];

export default function Navigation () {
    return (
        <header>
           <NavBar aria-label="Main navigation" navItems={navItems} /> 
        </header>
    )
}