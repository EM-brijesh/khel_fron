import Card from './StaticCard';

export const Features = () => {
  return (
    <div className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading section with adjusted spacing */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Why Choose Khelo?
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Connect with local sports enthusiasts and make every game count
          </p>
        </div>

        {/* Card container with improved spacing and mobile-first layout */}
        <div className="w-full space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6">
          {/* Cricket Match */}
          <div className="w-full">
            <Card 
              title="Cricket Match"
              desc="Need 6 Players for the match!"
              date="20:00"
              location="ISF Turf Kanaika"
              vacant={8}
              isFull={false}
              participants={['Rahul', 'Raj', '+2']}
            />
          </div>

          {/* Football Match */}
          <div className="w-full">
            <Card
              title="FootBall Match"
              desc="Any team up for FUTSAL?"
              date="16:00"
              location="Play Arena Lower Parel"
              vacant={10}
              isFull={false}
              participants={["Mohan", "Roy", '+4']}
            />
          </div>

          {/* Volleyball */}
          <div className="w-full">
            <Card
              title="Volley SESh!"
              desc="Join Morning Volleyball"
              date="7:30"
              location="Khar GYM-Khana"
              vacant={6}
              isFull={false}
              participants={["Adam", "Ravi", '+2']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};