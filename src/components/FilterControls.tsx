import { useMemo } from "react";
import Select, { ActionMeta } from "react-select";

import { FilterControlsProps } from "../types/custom-types";

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedGene,
  setSelectedGene,
  selectedTerm,
  setSelectedTerm,
  selectedPercentage,
  setSelectedPercentage,
  selectedFilter,
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
    onFiltersChanged();
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
    onFiltersChanged();
  };

  // Handle percentage filter input changes
  const handleFilterByPercentage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filterValue = parseInt(event.target.value);
    setSelectedPercentage(filterValue);
    setSelectedFilter("percentage");
    onFiltersChanged();
  };

  const resetFilters = () => {
    setSelectedGene([]);
    setSelectedTerm([]);
    setSelectedPercentage(10);
    setSelectedFilter(undefined);
    onFiltersChanged();
  };

  const termOptions = useMemo(
    () =>
      data?.tlp_terms?.map((term) => ({
        value: term.top_level_mp_term_id,
        label: term.top_level_mp_term_name,
      })) ?? [],
    [data]
  );

  const geneOptions = useMemo(
    () =>
      data?.genes?.map((gene) => ({
        value: gene.marker_accession_id,
        label: gene.id,
      })) ?? [],
    [data]
  );

  return (
    <div className="filter-controls row">
      <div className="col-md-4">
        <Select
          id="gene-filter-input"
          className="m-2"
          options={geneOptions}
          value={selectedGene.map((gene) => ({
            value: gene,
            label:
              geneOptions?.find((option) => option.value === gene)?.label || "",
          }))}
          onChange={handleFilterByGene}
          isMulti
          isDisabled={selectedFilter && selectedFilter !== "gene"}
          placeholder="Choose a list of genes..."
        />
      </div>
      <div className="col-md-4">
        <Select
          id="term-filter-select"
          className="m-2"
          options={termOptions}
          value={selectedTerm.map((term) => ({
            value: term,
            label:
              termOptions?.find((option) => option.value === term)?.label || "",
          }))}
          isMulti
          onChange={handleFilterByTerm}
          isDisabled={selectedFilter && selectedFilter !== "term"}
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
            disabled={selectedFilter && selectedFilter !== "percentage"}
          />
        </div>
      </div>
      <div className="col-md-4">
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
