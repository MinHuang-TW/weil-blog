import Link from 'next/link';

const Navbar = () => (
  <nav>
    <div className='logo'>
      <h1>QUANTUM FERN</h1>
    </div>
    <Link href='/'>
      <a>Home</a>
    </Link>
    <Link href='/about'>
      <a>About</a>
    </Link>
  </nav>
);

export default Navbar;
