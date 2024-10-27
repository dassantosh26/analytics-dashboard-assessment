import  { useContext } from "react";
import { Card } from "./ui/card";
import logo from "./../assets/tesla-logo-tesla-icon-transparent-png-free-vector.jpg";
import { AppContext } from "./context/AppContext";

const TeslaInsights = () => {
  const { teslaInsights } = useContext(AppContext);

  return (
    <Card className="p-3">
      <h1 className="text-center">Top EV Companies Insights</h1>
      <div className="flex items-center justify-between">
        <p className="text-3xl text-bold">Tesla</p>
        <img src={logo} alt="" className="w-20 rounded-full" />
      </div>
      <div className="space-y-2">
        <p>Total car manufactured : {teslaInsights?.totalTeslas}</p>
        <p>Tesla Top Models: MODEL Y - 10389</p>
        <p>
        County with the most Tesla cars: {teslaInsights.topCounty.county} with count: {teslaInsights.topCounty.count}</p>
        <p>Total BEVs and PHEVs: BEV - {teslaInsights.bevPhevCounts.BEV}, PHEV - {teslaInsights.bevPhevCounts.PHEV}</p>
        <p>Tesla CAFV EV cars - {teslaInsights.cafvCounts.CAFV}</p>
        <p>Tesla non-CAFV EV cars - {teslaInsights.cafvCounts.NonCAFV}</p>
      </div>
    </Card>
  );
};

export default TeslaInsights;
