import { useParams } from "react-router-dom";

export function useURLID() {
  const { id } = useParams();
  return { id };
}
