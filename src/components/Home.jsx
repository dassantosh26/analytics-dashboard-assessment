/** @format */

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { BatteryCharging, Building, CarFront, Check } from "lucide-react";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import Top3EVcompany from "./Top3EVcompany";
import BEVvsPHEV from "./BEVvsPHEV";
import TeslaInsights from "./TeslaInsights";
import TeslaCarInsights from "./TeslaCarInsights";
import TotalEVcar from "./TotalEVcar";

const Home = () => {
  const {
    carCountsByYear,
    totalEVcars,
    carCountsByMake,
    totalEVelctricRange,
    eligibleVehiclesCount,
  } = useContext(AppContext);

  const chartData = Object.keys(carCountsByYear).map((year) => ({
    year,
    car: carCountsByYear[year],
  }));
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#15803d",
    },
  };
  return (
    <div className="mt-20">
      <div className="flex flex-col flex-1 w-full gap-4 p-4 md:flex-wrap lg:flex-row lg:justify-center lg:items-center md:flex-row lg:flex-nowrap lg:p-0">
        <div className="w-full lg:w-[24%] h-[110px] border bg-green-700 rounded-md p-3 flex justify-between  text-white mx-auto lg:mx-0 cursor-pointer ">
          <div className="flex flex-col justify-between ">
            <h1 className="text-sm">Total EV car manufactured</h1>
            <p className="text-5xl font-bold text-white">{totalEVcars}</p>
          </div>
          <CarFront className="w-16 h-16 p-2 text-white bg-green-800 rounded-full" />
        </div>
        <div className="w-full lg:w-[24%] h-[110px] border bg-green-700 rounded-md p-3 flex justify-between text-white cursor-pointer ">
          <div className="flex flex-col justify-between">
            <h1 className="text-sm">No Of company manufacture EV cars</h1>
            <p className="text-5xl font-bold text-white">
              {Object.keys(carCountsByMake).length}
            </p>
          </div>
          <Building className="w-16 h-16 p-2 text-white bg-green-800 rounded-full" />
        </div>
        <div className="w-full lg:w-[24%] h-[110px] border bg-green-700 rounded-md p-3 flex justify-between text-white cursor-pointer">
          <div className="flex flex-col justify-between">
            <h1 className="text-sm">Average EV Electric Range</h1>
            <p className="text-5xl font-bold text-white ">
              {totalEVelctricRange}
            </p>
          </div>
          <BatteryCharging className="w-16 h-16 p-2 text-white bg-green-800 rounded-full" />
        </div>
        <div className="w-full lg:w-[24%] h-[110px] border bg-green-700 rounded-md p-3 flex justify-between  text-white cursor-pointer">
          <div className="flex flex-col justify-between">
            <h1 className="text-sm">CAFV Eligibilty</h1>
            <p className="text-5xl font-bold text-white">
              {eligibleVehiclesCount}
            </p>
          </div>
          <Check className="w-16 h-16 p-2 text-white bg-green-800 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col flex-1 w-full gap-4 p-4 md:flex-wrap lg:flex-row md:flex-row lg:flex-wrap lg:p-0">
        <div className="lg:w-[32%] mt-5 w-full">
          <Card>
            <CardHeader>
              <CardTitle>EV Car Manufactured</CardTitle>
              <CardDescription>1998-2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="car"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>

        <div className="lg:w-[32%] mt-5 w-full">
          <TotalEVcar />
        </div>

        <div className="lg:w-[32%] mt-5 w-full">
          <Top3EVcompany />
        </div>

        <div className="lg:w-[32%] mt-5 w-full">
          <BEVvsPHEV />
        </div>

        <div className="lg:w-[32%] mt-5 w-full">
          <TeslaInsights />
        </div>

        <div className="lg:w-[32%] mt-5 w-full">
          <TeslaCarInsights />
        </div>
      </div>
    </div>
  );
};

export default Home;
