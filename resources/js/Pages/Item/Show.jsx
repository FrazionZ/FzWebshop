import Layout from "@/Layouts/Layout";
import { Head, Link, router } from "@inertiajs/react";
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'
import ConfirmBuy from '@/Components/Modals/ConfirmBuy'

export default function ItemShow(props) {

    const title = "Boutique"
    const category = props.category
    const item = props.item
    const factionProfile = props.factionProfile


    return (
        <Layout>
            <Head title={title} />
            <div className="flex justif-between">
                <div className="colum pres-item">
                    <div className="card black-2">
                        <Link href={route('index')} className="back"><FaArrowLeft /></Link>
                        <div className="content flex gap-30 direct-column">
                            <span className="item-name">
                                {category.id !== 5 ? category.singular_name : item.custom_category_name} {item.name}
                            </span>
                            <span className="item-description">
                                <h2 className="text-24">Contenu:</h2><br />
                                <div dangerouslySetInnerHTML={{
                                    __html: item.description.replaceAll('/storage/posts/attachments', 'https://cdn.frazionz.net/posts/attachments')
                                }} />
                            </span>
                            <div className="action">
                                {factionProfile !== undefined &&
                                    <div className="offline">
                                        {item.price_coins !== null &&
                                            <>
                                                { item.price_coins > -1 && item.price_coins > 0 &&
                                                    <div className="price">
                                                        <span className="text">{ item.price_coins } Coins</span>
                                                        <ConfirmBuy item={item} type="coins" />
                                                    </div>
                                                }
                                            </>
                                        }
                                        {item.price_pbs !== null &&
                                            <>
                                                { item.price_pbs > -1 && item.price_pbs > 0 &&
                                                    <div className="price">
                                                        <span className="text">{ item.price_pbs } Points Boutique</span>
                                                        <ConfirmBuy item={item} type="pbs" />
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                }
                                {factionProfile == undefined &&
                                    <div className="online">
                                        <div className="alert black-3 flex items-center" style={{ borderRadius: "8px", position: "relative", bottom: "-22px" }}>
                                            <FaExclamationTriangle className="color-2 mr-10 text-lg" />Aucun achat n'est disponible. Vous devez vous connecter au moins une fois sur le serveur.
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column-thumb">
                    <img src={`https://cdn.frazionz.net/shop/thumbnail/${item.id}.png`} alt="" />
                </div>
            </div>
        </Layout>
    )


}