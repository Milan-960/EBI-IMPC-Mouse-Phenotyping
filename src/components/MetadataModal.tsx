import { Modal } from "react-bootstrap";
import { MetadataModalProps, Phenotype } from "../types/custom-types";

const MetadataModal: React.FC<MetadataModalProps> = ({
  show,
  onHide,
  data,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Metadata</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data && (
          <>
            <h5>
              Gene: {data.gene?.id} ({data?.gene?.marker_accession_id})
            </h5>
            <h5>
              Top Level Phenotype Term:
              <label>
                {data.x} ({data?.xKey})
              </label>
            </h5>
            <h5>Phenotype Term: ({data.y ?? 0})</h5>
            <ul>
              {data.p_terms?.map((phenotype: Phenotype, index: number) => (
                <li key={index}>
                  {phenotype.mp_term_name} ({phenotype.mp_term_id})
                </li>
              ))}
            </ul>
            <h5>Procedures </h5>
            <ul>
              {data.procedures?.map((procedure: string, index: number) => (
                <li key={index}>{procedure} </li>
              ))}
            </ul>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MetadataModal;
