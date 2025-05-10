import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { FaSearch, FaFilter, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Player } from "@shared/schema";

const Inductees = () => {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("all");
  const [era, setEra] = useState("all");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Player | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const { data: players, isLoading } = useQuery<Player[]>({
    queryKey: ['/api/players'],
  });

  const itemsPerPage = 10;

  const handleSort = (field: keyof Player) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredPlayers = useMemo(() => {
    if (!players) return [];

    let result = [...players];

    // Apply search filter
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        player => 
          player.firstName.toLowerCase().includes(lowerSearch) ||
          player.lastName.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply position filter
    if (position !== "all") {
      result = result.filter(player => player.position === position);
    }

    // Apply era filter
    if (era !== "all") {
      const decade = parseInt(era);
      result = result.filter(player => {
        const startYear = new Date(player.career.start).getFullYear();
        return startYear >= decade && startYear < decade + 10;
      });
    }

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [players, search, position, era, sortField, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);
  const paginatedPlayers = filteredPlayers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Generate table columns
  const columns = [
    {
      header: "Player",
      accessorKey: "lastName",
      cell: ({ row }: { row: { original: Player } }) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            <img 
              src={row.original.photoUrl} 
              alt={`${row.original.firstName} ${row.original.lastName}`} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.original.firstName} {row.original.lastName}
            </div>
            <div className="text-xs text-gray-500">{row.original.position}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: "GP",
      accessorKey: "gamesPlayed",
      sortable: true,
    },
    {
      header: "G",
      accessorKey: "goals",
      sortable: true,
    },
    {
      header: "A",
      accessorKey: "assists",
      sortable: true,
    },
    {
      header: "PTS",
      accessorKey: "points",
      sortable: true,
    },
    {
      header: "+/-",
      accessorKey: "plusMinus",
      sortable: true,
    },
    {
      header: "PIM",
      accessorKey: "penaltyMinutes",
      sortable: true,
    },
    {
      header: "TOI",
      accessorKey: "timeOnIce",
      sortable: true,
    },
    {
      header: "SOG",
      accessorKey: "shotsOnGoal",
      sortable: true,
    },
    {
      header: "S%",
      accessorKey: "shootingPercentage",
      cell: ({ row }: { row: { original: Player } }) => (
        <span>{row.original.shootingPercentage}%</span>
      ),
      sortable: true,
    },
    {
      header: "FO%",
      accessorKey: "faceoffPercentage",
      cell: ({ row }: { row: { original: Player } }) => (
        <span>{row.original.faceoffPercentage ? `${row.original.faceoffPercentage}%` : "N/A"}</span>
      ),
      sortable: true,
    },
    {
      header: "Hits",
      accessorKey: "hits",
      sortable: true,
    },
    {
      header: "Blocks",
      accessorKey: "blocks",
      sortable: true,
    }
  ];

  const SortIcon = ({ field }: { field: keyof Player }) => {
    if (sortField !== field) return <FaSort className="ml-1" />;
    return sortDirection === "asc" ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-6">All Inductees</h2>
        
        {/* Search and Filter Tools */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative md:w-1/3">
                <Input
                  type="text"
                  placeholder="Search players..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaSearch />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="All Positions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="Forward">Forward</SelectItem>
                    <SelectItem value="Defense">Defense</SelectItem>
                    <SelectItem value="Goalie">Goalie</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={era} onValueChange={setEra}>
                  <SelectTrigger className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="All Eras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Eras</SelectItem>
                    <SelectItem value="1950">1950s</SelectItem>
                    <SelectItem value="1960">1960s</SelectItem>
                    <SelectItem value="1970">1970s</SelectItem>
                    <SelectItem value="1980">1980s</SelectItem>
                    <SelectItem value="1990">1990s</SelectItem>
                    <SelectItem value="2000">2000s</SelectItem>
                    <SelectItem value="2010">2010s</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition">
                  <FaFilter className="mr-2" />Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Sortable Table */}
        <Card className="mb-8 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center">Loading player data...</div>
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((column, index) => (
                        <th 
                          key={index}
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                          onClick={() => column.sortable && handleSort(column.accessorKey as keyof Player)}
                        >
                          <div className="flex items-center">
                            {column.header}
                            {column.sortable && <SortIcon field={column.accessorKey as keyof Player} />}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedPlayers.map(player => (
                      <tr 
                        key={player.id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => window.location.href = `/player/${player.id}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                              <img 
                                src={player.photoUrl} 
                                alt={`${player.firstName} ${player.lastName}`} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {player.firstName} {player.lastName}
                              </div>
                              <div className="text-xs text-gray-500">{player.position}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.gamesPlayed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.goals}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.assists}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.points}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.plusMinus > 0 ? `+${player.plusMinus}` : player.plusMinus}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.penaltyMinutes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.timeOnIce}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.shotsOnGoal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.shootingPercentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.faceoffPercentage ? `${player.faceoffPercentage}%` : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.hits || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.blocks || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          
          {/* Pagination */}
          {!isLoading && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(page * itemsPerPage, filteredPlayers.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredPlayers.length}</span> inductees
                  </p>
                </div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default Inductees;
