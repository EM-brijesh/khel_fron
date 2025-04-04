import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative bg-indigo-800 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80"
          alt="Sports background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Sports Community Awaits
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl">
            Join Khelo to discover local sports events, connect with fellow athletes, 
            and make every game more exciting.
          </p>
          <p classname='bg-red-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ipsam recusandae enim amet natus commodi nam dolore quidem, deserunt corporis explicabo cumque quod earum ea alias nobis, cupiditate velit odit!</p>
          <div className="mt-10">
            <Link 
              to="/auth" 
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
