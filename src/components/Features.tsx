import Card from './StaticCard';

export const Features = () => {
  return (
    <div className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Heading section */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Why Choose Khelo?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600 sm:mt-3 sm:text-lg">
            Connect with local sports enthusiasts and make every game count
          </p>
        </div>

        {/* Cards grid with fallback spacing */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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