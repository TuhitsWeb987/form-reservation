import * as React from "react"
import { Html, Head, Preview, Body, Container, Heading, Text } from "@react-email/components"


interface EmailTemplateProps {
    firstName: string
    lastName: string
    email: string
    phone: string
    numPeople: number
    arrivalTime: string
    reservationDate: string
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, lastName, email, phone, numPeople, arrivalTime, reservationDate}) => {
    return (
        <Html>
            <Head />
            <Preview>Confirmation de réservation</Preview>
            <Body className="bg-white text-gray-900">
                <Container className="bg-white rounded-lg shadow-md p-6">
                    <Heading>Nouvelle réservation</Heading>
                    <Text>Bonjour {firstName} {lastName}</Text>
                    <Text>Voici les détails de votre réservation</Text>
                    <Text>Nom: {firstName} {lastName}</Text>
                    <Text>E-mail: {email}</Text>
                    <Text>Phone: {phone}</Text>
                    <Text>Nombre de personne: {numPeople}</Text>
                    <Text>Heure: {arrivalTime}</Text>
                    <Text>Date: {reservationDate}</Text>
                </Container>
            </Body>
        </Html>
    )
}

export default EmailTemplate