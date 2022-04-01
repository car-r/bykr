import type { User, Note } from "@prisma/client";

import { prisma } from "~/db.server";

export function getBikes() {
    return prisma.bike.findMany({
      
    });
}

export function getBike(bikeId: any) {
    return prisma.bike.findFirst({ where: {id: bikeId}})
}