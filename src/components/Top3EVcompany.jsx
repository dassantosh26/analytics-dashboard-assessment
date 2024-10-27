/** @format */

import { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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
import { AppContext } from "./context/AppContext";

export const description = "A bar chart with a custom label";

const Top3EVcompany = () => {
  const { top3Makes } = useContext(AppContext);

  const chartData = top3Makes.map((item, index) => ({
    key: `key-${index}`,
    company: item.make,
    car: item.count,
  }));

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#15803d",
    },
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Top 3 EV car manufactured company</CardTitle>
          <CardDescription>1998-2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              width={500} 
              height={300} 
              data={chartData}
              layout="vertical"
              margin={{ right: 16 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="company"
                type="category" 
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="car" fill="var(--color-desktop)" radius={4}>
                <LabelList
                  dataKey="company"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="car"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
      </Card>
    </div>
  );
};

export default Top3EVcompany;
