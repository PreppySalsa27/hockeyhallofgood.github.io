import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaTrophy, FaMedal, FaPlayCircle } from "react-icons/fa";
import { Player, Season } from "@shared/schema";

type SeasonStatsProps = {
  seasons: Season[];
};

const SeasonStats = ({ seasons }: SeasonStatsProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GP</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">G</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">A</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PTS</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">+/-</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PIM</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOI</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOG</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S%</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FO%</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Sort seasons by year descending */}
          {[...seasons]
            .sort((a, b) => parseInt(b.season.split('-')[0]) - parseInt(a.season.split('-')[0]))
            .map((season, index) => (
              <tr key={index}>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.season}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.team}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.gamesPlayed}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.goals}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.assists}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">{season.points}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                  {season.plusMinus > 0 ? `+${season.plusMinus}` : season.plusMinus}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.penaltyMinutes}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.timeOnIce}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.shotsOnGoal}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{season.shootingPercentage}%</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                  {season.faceoffPercentage ? `${season.faceoffPercentage}%` : "N/A"}
                </td>
              </tr>
            ))}
          {/* Career row */}
          <tr className="bg-gray-50">
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">CAREER</td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {Array.from(new Set(seasons.map(s => s.team))).join(', ')}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {seasons.reduce((sum, season) => sum + season.gamesPlayed, 0)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {seasons.reduce((sum, season) => sum + season.goals, 0)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {seasons.reduce((sum, season) => sum + season.assists, 0)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {seasons.reduce((sum, season) => sum + season.points, 0)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {calculateCareerPlusMinus(seasons)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {seasons.reduce((sum, season) => sum + season.penaltyMinutes, 0)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {calculateAverageTimeOnIce(seasons)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {seasons.reduce((sum, season) => sum + season.shotsOnGoal, 0)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {calculateCareerShootingPercentage(seasons)}%
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
              {calculateCareerFaceoffPercentage(seasons)}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const calculateCareerPlusMinus = (seasons: Season[]) => {
  const total = seasons.reduce((sum, season) => sum + season.plusMinus, 0);
  return total > 0 ? `+${total}` : total;
};

