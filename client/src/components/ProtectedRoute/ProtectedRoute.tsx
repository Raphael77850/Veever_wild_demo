import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { RouteType } from "../../types/RouteType/RouteType";

const AdminRoute = ({ element }: RouteType) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    const checkAuthentification = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/checkToken`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          setIsAuthenticate(true);
        }
        // Si la réponse n'est pas ok (401, etc.), l'utilisateur n'est pas authentifié
      } catch (error) {
        console.error("Erreur de connexion au serveur:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentification();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default AdminRoute;
