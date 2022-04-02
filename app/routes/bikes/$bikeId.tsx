import { json, useLoaderData, useCatch, Form } from "remix";
import { getBike } from "~/models/bike.server";

import { prisma } from "~/db.server";

export const loader = async ({params}: any) => {
    // const bike = await prisma.bike.findFirst({ where: {id: params.bikeId}})
    const bike = await getBike(params.bikeId)
    const host = await prisma.user.findFirst({where: {id: bike?.userId}})
    const rides = await prisma.ride.findMany({ where: {bikeId: params.bikeId}})
    const ridesData = rides.map((ride) => ({ride}))
    return json({...bike, host, ridesData})
}

export default function BikeDetailRoute() {
    const data = useLoaderData()
    const ratingArray = data.ridesData.map((ride: any) => (ride.ride.rating))
    
    const total = ratingArray.reduce((acc: any, c: any) => acc + c, 0)
    
    let avgRating = total / ratingArray.length
    
    if (ratingArray === 0) {
        avgRating = 0
    }
    
    console.log(data)
    return (
        <div className="flex flex-col">
            <img src={data.imgSrc} alt={data.model} className="h-52 w-auto object-cover max-w-46"/>
            <h4 className="font-bold text-xl">{data.brand} <span>{data.model}</span></h4>
            <p className="font-light">Type: {data.type}</p>
            <div className="flex font-bold">
                {ratingArray.length === 0 ? <p>0</p> : <p>
                    {avgRating.toFixed(1)}
                </p>}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-light">({data.ridesData.length} rides)</span>
            </div>
            
            <p className="font-semibold text-sm">DESCRIPTION</p>
            <p>{data.description}</p>
        </div>
    )
}