const calculateAverageTimeOnIce = (seasons: Season[]) => {
  const totalMinutes = seasons.reduce((sum, season) => {
    const [min, sec] = season.timeOnIce.split(':').map(Number);
    return sum + min * 60 + sec;
  }, 0);
  
  const averageSeconds = Math.round(totalMinutes / seasons.length);
  const minutes = Math.floor(averageSeconds / 60);
  const seconds = averageSeconds % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const calculateCareerShootingPercentage = (seasons: Season[]) => {
  const totalGoals = seasons.reduce((sum, season) => sum + season.goals, 0);
  const totalShots = seasons.reduce((sum, season) => sum + season.shotsOnGoal, 0);
  
  if (totalShots === 0) return 0;
  return ((totalGoals / totalShots) * 100).toFixed(1);
};

const calculateCareerFaceoffPercentage = (seasons: Season[]) => {
  const validSeasons = seasons.filter(s => s.faceoffPercentage !== null);
  if (validSeasons.length === 0) return "N/A";
  
  const totalPercentage = validSeasons.reduce((sum, season) => sum + (season.faceoffPercentage || 0), 0);
  return (totalPercentage / validSeasons.length).toFixed(1);
};

const PlayerProfile = () => {
  const [, params] = useRoute<{ id: string }>("/player/:id");
  const playerId = params?.id ? parseInt(params.id) : undefined;
  const [activeTab, setActiveTab] = useState("regular");
  
  const { data: player, isLoading } = useQuery<Player>({
    queryKey: ['/api/players', playerId],
    enabled: !!playerId,
  });

  const { data: relatedPlayers } = useQuery<Player[]>({
    queryKey: ['/api/players/related', playerId],
    enabled: !!playerId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            Loading player data...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            Player not found
          </CardContent>
        </Card>
      </div>
    );
  }

  const inductionYear = new Date(player.inductionYear).getFullYear();
  const careerStartYear = new Date(player.career.start).getFullYear();
  const careerEndYear = player.career.end 
    ? new Date(player.career.end).getFullYear() 
    : 'Present';

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Link href="/inductees" className="text-primary hover:underline flex items-center">
            <FaArrowLeft className="mr-2" /> Back to All Inductees
          </Link>
        </div>
        
        {/* Player Header */}
        <Card className="mb-6">
          <div className="bg-primary px-6 py-4">
            <h2 className="text-white font-heading font-bold text-2xl">
              {player.firstName} {player.lastName}
            </h2>
            <p className="text-gray-200">Inducted: {inductionYear}</p>
          </div>
          
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Player Image and Quick Stats */}
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img 
                  src={player.photoUrl} 
                  alt={`${player.firstName} ${player.lastName}`} 
                  className="w-full rounded-lg shadow-md"
                />
                
                {/* Quick Stats */}
                <div className="bg-gray-100 rounded-lg p-4 mt-4">
                  <h3 className="font-heading font-bold text-lg text-primary mb-3">Career Overview</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Position</p>
                      <p className="font-medium">{player.position}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Teams</p>
                      <p className="font-medium">
                        {Array.from(new Set(player.seasons.map(s => s.team))).join(', ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Years Active</p>
                      <p className="font-medium">{careerStartYear} - {careerEndYear}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Jersey Number</p>
                      <p className="font-medium">#{player.jerseyNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Birthplace</p>
                      <p className="font-medium">{player.birthplace}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Birth Date</p>
                      <p className="font-medium">
                        {new Date(player.birthDate).toLocaleDateString("en-US", { 
                          month: "long", 
                          day: "numeric", 
                          year: "numeric" 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Player Bio and Stats */}
              <div className="md:w-2/3">
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl text-primary mb-3">Biography</h3>
                  <p className="text-gray-700 whitespace-pre-line">{player.description}</p>
                </div>
                
                {/* Achievements */}
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl text-primary mb-3">Achievements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {player.achievements.map((achievement, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="flex items-center">
                          {achievement.includes("Stanley Cup") ? (
                            <FaTrophy className="text-accent mr-2" />
                          ) : (
                            <FaMedal className="text-accent mr-2" />
                          )}
                          <span className="font-medium">{achievement.split(' (')[0]}</span>
                        </div>
                        {achievement.includes("(") && (
                          <p className="text-xs text-gray-500 mt-1">
                            {achievement.split('(')[1].replace(')', '')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Career Highlights Video */}
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl text-primary mb-3">Career Highlights</h3>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <FaPlayCircle className="text-5xl text-gray-400 mb-3 mx-auto" />
                      <p className="text-gray-500">Video highlights available on official player page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Statistics Tabs */}
        <Card className="mb-8">
          <Tabs defaultValue="regular" onValueChange={setActiveTab} value={activeTab}>
            <div className="border-b border-gray-200">
              <TabsList className="flex -mb-px">
                <TabsTrigger 
                  value="regular" 
                  className={`py-4 px-6 ${
                    activeTab === "regular" 
                      ? "border-b-2 border-primary text-primary font-medium" 
                      : "text-gray-500 hover:text-gray-700 font-medium"
                  }`}
                >
                  Regular Season Stats
                </TabsTrigger>
                <TabsTrigger 
                  value="playoff" 
                  className={`py-4 px-6 ${
                    activeTab === "playoff" 
                      ? "border-b-2 border-primary text-primary font-medium" 
                      : "text-gray-500 hover:text-gray-700 font-medium"
                  }`}
                >
                  Playoff Stats
                </TabsTrigger>
                <TabsTrigger 
                  value="international" 
                  className={`py-4 px-6 ${
                    activeTab === "international" 
                      ? "border-b-2 border-primary text-primary font-medium" 
                      : "text-gray-500 hover:text-gray-700 font-medium"
                  }`}
                >
                  International Stats
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="regular">
              <SeasonStats 
                seasons={player.seasons.filter(season => season.type === 'regular')} 
              />
            </TabsContent>
            
            <TabsContent value="playoff">
              <SeasonStats 
                seasons={player.seasons.filter(season => season.type === 'playoff')} 
              />
            </TabsContent>
            
            <TabsContent value="international">
              <SeasonStats 
                seasons={player.seasons.filter(season => season.type === 'international')} 
              />
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Related Inductees */}
        {relatedPlayers && relatedPlayers.length > 0 && (
          <div className="mb-8">
            <h3 className="font-heading font-bold text-xl text-primary mb-4">Other Notable Inductees</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedPlayers.map(relatedPlayer => (
                <Card 
                  key={relatedPlayer.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition"
                  onClick={() => window.location.href = `/player/${relatedPlayer.id}`}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedPlayer.photoUrl} 
                      alt={`${relatedPlayer.firstName} ${relatedPlayer.lastName}`} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-heading font-bold text-lg mb-1">
                      {relatedPlayer.firstName} {relatedPlayer.lastName}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Inducted: {new Date(relatedPlayer.inductionYear).getFullYear()}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-3">GP: {relatedPlayer.gamesPlayed}</span>
                      <span>PTS: {relatedPlayer.points}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayerProfile;
