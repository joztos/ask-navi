import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function LessonPlans({ baseUrl }: { baseUrl: string }) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [grade, setGrade] = useState<string | undefined>(undefined);
  const [teachingStyle, setTeachingStyle] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState<string | undefined>(undefined);

  const fetchLessonPlan = async () => {
    try {
      const response = await fetch(baseUrl + `/lesson-plans?grade=${grade}&teachingStyle=${teachingStyle}&topic=${topic}`, {
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
      setError("Error al obtener la lista de planes de clase");
    }
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGrade(event.target.value);
  };

  const handleTeachingStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeachingStyle(event.target.value);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchLessonPlan();
  };

  if (!error) {
    fetchLessonPlan();
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
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="grade" className="block font-medium text-gray-700">
                Grado escolar
              </label>
              <select id="grade" name="grade" onChange={handleGradeChange}>
                <option value="1">Primero de primaria</option>
                <option value="2">Segundo de primaria</option>
                <option value="3">Tercero de primaria</option>
                <option value="4">Cuarto de primaria</option>
                <option value="5">Quinto de primaria</option>
                <option value="6">Sexto de primaria</option>
              </select>
            </div>
            <div>
              <label htmlFor="teaching-style" className="block font-medium text-gray-700">
                Estilo de enseñanza
              </label>
              <select id="teaching-style" name="teaching-style" onChange={handleTeachingStyleChange}>
                <option value="expositivo">Expositivo</option>
                <option value="colaborativo">Colaborativo</option>
                <option value="práctico">Práctico</option>
              </select>
            </div>
            <div
