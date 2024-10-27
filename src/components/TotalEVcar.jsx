/** @format */

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ChartContainer } from "../components/ui/chart";

const TotalEVcar = () => {
  const { carCountsByMake } = useContext(AppContext);
  const chartData = Object.keys(carCountsByMake).map((make) => ({
    make,
    car: carCountsByMake[make],
  }));

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#15803d",
    },
  };

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>EV Car manufactured by Company</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{ right: 16 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="make"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip
                cursor={false}
                content={({ payload }) =>
                  payload.length ? (
                    <div className="tooltip-content">
                      <p>{`Company: ${payload[0].payload.make}`}</p>
                      <p>{`Cars: ${payload[0].payload.car}`}</p>
                    </div>
                  ) : null
                }
              />
              <Line
                type="monotone"
                dataKey="car"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
      </Card>
    </div>
  );
};

export default TotalEVcar;
