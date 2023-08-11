import Layout from "@/Layouts/Layout"
import { Head, Link } from "@inertiajs/react"
import { FaPaypal } from "react-icons/fa"

import PayPalLogo from '../../../assets/img/payments/paypal.svg'

export default function CreditIndex(props) {

    const title = "Créditer du compte"

    const creditGateway = props.creditGateway

    return (
        <Layout>
            <Head title={title} />
            
            <h2 className="text-white text-2xl font-bold">Créditer mon compte</h2>
            <h2 className="text-lg mb-20 text-gray-400">Sélection d'un moyen de paiement</h2>
            <div className="flex gap-20 mt-80">
                {creditGateway.map((gateway, index) => {
                    return (
                        <Link key={index} className="text-white" style={{ display: 'block' }} href={route('credit.offers', { id: gateway.id })}>
                            <div className="card black-2 gateway br-15 w-fcontent">
                                <div className="content viga">
                                    <img src={PayPalLogo} style={{ width: "100px" }} />
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </Layout>
    )

}