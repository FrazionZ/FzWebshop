import Layout from "@/Layouts/Layout"
import { Head, Link, router } from "@inertiajs/react"
import { useState } from "react"

export default function CreditIndex(props) {

    const title = "Créditer du compte"

    const creditOfferGateway = props.creditOfferGateway
    const [isStartPayment, setIsStartPayment] = useState(false)

    function startPayment(offer) {
        setIsStartPayment(true)
        router.get(route('credit.start', { id: offer.offer_id }), {}, {})
    }

    return (
        <Layout>
            <Head title={title} />

            <h2 className="text-white text-2xl font-bold">Créditer mon compte</h2>
            <h2 className="text-lg mb-20 text-gray-400">Sélection d'une offre</h2>

            <div className="grid grid-cols-6 gap-6">
                {!isStartPayment &&
                    <>
                        {creditOfferGateway.map((offer, index) => {
                            return (
                                <a key={index} onClick={() => { setIsStartPayment(true) }} href={route('credit.start', { id: offer.offer_id })} className="card black-3 cursor-pointer gateway p-2 br-15 w-full">
                                    <div className="content flex direct-column gap-1 align-center viga">
                                        <h3 className="text-2xl font-bold">{offer.offers.money} Pbs</h3>
                                        <h3 className="text-lg text-[var(--text-inactive)] font-medium">{offer.offers.price} €</h3>
                                    </div>
                                </a>
                            )
                        })}
                    </>
                }
                {isStartPayment &&
                    <span className="text-white">Redirection vers le service de paiement..</span>
                }
            </div>
        </Layout>
    )

}