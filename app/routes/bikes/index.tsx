import { Link } from "remix";
import { json, useLoaderData, useCatch, Form } from "remix";
import { getBikes } from "~/models/bike.server";

export const loader = async () => {
    const bikes = await getBikes()
    return json(bikes)
}

export default function BikesIndexPage() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Bikes for rent</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                {data.map((bike: any) => (
                    <Link to={`/bikes/${bike.id}`} key={bike.id} className="border border-neutral-100 shadow-lg rounded-lg flex flex-col max-w-xl">
                        <img src={bike.imgSrc} alt={bike.model} className="h-52 w-auto object-cover max-w-46 rounded-t-lg"/>
                        <div className="px-4 py-2">
                            <h4 className="font-bold text-xl">{bike.brand} <span>{bike.model}</span></h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}