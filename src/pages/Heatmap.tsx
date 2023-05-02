import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";

type HeatMapDatum = {
  x: string;
  y: number;
  value: number;
};

type HeatMapSerie = {
  id: string;
  data: HeatMapDatum[];
};

// Replace this with your actual data
const heatmapData: HeatMapSerie[] = [
  {
    id: "Gene1",
    data: [
      { x: "Phenotype A", y: 1, value: 10 },
      { x: "Phenotype B", y: 2, value: 20 },
      { x: "Phenotype C", y: 3, value: 30 },
    ],
  },
  {
    id: "Gene2",
    data: [
      { x: "Phenotype A", y: 1, value: 40 },
      { x: "Phenotype B", y: 2, value: 50 },
      { x: "Phenotype C", y: 3, value: 60 },
    ],
  },
];

const HeatmapTest: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>IMPC Gene-Phenotype Associations Heatmap</h1>
        <p>
          Compare the knockout effect of a list of genes among different
          phenotyping systems.
        </p>
      </div>

      <div className="heatmap-container">
        <div style={{ height: "600px" }}>
          <ResponsiveHeatMap
            data={heatmapData}
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            valueFormat=">-.2s"
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
            }}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Phenotype",
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Gene",
              legendPosition: "middle",
              legendOffset: -60,
            }}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
            emptyColor="#555555"
            legends={[
              {
                anchor: "bottom",
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
                direction: "row",
                tickPosition: "after",
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: ">-.2s",
                title: "Value →",
                titleAlign: "start",
                titleOffset: 4,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default HeatmapTest;
