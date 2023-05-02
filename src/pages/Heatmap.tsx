import React, { useCallback, useEffect, useState } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";

import HeatmapPagination from "../components/HeatmapPagination";
import { HeatmapGene, TransformedData } from "../types/custom-types";
import { fetchData } from "../api/fetchData";
import { transformData } from "../utils/transformData";
import FilterControls from "../components/FilterControls";

const Heatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<TransformedData | null>(null);
  console.log("heatmapData data", heatmapData);
  const [rawData, setRawData] = useState<any[]>([]);
  console.log("rawData data", rawData);

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<
    "gene" | "term" | "percentage"
  >();
  const [filteredHeatmapData, setFilteredHeatmapData] =
    useState<TransformedData | null>(heatmapData);
  console.log("filteredHeatmapData data", filteredHeatmapData);

  const [selectedGene, setSelectedGene] = useState<string[]>([]);
  console.log("selectedGene", selectedGene);
  const [selectedPercentage, setSelectedPercentage] = useState<number>(100);
  const genesPerPage = 25;

  // Apply filters
  const applyFilters = useCallback(() => {
    if (!heatmapData) return;

    let filteredData: HeatmapGene[] = heatmapData.genes;

    // When no filter is applied, set filteredHeatmapData to heatmapData
    if (
      selectedGene.length === 0 &&
      selectedTerm.length === 0 &&
      selectedFilter !== "percentage"
    ) {
      setFilteredHeatmapData(heatmapData);
      return;
    }

    filteredData = filteredData
      .filter((gene) =>
        selectedGene.length === 0
          ? true
          : selectedGene.includes(gene.marker_accession_id)
      )
      .map((gene) => {
        if (selectedTerm.length === 0) {
          return gene;
        }
        return {
          ...gene,
          data: gene.data.filter((d) => selectedTerm.includes(d.tlp_term_id)),
        };
      })
      .filter((gene) => gene.data.length > 0);

    // Filter based on the top percentage of genes with the highest count of phenotype associations
    if (selectedFilter === "percentage") {
      const topN = Math.ceil(
        (selectedPercentage / 100) * (heatmapData?.genes.length ?? 0)
      );
      filteredData = filteredData
        .sort((a, b) => b.total_pTerm_count - a.total_pTerm_count)
        .slice(0, topN);
    }

    setFilteredHeatmapData({
      ...heatmapData,
      genes: filteredData,
    });
  }, [
    heatmapData,
    selectedGene,
    selectedTerm,
    selectedFilter,
    selectedPercentage,
  ]);

  useEffect(() => {
    fetchData().then((data) => {
      setRawData(data);
    });
  }, []);

  useEffect(() => {
    const transformedData = transformData(rawData);
    setHeatmapData(transformedData);
    setCurrentPage(0);
  }, [rawData]);

  const totalPages = Math.ceil((heatmapData?.genes.length ?? 0) / genesPerPage);

  const paginatedData =
    filteredHeatmapData?.genes.slice(
      currentPage * genesPerPage,
      currentPage * genesPerPage + genesPerPage
    ) ?? [];

  return (
    <div className="container">
      <div className="header">
        <h1>IMPC Gene-Phenotype Associations Heatmap</h1>
        <p>
          Compare the knockout effect of a list of genes among different
          phenotyping systems.
        </p>
      </div>

      <FilterControls
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
        data={heatmapData}
        selectedPercentage={selectedPercentage}
        setSelectedPercentage={setSelectedPercentage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onFiltersChanged={applyFilters}
        selectedGene={selectedGene}
        setSelectedGene={setSelectedGene}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="heatmap-container">
        {paginatedData.length > 0 ? (
          <div style={{ height: "800px" }}>
            <ResponsiveHeatMap
              data={paginatedData}
              margin={{ top: 120, right: 90, bottom: 60, left: 90 }}
              valueFormat=">-.2s"
              xOuterPadding={0.1}
              xInnerPadding={0.1}
              yOuterPadding={0.1}
              yInnerPadding={0.1}
              enableGridX={true}
              enableGridY={true}
              axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -28,
                legend: "Top-Level Phenotype",
                legendOffset: -110,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Gene Symbol",
                legendPosition: "middle",
                legendOffset: -72,
              }}
              cellComponent="rect"
              axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Gene Symbol",
                legendPosition: "middle",
                legendOffset: 70,
              }}
              colors={{
                type: "quantize",
                steps: 4,
                colors: ["#88dbd9", "#29bcd0", "#009fca", "#0076b6"],
              }}
              emptyColor="#0000"
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
              annotations={[]}
            />
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      <HeatmapPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Heatmap;
