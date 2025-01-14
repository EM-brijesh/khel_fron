import Card from './StaticCard';



export const Features = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Khelo?</h2>
          <p className="mt-4 text-xl text-gray-600">Connect with local sports enthusiasts and make every game count</p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-float bg-indigo"
          style={{ animationDelay: '0s' }}
        >
          {/* Cards only on Home page */}
          <Card
            title="Cricket Match"
            desc="Need 6 Players for the match!"
            date="20:00"
            location="ISF Turf Kanaika"
            vacant={8} isFull={false} participants={['Rahul', 'Raj', '+2']}
          />
          <Card
            title="FootBall Match"
            desc="Any team up for FUTSAL?"
            date="16:00"
            location="Play Arena Lower Parel"
            vacant={10} isFull={false} participants={["Mohan", "Roy", '+4']}
          />
          <Card
            title="Volley SESh!"
            desc="Join Morning Volleyball"
            date="7:30"
            location="Khar GYM-Khana"
            vacant={6} isFull={false} participants={["Adam", "Ravi", '+2']}
          />
        </div>




        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Users className="w-6 h-6 text-indigo-600" />}
            title="Community First"
            description="Join a vibrant community of sports enthusiasts in your area"
          />
          <Feature
            icon={<Calendar className="w-6 h-6 text-indigo-600" />}
            title="Regular Events"
            description="Find and participate in weekly sports events near you"
          />
          <Feature
            icon={<Trophy className="w-6 h-6 text-indigo-600" />}
            title="All Skill Levels"
            description="Whether you're a beginner or pro, there's a place for you"
          />
          <Feature
            icon={<MapPin className="w-6 h-6 text-indigo-600" />}
            title="Local Focus"
            description="Discover sports venues and events in your neighborhood"
          />
        </div> */}
      </div>
    </div>
  );
}