/** @format */

import { useContext } from "react";
import { Label, Pie, PieChart } from "recharts";
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

const BEVvsPHEV = () => {
  const { bevCount, phevCount } = useContext(AppContext);

  const chartData = [
    { ElectricVehicleType: "bev", no: bevCount, fill: "var(--color-chrome)" },
    { ElectricVehicleType: "phev", no: phevCount, fill: "var(--color-safari)" },
  ];
  const chartConfig = {
    visitors: {
      label: "ElectricVehicleType",
    },
    chrome: {
      label: "Chrome",
      color: "#388E3C",
    },
    safari: {
      label: "Safari",
      color: "#1B5E20",
    },
  };

  const EVtype = bevCount + phevCount;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>BEV vs PHEV</CardTitle>
        <CardDescription>1998 - 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="no"
              nameKey="ElectricVehicleType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold fill-foreground"
                        >
                          {EVtype.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          EV Type
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default BEVvsPHEV;
