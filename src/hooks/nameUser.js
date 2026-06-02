import { useEffect, useState } from "react";

export function useNameUser(email) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase
          .from("tecnicos")
          .select("nombre")
          .eq("correo", email)
          .single();

        if (error) throw error;

        setNombre(data.nombre);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      getUser();
    }
  }, [email]);

  return { nombre, loading };
}
