export type HeatMapDatum = {
  x: string;
  y: number;
  value: number;
  mgiIdentifier: string;
  procedures: string;
  phenotypeTerms: string;
};

export type HeatMapSerie = {
  id: string;
  data: HeatMapDatum[];
};
