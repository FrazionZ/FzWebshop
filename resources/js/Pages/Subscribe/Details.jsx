import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import '../../../css/subscribe.css'

import PaypalIcon from '../../../assets/img/icons/paypal.svg'

export default function SubscriveIndex(props) {

    const title = "Souscription à l’abonnement"
    const subscribe = props.subscribe

    return (
        <Layout>
            <Head title={title} />

            <div className="subscribe">
                <h2 className="title">{title}</h2>
                <span className="text-white text-2xl text-center">
                    En souscrivant à un abonnement FrazionZ, vous acceptez les conditions générales <br/>d'utilisations et les conditions générales de ventes
                     <a target="_blank" href="https://frazionz.net/cgu"> (Voir page)</a>
                </span>
                <div className="details">
                    <div className="card w-[864px]">
                        <h2>Détails du paiement</h2>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div className="form-group">
                                <label htmlFor="family_name">Nom</label>
                                <input type="text" name="" id="" placeholder="Bob" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Prénom</label>
                                <input type="text" name="" id="" placeholder="The Bot" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 w-full">
                            <div className="form-group w-full">
                                <label htmlFor="family_name">Nom</label>
                                <input type="text" name="" id="" placeholder="bob@frazionz.net" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 w-full">
                            <button className="btn icon w-full"><img src={PaypalIcon} alt="" /> Payer avec PayPal</button>
                        </div>
                    </div>
                    <div className="card h-fit  w-[496px]">
                        <h2>{subscribe?.name}</h2>
                    </div>
                </div>
            </div>
        </Layout>
    )


}