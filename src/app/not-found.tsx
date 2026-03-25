import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600">La pagina a la que intentas acceder no existe.</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Regresar al inicio
      </Link>
    </div>
  );
};

