
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./context/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import dataset_img from "./../assets/Electric-car.svg";
import { ChevronDown, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const Datasets = () => {
  const { data1, fetchMoreData, loading } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data1);

  useEffect(() => {
    setFilteredData(
      data1.filter((data) =>
        Object.values(data).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  }, [data1, searchQuery]);

  const tableContainerRef = useRef(null);

  const handleScroll = () => {
    if (!tableContainerRef.current || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
    const threshold = 50;
    if (scrollHeight - (scrollTop + clientHeight) < threshold) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [loading]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "src/assets/Electric_Vehicle_Population_Data.csv"; 
    link.setAttribute("download", "Electric_Vehicle_Population_Data.csv"); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-20">
      <div className="px-[5vw] flex justify-between w-full flex-col lg:flex-row">
        <div className="flex flex-col justify-center order-2 space-y-2 lg:order-1 md:w-[400px] lg:w-full w-[350px]">
          <h1 className="text-5xl font-bold">Electric Vehicle Population</h1>
          <p>My dataset is about vehicle electric development worldwide.</p>
          <p>
            BEV sales during Q2 2023 grew over 50% YoY. One in every 10 cars
            sold during Q2 2023 was a pure battery electric vehicle (BEV). China
            remained the leader in global BEV sales, followed by the USA and
            Germany. BEV sales in the USA grew by almost 57% YoY, the highest
            among the top 3 EV markets.
          </p>
          <span className="flex items-center gap-3 text-2xl font-bold">
            Electric_Vehicle_Population_Data.csv
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Download onClick={handleDownload} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
        <img
          src={dataset_img}
          alt="Electric Car"
          className="order-1 lg:w-80 lg:order-2 md:w-[400px] w-[350px]"
        />
      </div>
      <div className="px-[5vw] mt-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 mb-4 text-black border rounded bg-green-50 w-96 focus:outline-none"
        />
      </div>
      <div className="relative mt-2 max-h-[500px] overflow-y-auto">
        <div className="sticky top-0 z-20 overflow-x-auto bg-white dark:bg-gray-800">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">VIN</TableHead>
                <TableHead className="w-24">
                  <span className="flex items-center gap-2">
                    County <ChevronDown className="w-4 h-4 mt-1" />
                  </span>
                </TableHead>
                <TableHead className="w-24">City</TableHead>
                <TableHead className="w-24">State</TableHead>
                <TableHead className="w-24">Postal Code</TableHead>
                <TableHead className="w-24">Make</TableHead>
                <TableHead className="w-24">Model</TableHead>
                <TableHead className="w-24">Model Year</TableHead>
                <TableHead className="w-24">Electric Range</TableHead>
                <TableHead className="w-32">Electric Vehicle Type</TableHead>
                <TableHead className="w-48">CAFV Eligibility</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        <div
          ref={tableContainerRef}
          className="overflow-y-auto max-h-[400px] overflow-x-auto"
        >
          <Table className="min-w-full">
            <TableBody>
              {filteredData.map((car, index) => (
                <TableRow
                  key={`${car["VIN (1-10)"]}-${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <TableCell className="w-24">{car["VIN (1-10)"]}</TableCell>
                  <TableCell className="w-24">{car.County}</TableCell>
                  <TableCell className="w-24">{car.City}</TableCell>
                  <TableCell className="w-24">{car.State}</TableCell>
                  <TableCell className="w-24">{car["Postal Code"]}</TableCell>
                  <TableCell className="w-24">{car.Make}</TableCell>
                  <TableCell className="w-24">{car.Model}</TableCell>
                  <TableCell className="w-24">{car["Model Year"]}</TableCell>
                  <TableCell className="w-24">
                    {car["Electric Range"]}
                  </TableCell>
                  <TableCell className="w-32">
                    {car["Electric Vehicle Type"]}
                  </TableCell>
                  <TableCell className="w-48">
                    {car["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && (
            <div className="sticky bottom-0 w-full p-4 text-center bg-white border-t dark:bg-gray-800">
              Loading more data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Datasets;
