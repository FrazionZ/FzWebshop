import Layout from "@/Layouts/Layout";
import { Head, router } from "@inertiajs/react";
import '../../../css/subscribe.css'
import { FaCheck, FaTimes } from "react-icons/fa";
import Checked from '../../../assets/img/icons/check.jsx'
import Times from '../../../assets/img/icons/times.jsx'

export default function SubscriveIndex(props) {

    const title = "Abonnements"

    const subscribeCategories = props.subscribeCategories
    const subscribeFeatures = props.subscribeFeatures

    return (
        <Layout>
            <Head title={title} />

            <div className="subscribe">
                <h2 className="title">{title}</h2>
                <span className="text-white text-2xl text-center">
                    En souscrivant à un abonnement FrazionZ, vous acceptez les conditions générales <br/>d'utilisations et les conditions générales de ventes
                     <a target="_blank" href="https://frazionz.net/cgu"> (Voir page)</a>
                </span>
                <div className="categories">
                    <div className="features_datas">
                        {subscribeFeatures.map((feature, index) => {
                            return (
                                <div key={index} className="feature">
                                    {feature.description}
                                </div>
                            )
                        })}
                    </div>
                    {subscribeCategories.map((category, index) => {
                        let isLast = false
                        if (index + 1 === subscribeCategories.length)
                            isLast = true
                        return (
                            <div key={index} className={`card category ${isLast ? 'last' : ''}`}>
                                <div className="head">
                                    <div className="name">{category.name}</div>
                                    <div className="infos">
                                        <span className="price">{category.price}€</span>
                                        <span className="recurrent">/mois</span>
                                    </div>
                                </div>
                                <div className="features">
                                    {subscribeFeatures.map((feature, findex) => {
                                        let featureTarget = category.features.find(elem => elem.id == feature.id)
                                        const isCheck = featureTarget !== undefined
                                        let isExtra = false
                                        if(isCheck)
                                            isExtra = featureTarget?.extras !== undefined
                                        return (
                                            <div key={findex} className={`item ${isCheck ? 'check' : 'uncheck'}`}>
                                                {isCheck ? 
                                                    isExtra ? featureTarget?.extras?.label : <Checked /> : <Times />
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="actions">
                                    <button className="btn" onClick={() => { router.get(route('subscribe.details', {id: category.id})) }}>S'abonner</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )


}