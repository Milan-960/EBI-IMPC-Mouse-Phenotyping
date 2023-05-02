export type PhenotypingData = {
  marker_accession_id: string;
  marker_symbol: string;
  top_level_phenotype_term: TopLevelPhenotype;
  phenotype_terms: Phenotype[];
  phenotype_count: number;
  procedures: string[];
};

export type TopLevelPhenotype = {
  top_level_mp_term_id: string;
  top_level_mp_term_name: string;
};

export type Phenotype = {
  mp_term_id: string;
  mp_term_name: string;
};

export type HeatmapGene = {
  id: string;
  marker_accession_id: string;
  total_pTerm_count: number;
  data: HeatmapGeneData[];
};

export type HeatmapGeneData = {
  x: string; // tlpTerm_name
  y: number | null; // phenotype_count

  // Extra Data
  index: number;
  tlp_term_id: string;
  p_terms?: Phenotype[];
  procedures?: string[];
};

export type TransformedData = {
  genes: HeatmapGene[];
  tlp_terms: ({
    index: number;
  } & TopLevelPhenotype)[];
  ranked_genes: number[];
};

// FilterControlsProps interface defines the props for the FilterControls component
export interface FilterControlsProps {
  selectedGene: string[];
  setSelectedGene: (genes: string[]) => void;
  selectedTerm: string[];
  setSelectedTerm: (terms: string[]) => void;
  selectedPercentage: number;
  setSelectedPercentage: (percentage: number) => void;
  setSelectedFilter: (filter: "gene" | "term" | "percentage") => void;
  data: TransformedData | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onFiltersChanged: () => void;
}
