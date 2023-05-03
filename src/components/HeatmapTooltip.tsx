import { HeatmapGeneData } from "../types/custom-types";

const HeatmapTooltip: React.FC<{
  data: HeatmapGeneData;
  id: string;
}> = ({ data, id }) => {
  const tooltipItems = [
    { label: "Gene", value: id },
    { label: "Top-Level Phenotype Term", value: data.x },
    { label: "Phenotype Term", value: data.y },
    { label: "Click cell to see more info!" },
  ];

  return (
    <div className="bg-white bg-opacity-75 rounded-3 shadow py-3 px-4 border position-sticky top-0 start-0 end-0">
      {tooltipItems.map((item) => (
        <div key={`${item.label}-${item.value}`} className="tooltip-row">
          <strong>{item.label}:</strong>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default HeatmapTooltip;
