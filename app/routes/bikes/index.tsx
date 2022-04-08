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
        <div className="flex flex-col ">
            <h1 className="text-2xl font-bold">Bikes for rent</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                {data.map((bike: any) => (
                    <Link to={`/bikes/${bike.id}`} key={bike.id} className="border border-neutral-100 shadow-lg rounded-lg flex flex-col max-w-xl">
                        <img src={bike.imgSrc} alt={bike.model} className="h-52 w-auto object-cover max-w-46 rounded-t-lg"/>
                        <div className="px-4 py-2 flex justify-between">
                            <h4 className="font-bold text-xl">{bike.brand} <span>{bike.model}</span></h4>
                            {bike.favorite ? 
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        : 
                        <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                        }
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}