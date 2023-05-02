import React, { useEffect, useState } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import HeatmapPagination from "../components/HeatmapPagination";
import { HeatMapDatum, HeatMapSerie } from "../types/custom-types";
import { fetchData } from "../api/fetchData";

const transformData = (data: any[]): HeatMapSerie[] => {
  // This need to go to the custom types
  const geneData: { [key: string]: HeatMapDatum[] } = {};
  const maxPhenotypeCounts: { [key: string]: number } = {};

  data.forEach((entry) => {
    const geneSymbol = entry.marker_symbol;
    const topLevelPhenotypeTerm =
      entry.top_level_phenotype_term.top_level_mp_term_name;
    const phenotypeCount = entry.phenotype_count;
    const mgiIdentifier = entry.marker_accession_id;
    const procedures = entry.procedures.join(", ");
    const phenotypeTerms = entry.phenotype_terms
      .map(
        (term: { mp_term_name: any; mp_term_id: any }) =>
          `${term.mp_term_name} (${term.mp_term_id})`
      )
      .join(", ");

    if (!geneData[geneSymbol]) {
      geneData[geneSymbol] = [];
    }

    geneData[geneSymbol].push({
      x: topLevelPhenotypeTerm,
      y: parseInt(geneSymbol),
      value: phenotypeCount,
      mgiIdentifier,
      procedures,
      phenotypeTerms,
    });

    if (
      !maxPhenotypeCounts[geneSymbol] ||
      phenotypeCount > maxPhenotypeCounts[geneSymbol]
    ) {
      maxPhenotypeCounts[geneSymbol] = phenotypeCount;
    }
  });

  return Object.keys(geneData).map((geneSymbol) => ({
    id: geneSymbol,
    data: geneData[geneSymbol].sort((a, b) => b.value - a.value),
    maxPhenotypeCount: maxPhenotypeCounts[geneSymbol],
  }));
};

const HeatmapTest: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<HeatMapSerie[]>([]);
  console.log("heatmap data", heatmapData);
  const [rawData, setRawData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [topPercentage, setTopPercentage] = useState(100);
  const genesPerPage = 5;

  useEffect(() => {
    fetchData().then((data) => {
      setRawData(data);
    });
  }, []);

  useEffect(() => {
    const filteredData = searchTerm
      ? rawData.filter((item: any) =>
          item.marker_symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : rawData;
    const topDataCount = Math.floor(
      (topPercentage / 100) * filteredData.length
    );
    const topData = filteredData
      .sort((a: any, b: any) => b.phenotype_count - a.phenotype_count)
      .slice(0, topDataCount);
    const transformedData = transformData(topData);
    setHeatmapData(transformedData);
    setCurrentPage(0);
  }, [searchTerm, topPercentage, rawData]);

  const totalPages = Math.ceil(heatmapData.length / genesPerPage);

  const paginatedData = heatmapData.slice(
    currentPage * genesPerPage,
    currentPage * genesPerPage + genesPerPage
  );

  return (
    <div className="container">
      <div className="header">
        <h1>IMPC Gene-Phenotype Associations Heatmap</h1>
        <p>
          Compare the knockout effect of a list of genes among different
          phenotyping systems.
        </p>
      </div>
      <div>
        <label htmlFor="search">Search by gene symbol or phenotype term:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="topPercentage">
          Filter top {topPercentage} % of the genes that have the highest
          phenotype count
        </label>
        <input
          type="range"
          id="percentage-filter-input"
          className="form-range me-2 m-2"
          min="1"
          max="100"
          step="1"
          value={topPercentage}
          onChange={(e) => setTopPercentage(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="heatmap-container">
        {heatmapData.length > 0 ? (
          <div style={{ height: "700px" }}>
            <ResponsiveHeatMap
              data={paginatedData}
              margin={{ top: 100, right: 90, bottom: 60, left: 90 }}
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
                legendOffset: -95,
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
              labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
              emptyColor="#555555"
              borderColor={{ theme: "grid.line.stroke" }}
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

export default HeatmapTest;
