import { Link } from "react-router-dom"


export const Error = () => {
  return (
    <div className="h-screen flex justify-center items-center">
        <div className="font-bold text-center  space-y-5 text-gray-700">
            <div>
                <p className="text-6xl">404</p>
                <p className="text-3xl">Error</p>
                <p>Página no encontrada</p>
            </div>
            
            <div>
                <Link to={"/d"} className="p-2 rounded-lg border border-purple-700 bg-purple-700 text-white hover:bg-white hover:text-purple-700"
                >volver</Link>
            </div>
            
        </div>
    </div>
  )
}
