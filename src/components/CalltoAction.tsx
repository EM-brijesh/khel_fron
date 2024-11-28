
import { Link } from 'react-router-dom';

export const CallToAction = () => {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to join the community?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Create your account now and start connecting with sports enthusiasts near you.
          </p>
          <div className="mt-8">
            <Link
              to="/auth"
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}