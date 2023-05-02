import { Slide, Fade } from "react-awesome-reveal";

import Embryo1 from "../assets/img/embryo_image_1.jpeg";
import Embryo2 from "../assets/img/embryo_image_2.jpg";
import Embryo3 from "../assets/img/embryo_image_3.jpeg";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Slide direction="left">
            <section>
              <h3>Introduction to IMPC Embryo Data</h3>
              <div className="section-intro">
                <p>
                  Up to one third of homozygous knockout lines are lethal, which
                  means no homozygous mice or less than expected are observed
                  past the weaning stage (IMPC{" "}
                  <a href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7">
                    Viability Primary Screen procedure.
                  </a>
                  ) Early death may occur during embryonic development or soon
                  after birth, during the pre-weaning stage. For this reason,
                  the IMPC established a{" "}
                  <a href="https://www.mousephenotype.org/impress/index">
                    systematic embryonic phenotyping pipeline
                  </a>{" "}
                  to morphologically evaluate mutant embryos to ascertain the
                  primary perturbations that cause early death and thus gain
                  insight into gene function.
                </p>
                <p>
                  As determined in IMPReSS see interactive diagram{" "}
                  <a href="https://www.mousephenotype.org/impress/index">
                    here
                  </a>
                  , all embryonic lethal lines undergo gross morphology
                  assessment at E12.5 (embryonic day 12.5) to determine whether
                  defects occur earlier or later during embryonic development. A
                  comprehensive imaging platform is then used to assess
                  dysmorphology. Embryo gross morphology, as well as 2D and 3D
                  imaging are actively being implemented by the IMPC for lethal
                  lines.
                </p>
                <p>
                  Read more in our paper on{" "}
                  <a href="https://europepmc.org/article/PMC/5295821">
                    High-throughput discovery of novel developmental phenotypes,
                    Nature 2016.
                  </a>
                </p>
              </div>
            </section>
          </Slide>
        </div>
        <div className="col-md-6">
          <Slide direction="right">
            <section>
              <img
                className="img-fluid firstimage"
                src={Embryo1}
                alt={Embryo1}
              />
              <label>IMPC Embryo</label>
            </section>
          </Slide>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Fade delay={100}>
            <section>
              <img
                className="img-fluid secondimage"
                src={Embryo2}
                alt={Embryo2}
              />
              <label>Embryo Phenotype</label>
            </section>
          </Fade>
        </div>
        <div className="col-md-6">
          <Fade delay={100}>
            <section>
              <div className="section-intro">
                <h3>Accessing Embryo Phenotype Data</h3>
                <p>Embryo phenotype data can be accessed in multiple ways:</p>
                <ul>
                  <li>
                    <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/data/embryo_imaging">
                      Embryo Images: interactive heatmap
                    </a>{" "}
                    A compilation of all our Embryo Images, organised by gene
                    and life stage, with access to the Interactive Embryo
                    Viewer, where you can compare mutants and wild types side by
                    side and rotate 2D and 3D images; we also provide access to
                    our external partners' embryo images.
                  </li>
                  <li>
                    <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/data/embryo/vignettes">
                      Embryo Vignettes
                    </a>{" "}
                    Showcase of best embryo images with detailed explanations.
                  </li>

                  <li>
                    From the FTP site, latest release All our results. Reports
                    need to be filtered by a dedicated column, Life Stage (E9.5,
                    E12.5, E15.5 and E18.5). Please check the README file or see
                    documentation{" "}
                    <a href="https://www.mousephenotype.org/help/non-programmatic-data-access/">
                      here.
                    </a>
                  </li>

                  <li>
                    Using the REST API (see documentation{" "}
                    <a href="https://www.mousephenotype.org/help/programmatic-data-access/">
                      here
                    </a>
                    )
                  </li>
                </ul>
              </div>
            </section>
          </Fade>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Slide cascade>
            <section>
              <div className="section-intro">
                <h3>Determining Lethal Lines</h3>
                <p>
                  The IMPC assesses each gene knockout line for viability
                  (Viability Primary Screen{" "}
                  <a href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7">
                    IMPC_VIA_001
                  </a>
                  ). In this procedure, the proportion of homozygous pups is
                  determined soon after birth, during the preweaning stage, in
                  litters produced from mating heterozygous animals. A line is
                  declared lethal if no homozygous pups for the null allele are
                  detected at weaning age, and subviable if pups homozygous for
                  the null allele constitute less than 12.5% of the litter.
                </p>
                <p>
                  Lethal strains are further phenotyped in the{" "}
                  <a href="https://www.mousephenotype.org/impress/index">
                    embryonic phenotyping pipeline
                  </a>
                  . For embryonic lethal and subviable strains, heterozygotes
                  are phenotyped in the IMPC{" "}
                  <a href="https://www.mousephenotype.org/impress/index">
                    {" "}
                    adult phenotyping pipeline.
                  </a>
                </p>
              </div>
            </section>
          </Slide>
        </div>
        <div className="col-md-6">
          <Slide direction="right">
            <section>
              <img
                className="img-fluid thirdimage"
                src={Embryo3}
                alt={Embryo3}
              />
              <label>Determining Lethal</label>
            </section>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
