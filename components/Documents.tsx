import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Documents({ baseUrl }: { baseUrl: string }) {
  const [documents, setDocuments] = useState<string[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(baseUrl + "/documents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const { status } = await response.json();
        setError(status.statusMessage);
        return;
      }

      const documents = await response.json();
      setDocuments(documents);
      if (documents && documents.length > 0 && !selectedDocument) {
        setSelectedDocument(documents[0]);
      }
    } catch (error) {
      console.error(error);
      setError("Error al obtener la lista de documentos");
    }
  };

  if (!documents) {
    fetchDocuments();
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDocument(event.target.value);
  };

  return (
    <div>
      {documents && documents.length !== 0 && (
        <div>
          <div className="flex flex-row content-center pb-4">
            <HiOutlineExclamationCircle className="mt-0.5 mr-2 h-5 w-5" />
            <div>
              Las respuestas son generadas por OpenAI GPT utilizando fuentes de
              estos documentos:
            </div>
          </div>
          <div>
            <select value={selectedDocument || ""} onChange={handleSelectChange}>
              {documents.map((document) => (
                <option key={document} value={document}>
                  📓 {document}
                </option>
              ))}
            </select>
          </div>
          <div>
            {selectedDocument && (
              <div>
                <p>Aquí se muestra el contenido del documento {selectedDocument}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {documents && documents.length === 0 && (
        <div>
          <p>No hay documentos disponibles</p>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
