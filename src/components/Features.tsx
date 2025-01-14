import Card from './StaticCard';

export const Features = () => {
  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive heading section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Why Choose Khelo?
          </h2>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with local sports enthusiasts and make every game count
          </p>
        </div>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-float">
          {/* Cricket Match Card */}
          <div className="flex justify-center">
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

          {/* Football Match Card */}
          <div className="flex justify-center">
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

          {/* Volleyball Card */}
          <div className="flex justify-center">
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