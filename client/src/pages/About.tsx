import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 font-heading">About the Hockey Hall of Fame</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-primary mb-4 font-heading">Our Mission</h2>
              <p className="mb-4 text-gray-700">
                The Hockey Hall of Fame is dedicated to preserving the history of ice hockey and honoring the game's
                greatest players, builders, and officials. Established in 1943, the Hall of Fame serves as the premier 
                showcase for the sport, celebrating the achievements of those who have made significant contributions 
                to hockey's development and heritage.
              </p>
              <p className="mb-4 text-gray-700">
                Our mission is three-fold:
              </p>
              <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
                <li>To honor and preserve the achievements of players, builders, and officials who have made outstanding contributions to the development of ice hockey</li>
                <li>To collect, preserve, research, exhibit and interpret objects, images and resource materials connected with the game at all levels</li>
                <li>To provide educational programming that promotes the positive values of hockey and its benefits for social development</li>
              </ul>
              <p className="text-gray-700">
                Through our exhibitions, events, and educational programs, we strive to share the rich history and 
                inspiring stories of hockey's greatest legends with fans of all ages from around the world.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <img 
              src="https://pixabay.com/get/g6ca9aff82a5a2c53a5d41a0e43a4be7f5d94e6c25edf0d7b3a0c272e8ca39f4e1bd196f4c3a90b73ca1beac4e7582f31a6bf3dc1c5e7d65efe79acdd3e65f89d_1280.jpg" 
              alt="Hockey Hall of Fame Building" 
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-primary mb-2 font-heading">Visit Us</h3>
              <address className="not-italic text-gray-700 mb-4">
                <p>123 Hockey Plaza</p>
                <p>Toronto, ON M4B 1B3</p>
                <p>Canada</p>
              </address>
              <p className="text-gray-700">
                <strong>Hours:</strong> 9:30 AM - 5:00 PM daily<br />
                <strong>Phone:</strong> (123) 456-7890<br />
                <strong>Email:</strong> info@hockeyhalloffame.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-primary mb-4 font-heading">Our History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4 text-gray-700">
                  The Hockey Hall of Fame was established in 1943 to honor and memorialize individuals who have 
                  contributed to the development of the game of ice hockey, and to collect and preserve objects, 
                  photographs and data related to the history of ice hockey in Canada and throughout the world.
                </p>
                <p className="mb-4 text-gray-700">
                  The first class of honorees were inducted in 1945, which included players such as Hobey Baker, 
                  Howie Morenz, and Georges Vézina. Since then, the Hall has inducted over 400 individuals and has 
                  expanded to include not just players, but also builders, officials, and teams that have made 
                  significant contributions to the sport.
                </p>
                <p className="text-gray-700">
                  In 1993, the Hockey Hall of Fame moved to its current location in downtown Toronto, where it 
                  houses the most comprehensive collection of hockey artifacts and memorabilia in the world, 
                  including the original Stanley Cup bowl.
                </p>
              </div>
              <div>
                <img 
                  src="https://pixabay.com/get/g3de15e0b509ca61413ab7e8da9acdd8ac2230d936e42b8550412e65a06d030b248d004d48e69249da480833dbd2f0190bac4f40ed80175b5ca199a9ec9ffb68d_1280.jpg" 
                  alt="Hockey Hall of Fame Gallery" 
                  className="w-full rounded-lg shadow-md mb-4"
                />
                <p className="text-sm text-gray-500 italic">
                  The Hockey Hall of Fame houses countless treasures from the sport's rich history, including 
                  jerseys, equipment, and memorabilia from the game's greatest players.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div id="events" className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-primary mb-4 font-heading">Annual Induction Events</h2>
            <p className="mb-4 text-gray-700">
              Each year, the Hockey Hall of Fame hosts a series of events to honor its new inductees. The 
              induction weekend typically takes place in November and includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-primary mb-2">Inductee Media Conference</h3>
                <p className="text-sm text-gray-700">
                  The inductees meet with the media to discuss their careers and the honor of being inducted 
                  into the Hall of Fame.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-primary mb-2">Ring Ceremony</h3>
                <p className="text-sm text-gray-700">
                  A private ceremony where inductees receive their official Hockey Hall of Fame Member rings.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-primary mb-2">Induction Celebration</h3>
                <p className="text-sm text-gray-700">
                  The formal induction ceremony where the new members are officially welcomed into the Hall of Fame.
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              The next induction ceremony is scheduled for November 15, 2023. Join us for this historic 
              celebration as we honor the newest members of the Hockey Hall of Fame.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-primary mb-4 font-heading">Our Exhibits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-primary mb-2">The NHL Zone</h3>
                <p className="mb-4 text-gray-700">
                  Featuring exhibits on current NHL teams and players, including interactive displays and memorabilia 
                  from recent Stanley Cup championships.
                </p>
                
                <h3 className="font-bold text-primary mb-2">The Great Hall</h3>
                <p className="mb-4 text-gray-700">
                  Home to the Stanley Cup and the plaques of all inducted members, this stunning room is the heart 
                  of the Hockey Hall of Fame.
                </p>
                
                <h3 className="font-bold text-primary mb-2">The International Zone</h3>
                <p className="text-gray-700">
                  Celebrating hockey's global reach with exhibits on international tournaments, Olympic hockey, 
                  and the contributions of players from around the world.
                </p>
              </div>
              <div>
                <img 
                  src="https://pixabay.com/get/gae8e79ec20b0615b026afbb38de38a8b8825d8af88af3853a496aa3b3d749a6fec6b9cf373a56327b0686a9393960c2f387ac3724c58aca117181ecd8f94129c_1280.jpg" 
                  alt="Stanley Cup Display" 
                  className="w-full rounded-lg shadow-md mb-4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-primary mb-2">Interactive Experiences</h3>
                    <p className="text-sm text-gray-700">
                      Test your skills in our shooting gallery or try your hand at being a hockey broadcaster in 
                      our TSN SportsCentre Experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Special Exhibitions</h3>
                    <p className="text-sm text-gray-700">
                      Throughout the year, we host special exhibitions exploring different aspects of hockey history 
                      and culture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
