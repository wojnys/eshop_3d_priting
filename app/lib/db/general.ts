"use server"
import prisma from "@/app/lib/db/prisma"
import {PaymentType, TransportType} from "@prisma/client";

export async function getTransportTypeByNumber(numberId: number): Promise<TransportType | null> {
    return await prisma.transportType.findFirst({
        where: {
            numberId: (numberId)
        }
    });
}

export async function getPaymentTypeByNumber(numberId: number): Promise<PaymentType | null> {
    return await prisma.paymentType.findFirst({
        where: {
            numberId: (numberId)
        }
    });
}