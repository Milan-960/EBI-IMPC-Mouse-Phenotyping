import {
  PhenotypingData,
  TransformedData,
  HeatmapGene,
  TopLevelPhenotype,
} from "../types/custom-types";

// Helper function to find the index of a gene in the genes array based on its marker_symbol
const findGeneIndex = (genes: HeatmapGene[], marker_symbol: string) =>
  genes.findIndex(({ id }) => id === marker_symbol);

// Helper function to find the index of a top level phenotype term in the tlp_terms array based on its top_level_mp_term_id
const findTlpIndex = (
  tlp_terms: TopLevelPhenotype[],
  top_level_mp_term_id: string
) =>
  tlp_terms.findIndex(
    ({ top_level_mp_term_id: id }) => id === top_level_mp_term_id
  );

export const transformData = (data: PhenotypingData[]): TransformedData => {
  const genes: HeatmapGene[] = [];
  const tlp_terms: TopLevelPhenotype[] = [];

  // Iterate through each phenotyping data item
  for (const phen of data) {
    // Check if the gene is already present in the genes array, if not add it
    let gene_index = findGeneIndex(genes, phen.marker_symbol);
    if (gene_index === -1) {
      gene_index = genes.length;
      genes.push({
        id: phen.marker_symbol,
        marker_accession_id: phen.marker_accession_id,
        total_pTerm_count: 0,
        data: [],
      });
    }

    // Check if the top level phenotype term is already present in the tlp_terms array, if not add it
    let tlpIndex = findTlpIndex(
      tlp_terms,
      phen.top_level_phenotype_term.top_level_mp_term_id
    );
    if (tlpIndex === -1) {
      tlpIndex = tlp_terms.length;
      tlp_terms.push(phen.top_level_phenotype_term);
    }

    // Add phenotype count data to the corresponding gene's data array
    genes[gene_index].data[tlpIndex] = {
      x: phen.top_level_phenotype_term.top_level_mp_term_name,
      y: phen.phenotype_count,

      index: gene_index,
      tlp_term_id: phen.top_level_phenotype_term.top_level_mp_term_id,
      p_terms: phen.phenotype_terms,
      procedures: phen.procedures,
    };
  }

  const ranked_genes: number[] = [];
  // Iterate through each gene and fill in missing data with null values
  genes.forEach((gene, i) => {
    for (let j = 0; j < tlp_terms.length; j++) {
      if (gene.data[j] === undefined) {
        gene.data[j] = {
          x: tlp_terms[j].top_level_mp_term_name,
          y: null,

          index: i,
          tlp_term_id: tlp_terms[j].top_level_mp_term_id,
        };
      } else {
        gene.total_pTerm_count += gene.data[j].y ?? 0;
      }
    }
    // Sort gene data by top level phenotype term name
    gene.data.sort(({ x }, { x: y }) => x.localeCompare(y, "en-US"));
    ranked_genes[i] = i;
  });

  // Sort genes alphabetically by gene ID
  genes.sort(({ id: a }, { id: b }) => a.localeCompare(b, "en-US"));
  // Sort ranked_genes by total phenotype count
  ranked_genes.sort(
    (a, b) => genes[b].total_pTerm_count - genes[a].total_pTerm_count
  );

  // Sort tlp_terms alphabetically by top level phenotype term name
  tlp_terms.sort(
    ({ top_level_mp_term_name: a }, { top_level_mp_term_name: b }) =>
      a.localeCompare(b, "en-US")
  );

  // Iterate through each top level phenotype term and assign its index
  // This is done after sorting to ensure the index reflects the sorted order
  (tlp_terms as TransformedData["tlp_terms"]).forEach((value, index) => {
    value.index = index;
  });

  return {
    genes,
    tlp_terms: tlp_terms as TransformedData["tlp_terms"],
    ranked_genes,
  };
};
