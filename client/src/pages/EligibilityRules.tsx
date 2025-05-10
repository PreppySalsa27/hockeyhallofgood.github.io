import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaTrophy, FaClipboardCheck, FaHistory, FaInfoCircle, FaUserCheck, FaVoteYea, FaCalendarAlt } from "react-icons/fa";

const EligibilityRules = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 font-heading">Eligibility Rules</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaInfoCircle className="text-2xl text-primary mr-3" />
              <h2 className="text-xl font-bold text-primary font-heading">Overview</h2>
            </div>
            <p className="text-gray-700 mb-4">
              The Hockey Hall of Fame honors players, builders (individuals who have made significant contributions to the development of the game), and officials who have demonstrated exceptional skill, sportsmanship, character, and contributions to the sport of hockey.
            </p>
            <p className="text-gray-700">
              Election to the Hockey Hall of Fame is considered one of the highest honors in hockey. The selection process is thorough and rigorous to ensure that only the most deserving individuals are inducted.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaUserCheck className="text-2xl text-primary mr-3" />
              <h2 className="text-xl font-bold text-primary font-heading">Player Eligibility</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Waiting Period</h3>
                <p className="text-gray-700">
                  Players must have been retired from professional hockey for a minimum of three years before becoming eligible for induction.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Career Achievement</h3>
                <p className="text-gray-700">
                  Players must have demonstrated exceptional playing ability, sportsmanship, character, and contributions to their teams and to the game of hockey in general.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Career Length</h3>
                <p className="text-gray-700">
                  While there is no minimum number of games or seasons required, a player's career should demonstrate sustained excellence over a significant period.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Special Circumstances</h3>
                <p className="text-gray-700">
                  In exceptional circumstances, the three-year waiting period may be waived for players who have made extraordinary contributions to the game or faced career-ending circumstances.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaClipboardCheck className="text-2xl text-primary mr-3" />
              <h2 className="text-xl font-bold text-primary font-heading">Builder Category</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              The Builder Category honors individuals who have made significant contributions to the development of the game of hockey off the ice.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Eligible Individuals Include:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Coaches who have demonstrated leadership and innovation</li>
                <li>Team executives and general managers who have built successful franchises</li>
                <li>League officials who have contributed to the growth and development of hockey</li>
                <li>Media members who have made significant contributions to hockey journalism</li>
                <li>Other individuals who have contributed to the advancement of the game in a non-playing capacity</li>
              </ul>
            </div>
            
            <p className="text-gray-700">
              Unlike players, builders may be active or inactive in their role at the time of their induction. Their selection is based on the significance and lasting impact of their contributions to hockey.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaHistory className="text-2xl text-primary mr-3" />
              <h2 className="text-xl font-bold text-primary font-heading">Referee and Linesman Category</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              Game officials who have made a significant contribution to the game of hockey are eligible for induction in this category.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Eligibility Requirements</h3>
                <p className="text-gray-700">
                  Officials must have been retired from on-ice officiating for a minimum of three years before becoming eligible for induction.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Selection Criteria</h3>
                <p className="text-gray-700">
                  Selection is based on the official's record of performance, integrity, character, and contribution to the game. Officials who have demonstrated exceptional skill, judgment, and professionalism throughout their careers are considered for induction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaVoteYea className="text-2xl text-primary mr-3" />
              <h2 className="text-xl font-bold text-primary font-heading">Selection Process</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Selection Committee</h3>
                <p className="text-gray-700">
                  The Selection Committee consists of 18 individuals, including former players, coaches, executives, and media members. The committee's membership is reviewed and rotated periodically to ensure diverse perspectives.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Nomination</h3>
                <p className="text-gray-700">
                  Individuals may be nominated by any member of the hockey community, including fans. Nominations must be submitted in writing to the Selection Committee by a specified deadline each year.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Voting Process</h3>
                <p className="text-gray-700">
                  Each Selection Committee member may vote for up to four players, two builders, and one referee or linesman during each election. To be inducted, a candidate must receive at least 75% of the votes from the Selection Committee.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Annual Limits</h3>
                <p className="text-gray-700">
                  In each year, a maximum of four players, two builders, and one referee or linesman may be inducted. However, the Selection Committee is not obligated to induct the maximum number in any category.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-2xl text-primary mr-3" />
              <h2 className="text-xl font-bold text-primary font-heading">Induction Timeline</h2>
            </div>
            
            <div className="relative pl-8 space-y-6 before:absolute before:left-4 before:h-full before:w-0.5 before:bg-gray-200">
              <div className="relative">
                <div className="absolute left-[-32px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  1
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Nomination Deadline (March 15)</h3>
                <p className="text-gray-700">
                  All nominations for the current year's induction class must be submitted to the Selection Committee by this date.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-32px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Selection Committee Meeting (June)</h3>
                <p className="text-gray-700">
                  The Selection Committee meets to review nominations and vote on candidates for induction.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-32px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  3
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Announcement of Inductees (Late June)</h3>
                <p className="text-gray-700">
                  The individuals selected for induction are publicly announced.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-32px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  4
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Induction Ceremony (November)</h3>
                <p className="text-gray-700">
                  The formal induction ceremony takes place at the Hockey Hall of Fame in Toronto, where the new inductees are officially honored.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EligibilityRules;
