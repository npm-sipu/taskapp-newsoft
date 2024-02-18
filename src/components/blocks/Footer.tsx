"use client";

const Footer = () => {
  return (
    <footer className='bg-blue-700 text-white py-12 md:py-24'>
      <div className='container mx-auto flex flex-wrap justify-between'>
        <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
          <h2 className='text-lg font-bold mb-4'>Contact Us</h2>
          <ul>
            <li>Email: info@example.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Follow us on Twitter</li>
          </ul>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
          <h2 className='text-lg font-bold mb-4'>About Us</h2>
          <ul>
            <li>Our Story</li>
            <li>Meet the Team</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
          <h2 className='text-lg font-bold mb-4'>Services</h2>
          <ul>
            <li>Web Design</li>
            <li>Graphic Design</li>
            <li>SEO Optimization</li>
          </ul>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/4'>
          <h2 className='text-lg font-bold mb-4'>Address</h2>
          <p>123 Main Street, Cityville</p>
          <p>State, Country, Zip</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
