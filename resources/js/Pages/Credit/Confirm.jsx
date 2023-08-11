import Layout from "@/Layouts/Layout"
import { Head, Link, router } from "@inertiajs/react"
import { useState } from "react"
import { FiCheckCircle } from 'react-icons/fi'
import Language from "@/Components/Language"

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function CreditIndex(props) {

    const title = "Confirmation d'achat de points boutique"
    const payment = props.payment

    const lang = new Language()

    return (
        <Layout>
            <Head title={title} />

            <div className="flex flex-col items-center gap-[1.5rem]">
                <FiCheckCircle className="text-green-600 text-9xl" />
                <div className="titles text-center">
                    <h2 className="text-white text-2xl font-bold">{title}</h2>
                    <h2 className="text-lg text-gray-400">Votre compte a bien été crédité</h2>
                </div>
                <div className="px-96 w-full">
                    <table className="black-2 rounded-xl border-collapse table-auto w-full text-sm">
                        <tbody className="">
                            <tr>
                                <td className="border-b border-[var(--fzbg-1)] p-4 pr-8 text-white">Compte crédité</td>
                                <td className="border-b border-[var(--fzbg-1)] p-4 pr-8 text-white">{payment.user.name}</td>
                            </tr>
                            <tr>
                                <td className="border-b border-[var(--fzbg-1)] p-4 pr-8 text-white">Montant payée</td>
                                <td className="border-b border-[var(--fzbg-1)] p-4 pr-8 text-white">{payment.amount} {payment.currency}</td>
                            </tr>
                            <tr>
                                <td className="border-b border-[var(--fzbg-1)] p-4 pr-8 text-white">Points boutique ajoutés</td>
                                <td className="border-b border-[var(--fzbg-1)] p-4 pr-8 text-white">{payment.offer.money} Pbs</td>
                            </tr>
                            <tr>
                                <td className="p-4 pr-8 text-white">Réalisé le</td>
                                <td className="p-4 pr-8 text-white">{lang.replaceMonth(moment(payment.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link href={route('index')} className="btn">Retour vers l'accueil</Link>
            </div>

            
        </Layout>
    )

}