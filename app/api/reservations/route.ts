import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/database/db'
import nodemailer from "nodemailer"
import { ReactElement } from "react";
import { render } from "@react-email/render";
import EmailTemplate from "@/app/components/EmailTemplate";

export async function POST(request: NextRequest) {
    try {
        const {firstName, lastName, email, phone, numPeople, arrivalTime, reservationDate} = await request.json()
        const reservation = await prisma.reservation.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                numPeople,
                arrivalTime,
                reservationDate: new Date(reservationDate)
            }
        })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })

        const emailHtml = await render(EmailTemplate({
            firstName,
            lastName,
            email,
            phone,
            numPeople,
            arrivalTime,
            reservationDate,
          }) as ReactElement)

          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Confirmation de réservation",
            html: emailHtml
          })

        return NextResponse.json({message: "Réservation effectuée avec succès", reservation}, {status: 201})
        
    } catch(error) {
        console.error('Une erreur API route est surnvenue')
        return NextResponse.json({error: "Une erreur est survenue"}, {status: 500})
    }
    
}