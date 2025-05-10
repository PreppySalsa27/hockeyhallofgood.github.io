import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaChevronRight, FaArrowRight, FaTrophy, FaMedal } from "react-icons/fa";
import { Player } from "@shared/schema";

const Home = () => {
  const { data: latestInductee, isLoading } = useQuery<Player>({
    queryKey: ['/api/players/latest'],
  });

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <div 
          className="w-full h-64 md:h-80 bg-cover bg-center rounded-lg shadow-lg mb-8"
          style={{ 
            backgroundImage: "url('https://pixabay.com/get/g9afeb2e09be59d2a9a04b033ca89ee7006ab4d5dd6eb4c8f5e905a95bd0531540eb33d55f88c7b7af6ebdaa71ca0bb02176b02097f5c9d95f6ce0a5d3e7bfeb4_1280.jpg')",
            backgroundPosition: "center"
          }}
        >
          <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
            <h2 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center">
              Honoring Hockey's Legends
            </h2>
          </div>
        </div>
        
        {/* Featured Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* About the Hall Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-xl text-primary mb-4">
                About The Hall of Fame
              </h3>
              <p className="text-gray-700 mb-4">
                The Hockey Hall of Fame honors and preserves the history of the game, 
                recognizing the achievements of players, builders, and officials who have 
                made outstanding contributions to the sport of hockey.
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is to celebrate hockey excellence, preserve hockey history and 
                provide entertainment and educational experiences for hockey fans worldwide.
              </p>
              <Link href="/about">
                <Button className="inline-block bg-primary hover:bg-opacity-90 text-white font-medium px-4 py-2 rounded transition">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Recent Inductee Feature */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <h3 className="font-heading font-bold text-xl text-primary">Latest Inductee</h3>
                <span className="ml-3 px-2 py-1 bg-accent text-primary text-xs font-medium rounded">
                  {latestInductee ? new Date(latestInductee.inductionYear).getFullYear() : ""}
                </span>
              </div>
              
              {isLoading ? (
                <div className="h-48 flex items-center justify-center">
                  <p>Loading latest inductee...</p>
                </div>
              ) : latestInductee ? (
                <div className="flex flex-col md:flex-row gap-4">
                  <img 
                    src={latestInductee.photoUrl} 
                    alt={`${latestInductee.firstName} ${latestInductee.lastName}`} 
                    className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow"
                  />
                  
                  <div className="md:w-2/3">
                    <h4 className="font-heading font-bold text-lg mb-2">
                      {latestInductee.firstName} {latestInductee.lastName}
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      {latestInductee.description.substring(0, 150)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {latestInductee.achievements.slice(0, 3).map((achievement, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
                          {achievement}
                        </span>
                      ))}
                    </div>
                    <Link href={`/player/${latestInductee.id}`}>
                      <Button 
                        className="inline-block bg-secondary hover:bg-opacity-90 text-white font-medium px-4 py-2 rounded transition"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p>No inductee data available</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Secondary Featured Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Trophy Display */}
          <Card className="overflow-hidden">
            <img 
              src="https://pixabay.com/get/gae8e79ec20b0615b026afbb38de38a8b8825d8af88af3853a496aa3b3d749a6fec6b9cf373a56327b0686a9393960c2f387ac3724c58aca117181ecd8f94129c_1280.jpg" 
              alt="Hall of Fame Trophy" 
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-heading font-bold text-lg text-primary mb-2">
                The Hall of Fame Trophy
              </h3>
              <p className="text-gray-700 text-sm">
                The iconic symbol of hockey excellence awarded to players who have 
                demonstrated exceptional skill and contribution to the sport.
              </p>
            </CardContent>
          </Card>
          
          {/* Visit Information */}
          <Card className="overflow-hidden">
            <img 
              src="https://pixabay.com/get/g3de15e0b509ca61413ab7e8da9acdd8ac2230d936e42b8550412e65a06d030b248d004d48e69249da480833dbd2f0190bac4f40ed80175b5ca199a9ec9ffb68d_1280.jpg" 
              alt="Hall of Fame Building" 
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-heading font-bold text-lg text-primary mb-2">
                Plan Your Visit
              </h3>
              <p className="text-gray-700 text-sm">
                Experience hockey history firsthand with interactive exhibits, 
                historic memorabilia, and the legendary Hall of Fame gallery.
              </p>
            </CardContent>
          </Card>
          
          {/* Upcoming Induction */}
          <Card className="overflow-hidden">
            <div className="bg-primary text-white p-4">
              <h3 className="font-heading font-bold text-lg mb-1">Upcoming Induction</h3>
              <p className="text-sm opacity-80">November 15, 2023</p>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-4">
                The next class of legends will be honored in our annual induction ceremony. 
                Join us for this historic celebration.
              </p>
              <Link href="/about#events" className="text-secondary font-medium hover:underline">
                Learn more
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* All Inductees Button */}
        <div className="text-center mb-8">
          <Link href="/inductees">
            <Button 
              className="inline-block bg-primary hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg shadow transition"
            >
              View All Inductees
              <FaChevronRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
