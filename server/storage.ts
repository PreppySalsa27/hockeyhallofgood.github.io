import { players, type Player, type InsertPlayer, Season, Career } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<Player | undefined>;
  getUserByUsername(username: string): Promise<Player | undefined>;
  createUser(user: InsertPlayer): Promise<Player>;
  
  // Player CRUD operations
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(id: number): Promise<Player | undefined>;
  getLatestInductee(): Promise<Player | undefined>;
  getRelatedPlayers(id: number, limit?: number): Promise<Player[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, Player>;
  private playerData: Map<number, Player>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.playerData = new Map();
    this.currentId = 1;
    this.initializePlayerData();
  }

  // User methods for compatibility with existing interface
  async getUser(id: number): Promise<Player | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<Player | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertPlayer): Promise<Player> {
    const id = this.currentId++;
    const user = { ...insertUser, id } as unknown as Player;
    this.users.set(id, user);
    return user;
  }

  // Player methods
  async getAllPlayers(): Promise<Player[]> {
    return Array.from(this.playerData.values());
  }

  async getPlayerById(id: number): Promise<Player | undefined> {
    return this.playerData.get(id);
  }

  async getLatestInductee(): Promise<Player | undefined> {
    // Get the player with the most recent induction year
    const players = Array.from(this.playerData.values());
    if (players.length === 0) return undefined;

    return players.reduce((latest, current) => {
      const latestDate = new Date(latest.inductionYear);
      const currentDate = new Date(current.inductionYear);
      return currentDate > latestDate ? current : latest;
    });
  }

  async getRelatedPlayers(id: number, limit: number = 4): Promise<Player[]> {
    const player = this.playerData.get(id);
    if (!player) return [];

    // Get players with similar position or era
    const players = Array.from(this.playerData.values())
      .filter(p => p.id !== id) // Exclude the current player
      .sort((a, b) => {
        // Sort by similarity (same position gets priority)
        if (a.position === player.position && b.position !== player.position) {
          return -1;
        }
        if (a.position !== player.position && b.position === player.position) {
          return 1;
        }
        
        // Then by induction year (most recent first)
        return new Date(b.inductionYear).getTime() - new Date(a.inductionYear).getTime();
      })
      .slice(0, limit);
    
    return players;
  }

  private initializePlayerData() {
    // Initialize with some hockey legends
    const players: Player[] = [
      {
        id: 1,
        firstName: "Wayne",
        lastName: "Gretzky",
        position: "Center",
        birthDate: new Date("1961-01-26").toISOString(),
        birthplace: "Brantford, ON, CAN",
        photoUrl: "https://pixabay.com/get/g492fd836e666116188277e3d943e828a1ae77b005016ae2e1d9928e576201c128ba264974bcb539aa23d318ca72df0076f5cf4629ce1a5d2a98ded2b0795e72d_1280.jpg",
        jerseyNumber: 99,
        inductionYear: new Date("1999-11-22").toISOString(),
        description: "Wayne Gretzky, known as 'The Great One,' is widely regarded as the greatest hockey player of all time. His vision, playmaking abilities, and hockey sense revolutionized the game. During his illustrious career spanning from 1979 to 1999, Gretzky played for the Edmonton Oilers, Los Angeles Kings, St. Louis Blues, and New York Rangers.\n\nGretzky holds or shares 61 NHL records, including most goals (894), most assists (1,963), and most points (2,857). His dominance was such that he won the Hart Trophy (MVP) nine times and the Art Ross Trophy (leading scorer) ten times. He led the Edmonton Oilers to four Stanley Cup championships and was instrumental in popularizing hockey in the United States, particularly during his time with the Los Angeles Kings.",
        gamesPlayed: 1487,
        goals: 894,
        assists: 1963,
        points: 2857,
        plusMinus: 520,
        penaltyMinutes: 577,
        timeOnIce: "22:14",
        shotsOnGoal: 5088,
        shootingPercentage: 17.6,
        faceoffPercentage: 50.2,
        hits: null,
        blocks: null,
        achievements: [
          "4× Stanley Cup Champion (1984, 1985, 1987, 1988)",
          "9× Hart Memorial Trophy (1980-1987, 1989)",
          "10× Art Ross Trophy (1981-1987, 1990-1991, 1994)",
          "5× Lester B. Pearson Award (1982-1985, 1987)",
          "2× Conn Smythe Trophy (1985, 1988)",
          "5× Lady Byng Trophy (1980, 1991, 1992, 1994, 1999)",
          "Jersey #99 retired by NHL"
        ],
        seasons: JSON.stringify([
          {
            season: "1979-80",
            team: "EDM",
            type: "regular",
            gamesPlayed: 79,
            goals: 51,
            assists: 86,
            points: 137,
            plusMinus: 15,
            penaltyMinutes: 21,
            timeOnIce: "20:15",
            shotsOnGoal: 284,
            shootingPercentage: 18.0,
            faceoffPercentage: 48.2
          },
          {
            season: "1981-82",
            team: "EDM",
            type: "regular",
            gamesPlayed: 80,
            goals: 92,
            assists: 120,
            points: 212,
            plusMinus: 81,
            penaltyMinutes: 26,
            timeOnIce: "23:12",
            shotsOnGoal: 370,
            shootingPercentage: 24.9,
            faceoffPercentage: 52.1
          },
          {
            season: "1985-86",
            team: "EDM",
            type: "regular",
            gamesPlayed: 80,
            goals: 52,
            assists: 163,
            points: 215,
            plusMinus: 71,
            penaltyMinutes: 46,
            timeOnIce: "23:45",
            shotsOnGoal: 240,
            shootingPercentage: 21.7,
            faceoffPercentage: 51.8
          }
        ]),
        career: JSON.stringify({
          start: new Date("1979-10-10").toISOString(),
          end: new Date("1999-04-18").toISOString()
        })
      },
      {
        id: 2,
        firstName: "Mario",
        lastName: "Lemieux",
        position: "Center",
        birthDate: new Date("1965-10-05").toISOString(),
        birthplace: "Montreal, QC, CAN",
        photoUrl: "https://pixabay.com/get/g6e51686c5e2ad0911f03b9eb752c8cc36fbad5fbd01dadd5b2e1cd6ae5a2064ffec1e000b3d3c82d8edd49f20bed879bf0dd6dded2dd4f52bea97a0a33aaa40e_1280.jpg",
        jerseyNumber: 66,
        inductionYear: new Date("1997-11-17").toISOString(),
        description: "Mario Lemieux, known as 'Le Magnifique,' is widely regarded as one of the most talented players in NHL history. At 6'4\", Lemieux combined exceptional size with extraordinary skill, vision, and stickhandling ability. His career was marked by both brilliance on the ice and personal courage off it, as he battled and overcame Hodgkin's lymphoma and chronic back problems.\n\nDespite health challenges that caused him to miss significant playing time and retire temporarily, Lemieux amassed incredible statistics. He is the only person to have his name on the Stanley Cup as both a player and an owner, having purchased the Pittsburgh Penguins in 1999 and saving the franchise from bankruptcy.",
        gamesPlayed: 915,
        goals: 690,
        assists: 1033,
        points: 1723,
        plusMinus: 115,
        penaltyMinutes: 834,
        timeOnIce: "21:03",
        shotsOnGoal: 3633,
        shootingPercentage: 19.0,
        faceoffPercentage: 53.8,
        hits: null,
        blocks: null,
        achievements: [
          "2× Stanley Cup Champion (1991, 1992)",
          "3× Hart Memorial Trophy (1988, 1993, 1996)",
          "6× Art Ross Trophy (1988, 1989, 1992, 1993, 1996, 1997)",
          "2× Conn Smythe Trophy (1991, 1992)",
          "3× Ted Lindsay Award (1986, 1988, 1993)",
          "Olympic Gold Medal (2002)",
          "Jersey #66 retired by Pittsburgh Penguins"
        ],
        seasons: JSON.stringify([
          {
            season: "1984-85",
            team: "PIT",
            type: "regular",
            gamesPlayed: 73,
            goals: 43,
            assists: 57,
            points: 100,
            plusMinus: -35,
            penaltyMinutes: 54,
            timeOnIce: "20:10",
            shotsOnGoal: 259,
            shootingPercentage: 16.6,
            faceoffPercentage: 49.2
          },
          {
            season: "1988-89",
            team: "PIT",
            type: "regular",
            gamesPlayed: 76,
            goals: 85,
            assists: 114,
            points: 199,
            plusMinus: 41,
            penaltyMinutes: 100,
            timeOnIce: "22:13",
            shotsOnGoal: 313,
            shootingPercentage: 27.2,
            faceoffPercentage: 54.3
          },
          {
            season: "1992-93",
            team: "PIT",
            type: "regular",
            gamesPlayed: 60,
            goals: 69,
            assists: 91,
            points: 160,
            plusMinus: 55,
            penaltyMinutes: 38,
            timeOnIce: "21:45",
            shotsOnGoal: 290,
            shootingPercentage: 23.8,
            faceoffPercentage: 55.1
          }
        ]),
        career: JSON.stringify({
          start: new Date("1984-10-11").toISOString(),
          end: new Date("2006-01-24").toISOString()
        })
      },
      {
        id: 3,
        firstName: "Bobby",
        lastName: "Orr",
        position: "Defense",
        birthDate: new Date("1948-03-20").toISOString(),
        birthplace: "Parry Sound, ON, CAN",
        photoUrl: "https://pixabay.com/get/g81fa1ebf6bb3c9da19e69d1e10e7219b3a1ebf2b33f50a1a8c62fb0a61c33e59f54a03aaedbd6992b1ddac5e2ec5b25fb4d8b50e9d1eba7ef3d5b594af6f2e21_1280.jpg",
        jerseyNumber: 4,
        inductionYear: new Date("1979-09-01").toISOString(),
        description: "Bobby Orr revolutionized the role of a defenseman in hockey. Before Orr, defensemen were expected to stay back and focus primarily on preventing goals. Orr transformed the position with his exceptional skating ability, offensive prowess, and end-to-end rushes. He became the only defenseman to win the Art Ross Trophy as the league's top scorer, accomplishing this feat twice.\n\nDespite a career cut short by knee injuries at age 30, Orr's impact on hockey was immense. His style of play influenced generations of defensemen who followed him. His famous 'flying goal' in the 1970 Stanley Cup Finals, where he scored in overtime to clinch the championship for the Boston Bruins while being tripped and flying through the air, remains one of hockey's most iconic moments.",
        gamesPlayed: 657,
        goals: 270,
        assists: 645,
        points: 915,
        plusMinus: 597,
        penaltyMinutes: 953,
        timeOnIce: "28:26",
        shotsOnGoal: 2117,
        shootingPercentage: 12.8,
        faceoffPercentage: null,
        hits: null,
        blocks: null,
        achievements: [
          "2× Stanley Cup Champion (1970, 1972)",
          "8× James Norris Trophy (1968-1975)",
          "3× Hart Memorial Trophy (1970-1972)",
          "2× Art Ross Trophy (1970, 1975)",
          "2× Conn Smythe Trophy (1970, 1972)",
          "Calder Memorial Trophy (1967)",
          "Jersey #4 retired by Boston Bruins"
        ],
        seasons: JSON.stringify([
          {
            season: "1966-67",
            team: "BOS",
            type: "regular",
            gamesPlayed: 61,
            goals: 13,
            assists: 28,
            points: 41,
            plusMinus: 30,
            penaltyMinutes: 102,
            timeOnIce: "25:10",
            shotsOnGoal: 181,
            shootingPercentage: 7.2,
            faceoffPercentage: null
          },
          {
            season: "1969-70",
            team: "BOS",
            type: "regular",
            gamesPlayed: 76,
            goals: 33,
            assists: 87,
            points: 120,
            plusMinus: 54,
            penaltyMinutes: 125,
            timeOnIce: "28:45",
            shotsOnGoal: 221,
            shootingPercentage: 14.9,
            faceoffPercentage: null
          },
          {
            season: "1974-75",
            team: "BOS",
            type: "regular",
            gamesPlayed: 80,
            goals: 46,
            assists: 89,
            points: 135,
            plusMinus: 80,
            penaltyMinutes: 101,
            timeOnIce: "29:13",
            shotsOnGoal: 205,
            shootingPercentage: 22.4,
            faceoffPercentage: null
          }
        ]),
        career: JSON.stringify({
          start: new Date("1966-10-19").toISOString(),
          end: new Date("1978-11-08").toISOString()
        })
      },
      {
        id: 4,
        firstName: "Sidney",
        lastName: "Crosby",
        position: "Center",
        birthDate: new Date("1987-08-07").toISOString(),
        birthplace: "Cole Harbour, NS, CAN",
        photoUrl: "https://pixabay.com/get/g8b47a7ddd82efcc4e0da9c08af3bceb4f4378a76830cca1eef2699fb4b76be18c4e80a48203db9c45ac6a37b547ec4cb3a6183aa117da3567f9a7b3577690845_1280.jpg",
        jerseyNumber: 87,
        inductionYear: new Date("2023-11-15").toISOString(),
        description: "Sidney Crosby is widely regarded as one of the greatest hockey players of all time. Known for his exceptional playmaking abilities, leadership, and two-way play, Crosby has been the face of the NHL since entering the league in 2005.\n\nAs captain of the Pittsburgh Penguins, he led the team to three Stanley Cup championships in 2009, 2016, and 2017. His individual accolades include two Hart Memorial Trophies as the league's MVP, two Conn Smythe Trophies as playoff MVP, and multiple scoring titles.\n\nOn the international stage, Crosby scored the 'golden goal' for Team Canada in the 2010 Winter Olympics and has represented his country with distinction throughout his career. His combination of skill, vision, work ethic, and leadership has cemented his legacy as one of hockey's all-time greats.",
        gamesPlayed: 1185,
        goals: 560,
        assists: 984,
        points: 1544,
        plusMinus: 206,
        penaltyMinutes: 851,
        timeOnIce: "19:48",
        shotsOnGoal: 3857,
        shootingPercentage: 14.5,
        faceoffPercentage: 54.8,
        hits: 1021,
        blocks: 432,
        achievements: [
          "3× Stanley Cup Champion (2009, 2016, 2017)",
          "2× Hart Memorial Trophy (2007, 2014)",
          "2× Conn Smythe Trophy (2016, 2017)",
          "3× Ted Lindsay Award (2007, 2013, 2014)",
          "2× Art Ross Trophy (2007, 2014)",
          "2× Olympic Gold Medal (2010, 2014)",
          "World Cup Gold Medal (2016)",
          "IIHF World Championship Gold Medal (2015)"
        ],
        seasons: JSON.stringify([
          {
            season: "2005-06",
            team: "PIT",
            type: "regular",
            gamesPlayed: 81,
            goals: 39,
            assists: 63,
            points: 102,
            plusMinus: -1,
            penaltyMinutes: 110,
            timeOnIce: "18:32",
            shotsOnGoal: 283,
            shootingPercentage: 13.8,
            faceoffPercentage: 45.5
          },
          {
            season: "2010-11",
            team: "PIT",
            type: "regular",
            gamesPlayed: 41,
            goals: 32,
            assists: 34,
            points: 66,
            plusMinus: 20,
            penaltyMinutes: 31,
            timeOnIce: "19:00",
            shotsOnGoal: 161,
            shootingPercentage: 19.9,
            faceoffPercentage: 55.6
          },
          {
            season: "2022-23",
            team: "PIT",
            type: "regular",
            gamesPlayed: 82,
            goals: 33,
            assists: 60,
            points: 93,
            plusMinus: 18,
            penaltyMinutes: 56,
            timeOnIce: "19:58",
            shotsOnGoal: 218,
            shootingPercentage: 15.1,
            faceoffPercentage: 53.2
          },
          {
            season: "2021-22",
            team: "PIT",
            type: "regular",
            gamesPlayed: 69,
            goals: 31,
            assists: 53,
            points: 84,
            plusMinus: 19,
            penaltyMinutes: 48,
            timeOnIce: "20:05",
            shotsOnGoal: 205,
            shootingPercentage: 15.1,
            faceoffPercentage: 55.3
          },
          {
            season: "2020-21",
            team: "PIT",
            type: "regular",
            gamesPlayed: 55,
            goals: 24,
            assists: 38,
            points: 62,
            plusMinus: -1,
            penaltyMinutes: 26,
            timeOnIce: "20:24",
            shotsOnGoal: 159,
            shootingPercentage: 15.1,
            faceoffPercentage: 54.9
          },
          {
            season: "2016-17",
            team: "PIT",
            type: "playoff",
            gamesPlayed: 24,
            goals: 8,
            assists: 19,
            points: 27,
            plusMinus: 5,
            penaltyMinutes: 6,
            timeOnIce: "20:30",
            shotsOnGoal: 66,
            shootingPercentage: 12.1,
            faceoffPercentage: 53.8
          },
          {
            season: "2010",
            team: "CAN",
            type: "international",
            gamesPlayed: 7,
            goals: 4,
            assists: 3,
            points: 7,
            plusMinus: 3,
            penaltyMinutes: 2,
            timeOnIce: "19:45",
            shotsOnGoal: 18,
            shootingPercentage: 22.2,
            faceoffPercentage: 58.1
          }
        ]),
        career: JSON.stringify({
          start: new Date("2005-10-05").toISOString(),
          end: null
        })
      },
      {
        id: 5,
        firstName: "Alexander",
        lastName: "Ovechkin",
        position: "Left Wing",
        birthDate: new Date("1985-09-17").toISOString(),
        birthplace: "Moscow, RUS",
        photoUrl: "https://pixabay.com/get/gf2c1b9b33f94f7c94879fde36ca1fb1d79ef45c14f14bdbf5323e40f7d17ab85df22dbe95252066e5e6dd95aebc9ac9ea8c2d2c2e8eb1d8a307ff15ff1ff91e8_1280.jpg",
        jerseyNumber: 8,
        inductionYear: new Date("2022-11-14").toISOString(),
        description: "Alexander Ovechkin, known as 'The Great Eight,' is considered one of the greatest goal scorers in NHL history. His powerful shot, physical play, and goal-scoring ability have made him a dominant force since entering the league in 2005. As captain of the Washington Capitals, he led the team to their first Stanley Cup championship in 2018.\n\nOvechkin is known for his signature one-timer from the left face-off circle on the power play, which opponents struggle to defend despite knowing it's coming. His durability and consistency throughout his career have been remarkable, missing very few games due to injury despite his physical style of play.\n\nBeyond his NHL achievements, Ovechkin has represented Russia in international competitions with distinction. He's pursuing Wayne Gretzky's all-time goal scoring record of 894 goals, which many hockey analysts believe he has a legitimate chance of breaking.",
        gamesPlayed: 1347,
        goals: 848,
        assists: 661,
        points: 1509,
        plusMinus: 92,
        penaltyMinutes: 879,
        timeOnIce: "20:55",
        shotsOnGoal: 6289,
        shootingPercentage: 13.5,
        faceoffPercentage: null,
        hits: 3448,
        blocks: 512,
        achievements: [
          "Stanley Cup Champion (2018)",
          "3× Hart Memorial Trophy (2008, 2009, 2013)",
          "9× Maurice Richard Trophy (2008-2010, 2013-2016, 2018, 2020)",
          "Art Ross Trophy (2008)",
          "Calder Memorial Trophy (2006)",
          "Conn Smythe Trophy (2018)",
          "Ted Lindsay Award (2010)"
        ],
        seasons: JSON.stringify([
          {
            season: "2005-06",
            team: "WSH",
            type: "regular",
            gamesPlayed: 81,
            goals: 52,
            assists: 54,
            points: 106,
            plusMinus: 2,
            penaltyMinutes: 52,
            timeOnIce: "20:37",
            shotsOnGoal: 425,
            shootingPercentage: 12.2,
            faceoffPercentage: null
          },
          {
            season: "2007-08",
            team: "WSH",
            type: "regular",
            gamesPlayed: 82,
            goals: 65,
            assists: 47,
            points: 112,
            plusMinus: 28,
            penaltyMinutes: 40,
            timeOnIce: "23:06",
            shotsOnGoal: 446,
            shootingPercentage: 14.6,
            faceoffPercentage: null
          },
          {
            season: "2017-18",
            team: "WSH",
            type: "regular",
            gamesPlayed: 82,
            goals: 49,
            assists: 38,
            points: 87,
            plusMinus: 3,
            penaltyMinutes: 32,
            timeOnIce: "20:09",
            shotsOnGoal: 355,
            shootingPercentage: 13.8,
            faceoffPercentage: null
          },
          {
            season: "2017-18",
            team: "WSH",
            type: "playoff",
            gamesPlayed: 24,
            goals: 15,
            assists: 12,
            points: 27,
            plusMinus: 8,
            penaltyMinutes: 14,
            timeOnIce: "20:44",
            shotsOnGoal: 68,
            shootingPercentage: 22.1,
            faceoffPercentage: null
          },
          {
            season: "2014",
            team: "RUS",
            type: "international",
            gamesPlayed: 5,
            goals: 4,
            assists: 2,
            points: 6,
            plusMinus: -1,
            penaltyMinutes: 2,
            timeOnIce: "21:12",
            shotsOnGoal: 22,
            shootingPercentage: 18.2,
            faceoffPercentage: null
          }
        ]),
        career: JSON.stringify({
          start: new Date("2005-10-05").toISOString(),
          end: null
        })
      },
      {
        id: 6,
        firstName: "Patrick",
        lastName: "Roy",
        position: "Goalie",
        birthDate: new Date("1965-10-05").toISOString(),
        birthplace: "Quebec City, QC, CAN",
        photoUrl: "https://pixabay.com/get/gfda3dcbc2fd16b979af0d3a21e1e86a84c5e71ee4e16f2c4f49f3ac7e7cc6adaf1a1a4e85e2f8a26a8a42cbba69fff2ca3fb1d661cb16b4fac8e7b38e6a46b62_1280.jpg",
        jerseyNumber: 33,
        inductionYear: new Date("2006-11-13").toISOString(),
        description: "Patrick Roy is widely regarded as one of the greatest goaltenders in hockey history. Known for his butterfly style, competitive fire, and clutch performances, Roy revolutionized the goaltending position and set new standards for excellence.\n\nOver his 19-year NHL career with the Montreal Canadiens and Colorado Avalanche, Roy won four Stanley Cup championships (1986, 1993, 1996, 2001), earning the Conn Smythe Trophy as playoff MVP a record three times. His impact on goaltending technique transformed how the position is played, with his perfection of the butterfly style influencing generations of goaltenders who followed him.\n\nBeyond his technical skill, Roy was known for his intense competitive nature and ability to perform in high-pressure situations, earning him the nickname 'Saint Patrick' among Montreal fans.",
        gamesPlayed: 1029,
        goals: 0,
        assists: 45,
        points: 45,
        plusMinus: 0,
        penaltyMinutes: 347,
        timeOnIce: "60:00",
        shotsOnGoal: 0,
        shootingPercentage: 0,
        faceoffPercentage: null,
        hits: null,
        blocks: null,
        achievements: [
          "4× Stanley Cup Champion (1986, 1993, 1996, 2001)",
          "3× Conn Smythe Trophy (1986, 1993, 2001)",
          "3× Vezina Trophy (1989, 1990, 1992)",
          "5× William M. Jennings Trophy (1987, 1988, 1989, 1992, 2002)",
          "NHL All-Star Game MVP (1992)",
          "NHL All-Rookie Team (1986)",
          "Jersey #33 retired by Montreal Canadiens and Colorado Avalanche"
        ],
        seasons: JSON.stringify([
          {
            season: "1985-86",
            team: "MTL",
            type: "regular",
            gamesPlayed: 47,
            goals: 0,
            assists: 1,
            points: 1,
            plusMinus: 0,
            penaltyMinutes: 16,
            timeOnIce: "60:00",
            shotsOnGoal: 0,
            shootingPercentage: 0,
            faceoffPercentage: null
          },
          {
            season: "1988-89",
            team: "MTL",
            type: "regular",
            gamesPlayed: 48,
            goals: 0,
            assists: 2,
            points: 2,
            plusMinus: 0,
            penaltyMinutes: 14,
            timeOnIce: "60:00",
            shotsOnGoal: 0,
            shootingPercentage: 0,
            faceoffPercentage: null
          },
          {
            season: "1995-96",
            team: "COL",
            type: "regular",
            gamesPlayed: 43,
            goals: 0,
            assists: 3,
            points: 3,
            plusMinus: 0,
            penaltyMinutes: 24,
            timeOnIce: "60:00",
            shotsOnGoal: 0,
            shootingPercentage: 0,
            faceoffPercentage: null
          }
        ]),
        career: JSON.stringify({
          start: new Date("1985-10-10").toISOString(),
          end: new Date("2003-04-22").toISOString()
        })
      }

      {
        id: 7,
        firstName: "testy",
        lastName: "mctestface",
        position: "Left Wing",
        birthDate: new Date("1989-09-13").toISOString(),
        birthplace: "johnson, TN",
        photoUrl: "https://pixabay.com/get/gf2c1b9b33f94f7c94879fde36ca1fb1d79ef45c14f14bdbf5323e40f7d17ab85df22dbe95252066e5e6dd95aebc9ac9ea8c2d2c2e8eb1d8a307ff15ff1ff91e8_1280.jpg",
        jerseyNumber: 65,
        inductionYear: new Date("2025-12-14").toISOString(),
        description: "THIS IS A TEST.\n\nthis isn the first true test.\n\nTESTSTS",
        gamesPlayed: 123,
        goals: 452,
        assists: 345,
        points: 795,
        plusMinus: 43,
        penaltyMinutes: 400,
        timeOnIce: "20:55",
        shotsOnGoal: 4064,
        shootingPercentage: 13.5,
        faceoffPercentage: 23,
        hits: 5332,
        blocks: 512,
        achievements: [
          "Stanley Cup Champion (2018)",
          "3× Hart Memorial Trophy (2008, 2009, 2013)",
          "9× Maurice Richard Trophy (2008-2010, 2013-2016, 2018, 2020)",
          "Art Ross Trophy (2008)",
          "Calder Memorial Trophy (2006)",
          "Conn Smythe Trophy (2018)",
          "Ted Lindsay Award (2010)"
        ],
        seasons: JSON.stringify([
          {
            season: "2005-06",
            team: "WSH",
            type: "regular",
            gamesPlayed: 81,
            goals: 52,
            assists: 54,
            points: 106,
            plusMinus: 2,
            penaltyMinutes: 52,
            timeOnIce: "20:37",
            shotsOnGoal: 425,
            shootingPercentage: 12.2,
            faceoffPercentage: null
          },
          {
            season: "2007-08",
            team: "WSH",
            type: "regular",
            gamesPlayed: 82,
            goals: 65,
            assists: 47,
            points: 112,
            plusMinus: 28,
            penaltyMinutes: 40,
            timeOnIce: "23:06",
            shotsOnGoal: 446,
            shootingPercentage: 14.6,
            faceoffPercentage: null
          },
          {
            season: "2017-18",
            team: "WSH",
            type: "regular",
            gamesPlayed: 82,
            goals: 49,
            assists: 38,
            points: 87,
            plusMinus: 3,
            penaltyMinutes: 32,
            timeOnIce: "20:09",
            shotsOnGoal: 355,
            shootingPercentage: 13.8,
            faceoffPercentage: null
          },
          {
            season: "2017-18",
            team: "WSH",
            type: "playoff",
            gamesPlayed: 24,
            goals: 15,
            assists: 12,
            points: 27,
            plusMinus: 8,
            penaltyMinutes: 14,
            timeOnIce: "20:44",
            shotsOnGoal: 68,
            shootingPercentage: 22.1,
            faceoffPercentage: null
          },
          {
            season: "2014",
            team: "RUS",
            type: "international",
            gamesPlayed: 5,
            goals: 4,
            assists: 2,
            points: 6,
            plusMinus: -1,
            penaltyMinutes: 2,
            timeOnIce: "21:12",
            shotsOnGoal: 22,
            shootingPercentage: 18.2,
            faceoffPercentage: null
          }
        ]),
        career: JSON.stringify({
          start: new Date("2005-10-05").toISOString(),
          end: null
        })
      },
    ];

    players.forEach(player => {
      this.playerData.set(player.id, {
        ...player,
        seasons: JSON.parse(player.seasons as unknown as string) as Season[],
        career: JSON.parse(player.career as unknown as string) as Career
      } as Player);
    });
  }
}

export const storage = new MemStorage();
