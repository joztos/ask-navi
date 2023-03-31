import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Documents({ baseUrl }: { baseUrl: string }) {
  const [error, setError] = useState<string | undefined>(undefined);

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

      // Aquí puedes hacer algo con la respuesta si lo necesitas
    } catch (error) {
      console.error(error);
      setError("Error al obtener la lista de documentos");
    }
  };

  if (!error) {
    fetchDocuments();
  }

  return (
    <div>
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

      {!error && (
        <div>
          <div className="flex flex-row content-center pb-4">
            <HiOutlineExclamationCircle className="mt-0.5 mr-2 h-5 w-5" />
            <div>
              Las respuestas son generadas por OpenAI GPT consultado las NIIFs y las NICs oficiales. 
              documentos indexados.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
