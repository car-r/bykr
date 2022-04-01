import { json, useLoaderData, useCatch, Form } from "remix";
import { getBike } from "~/models/bike.server";

import { prisma } from "~/db.server";

export const loader = async ({params}: any) => {
    // const bike = await prisma.bike.findFirst({ where: {id: params.bikeId}})
    const bike = await getBike(params.bikeId)
    const host = await prisma.user.findFirst({where: {id: bike?.userId}})
    return json({...bike, host})
}

export default function BikeDetailRoute() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="flex flex-col">
            <img src={data.imgSrc} alt={data.model} className="h-52 w-auto object-cover max-w-46"/>
            <h4 className="font-bold text-xl">{data.brand} <span>{data.model}</span></h4>
            <p className="font-light">Type: {data.type}</p>
            <p className="font-semibold text-sm">DESCRIPTION</p>
            <p>{data.description}</p>
        </div>
    )
}