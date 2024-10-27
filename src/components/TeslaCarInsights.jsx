import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

const TeslaCarInsights = () => {
  const { teslaInsights } = useContext(AppContext);

  const chartData = [
    { model: "MODEL 3", count: teslaInsights?.modelCounts["MODEL 3"] },
    { model: "MODEL S", count: teslaInsights?.modelCounts["MODEL S"] },
    { model: "MODEL X", count: teslaInsights?.modelCounts["MODEL X"] },
    { model: "MODEL Y", count: teslaInsights?.modelCounts["MODEL Y"] },
    { model: "ROADSTER", count: teslaInsights?.modelCounts["ROADSTER"] }
  ];
   
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#15803d",
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tesla Car Insights</CardTitle>
        <CardDescription>1998 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="model"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">  
      </CardFooter>
    </Card>
  );
};

export default TeslaCarInsights;
