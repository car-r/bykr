import type { User, Note } from "@prisma/client";

import { prisma } from "~/db.server";

export function getBikes() {
    return prisma.bike.findMany({
      
    });
}

export function getBike(bikeId) {
    return prisma.bike.findFirst({ where: {id: bikeId}})
}