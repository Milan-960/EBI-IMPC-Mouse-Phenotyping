import { useEffect } from "react";
import Select, { ActionMeta } from "react-select";

import { FilterControlsProps } from "../types/custom-types";

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedGene,
  setSelectedGene,
  selectedTerm,
  setSelectedTerm,
  selectedPercentage,
  setSelectedPercentage,
  setSelectedFilter,
  data,
  onFiltersChanged,
}) => {
  // Handle gene filter input changes

  const handleFilterByGene = (
    selectedOptions: any,
    _actionMeta: ActionMeta<any>
  ) => {
    const genes = selectedOptions.map(
      (option: { value: string }) => option.value
    );
    setSelectedGene(genes);
    setSelectedFilter("gene");
  };

  // Handle term filter select changes using ReactSelect
  const handleFilterByTerm = (
    selectedOptions: any,
    _actionMeta: ActionMeta<any>
  ) => {
    const topTerms = selectedOptions.map(
      (option: { value: string; label: string }) => option.value
    );
    setSelectedTerm(topTerms);
    setSelectedFilter("term");
  };

  // Handle percentage filter input changes
  const handleFilterByPercentage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filterValue = parseInt(event.target.value);
    setSelectedPercentage(filterValue);
    setSelectedFilter("percentage");
  };

  const termOptions =
    data?.tlp_terms?.map((term) => ({
      value: term.top_level_mp_term_id,
      label: term.top_level_mp_term_name,
    })) ?? [];

  const geneOptions = data?.genes?.map((gene) => ({
    value: gene.marker_accession_id,
    label: gene.id,
  }));

  // Trigger onFiltersChanged when any filter value is changed
  useEffect(() => {
    onFiltersChanged();
  }, [selectedGene, selectedTerm, selectedPercentage, onFiltersChanged]);

  return (
    data && (
      <div className="filter-controls row">
        <div className="col-md-4">
          <label htmlFor="gene-filter-input">Filter by gene list:</label>
          <Select
            id="gene-filter-input"
            className="m-2"
            options={geneOptions}
            value={selectedGene.map((gene) => ({
              value: gene,
              label:
                geneOptions?.find((option) => option.value === gene)?.label ||
                "",
            }))}
            onChange={handleFilterByGene}
            isMulti
            placeholder="Choose a list of genes..."
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="term-filter-select">
            Filter by top-level phenotype term:
          </label>
          <Select
            id="term-filter-select"
            className="m-2"
            options={termOptions}
            value={selectedTerm.map((term) => ({
              value: term,
              label:
                termOptions?.find((option) => option.value === term)?.label ||
                "",
            }))}
            isMulti
            onChange={handleFilterByTerm}
            placeholder="Choose top-level phenotype..."
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="percentage-filter-input">
            Filter top {selectedPercentage} % of the genes that have the highest
            phenotype count
          </label>
          <div className="d-flex align-items-center">
            <input
              type="range"
              id="percentage-filter-input"
              className="form-range me-2 m-2"
              min="1"
              max="100"
              step="1"
              value={selectedPercentage}
              onChange={handleFilterByPercentage}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default FilterControls;