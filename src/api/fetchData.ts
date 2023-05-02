export const fetchData = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/mpi2/EBI02126-web-developer/main/gene_phenotypes.json"
  );
  const data = await response.json();
  return data;
};
