/** @format */

import { createContext, useEffect, useState } from "react";
import Papa from "papaparse";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode")
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 30;

  //function for darkmode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  //fetching data from csv file
  useEffect(() => {
    fetch("src/assets/Electric_Vehicle_Population_Data.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          complete: (result) => {
            setData(result.data);
          },
          header: true,
        });
      });
  }, []);
  useEffect(() => {
    fetchInitialData();
  }, []);
  const fetchInitialData = () => {
    setLoading(true);
    fetch("src/assets/Electric_Vehicle_Population_Data.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          complete: (result) => {
            setAllData(result.data);
            setData1(result.data.slice(0, pageSize));
            setLoading(false);
          },
          header: true,
        });
      });
  };
  const fetchMoreData = () => {
    if (allData.length > 0) {
      const start = (page + 1) * pageSize;
      const end = start + pageSize;
      const newEntries = allData.slice(start, end);

      if (newEntries.length > 0) {
        setData1((prevData) => [...prevData, ...newEntries]);
        setPage(page + 1);
      }
    }
  };
  const countCarsByYear = (data) => {
    const yearCounts = {};
    data.forEach((car) => {
      const year = car["Model Year"];
      if (year in yearCounts) {
        yearCounts[year]++;
      } else {
        yearCounts[year] = 1;
      }
    });
    return yearCounts;
  };

  const carCountsByYear = countCarsByYear(data);
  const totalEVcarsManufactured = () => {
    const sumOfCars = Object.values(carCountsByYear).reduce(
      (acc, count) => acc + count,
      0
    );

    return sumOfCars;
  };

  const totalEVcars = totalEVcarsManufactured(data);
  const carByMake = (data) => {
    const makeCounts = {};
    data.forEach((make) => {
      const makes = make["Make"];
      if (makes in makeCounts) {
        makeCounts[makes]++;
      } else {
        makeCounts[makes] = 1;
      }
    });
    return makeCounts;
  };

  const carCountsByMake = carByMake(data);
  const sortedMakes = Object.entries(carCountsByMake).sort(
    (a, b) => b[1] - a[1]
  );
  const top3Makes = sortedMakes
    .slice(0, 3)
    .map((entry) => ({ make: entry[0], count: entry[1] }));
  const totalRange = (data = []) => {
    if (!Array.isArray(data) || data.length === 0) {
      return 0;
    }
    const validElectricRanges = data
      .map((car) => parseFloat(car["Electric Range"]))
      .filter((range) => !isNaN(range));
    const totalElectricRange = validElectricRanges.reduce(
      (acc, range) => acc + range,
      0
    );
    const avgElectricRange = totalElectricRange / validElectricRanges.length;
    return avgElectricRange;
  };

  const totalEVelctricRange = totalRange(data).toFixed(2);

  const countCAFVEligibleVehicles = (data) => {
    return data.filter(
      (car) =>
        car["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] ===
        "Clean Alternative Fuel Vehicle Eligible"
    ).length;
  };

  const eligibleVehiclesCount = countCAFVEligibleVehicles(data);

  const countBEV = (data) => {
    return data.filter(
      (car) => car["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)"
    ).length;
  };
  const bevCount = countBEV(data);
  const countPHEV = (data) => {
    return data.filter(
      (car) =>
        car["Electric Vehicle Type"] ===
        "Plug-in Hybrid Electric Vehicle (PHEV)"
    ).length;
  };
  const phevCount = countPHEV(data);
  const getTeslaInsights = (data) => {
    const teslaData = data.filter((car) => car.Make === "TESLA");
    const totalTeslas = teslaData.length;
    const modelCounts = {};
    teslaData.forEach((car) => {
      const model = car.Model;
      modelCounts[model] = (modelCounts[model] || 0) + 1;
    });
    const countyCounts = {};
    teslaData.forEach((car) => {
      const county = car.County;
      countyCounts[county] = (countyCounts[county] || 0) + 1;
    });
    const topCounty = Object.entries(countyCounts).reduce(
      (acc, [county, count]) => {
        if (count > acc.count) {
          return { county, count };
        }
        return acc;
      },
      { county: null, count: 0 }
    );
    const bevPhevCounts = {
      BEV: 0,
      PHEV: 0,
    };
    teslaData.forEach((car) => {
      if (car["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)") {
        bevPhevCounts.BEV++;
      } else if (
        car["Electric Vehicle Type"] ===
        "Plug-in Hybrid Electric Vehicle (PHEV)"
      ) {
        bevPhevCounts.PHEV++;
      }
    });
    const cafvCounts = {
      CAFV: 0,
      NonCAFV: 0,
    };
    teslaData.forEach((car) => {
      if (
        car["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] ===
        "Clean Alternative Fuel Vehicle Eligible"
      ) {
        cafvCounts.CAFV++;
      } else {
        cafvCounts.NonCAFV++;
      }
    });
    return {
      totalTeslas,
      modelCounts,
      topCounty,
      bevPhevCounts,
      cafvCounts,
    };
  };
  const teslaInsights = getTeslaInsights(data);
  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        data,
        carCountsByYear,
        carCountsByMake,
        totalEVcars,
        eligibleVehiclesCount,
        totalEVelctricRange,
        top3Makes,
        fetchMoreData,
        data1,
        loading,
        bevCount,
        phevCount,
        teslaInsights,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
