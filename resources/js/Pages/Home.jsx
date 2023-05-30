import { Link, Head, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout'
import FzToast from '@/Components/FzToast';

export default function Home({ auth }) {

    const props = usePage().props;
    const categories = props.shop.categories
    const items = props.items

    return (
        <Layout>
            <Head title="Accueil" />
            <div className="list">
                {categories.map((category, index) => {

                    const slugCategory = category.name.toLowerCase()
                    if (category.is_enable !== 0)
                        return (

                            <div key={index} className="categorie" id={category.name.toLowerCase()}>
                                <div className="card infos">
                                    {category.name}
                                </div>
                                <div className="products">
                                    {items.map((item, itindex) => {

                                        const slug = item.name.toLowerCase()
                                        let colors = [item.color1, item.color2]
                                        {
                                            if (item.category_id == category.id)
                                                return (
                                                    <Link key={itindex} href={route('showItem', {slug: slugCategory, itemID: item.id})}>
                                                        <div className="card" style={{ background: `linear-gradient(${colors[0]}, ${colors[1]})` }}>
                                                            <div className="items" style={{ backgroundImage: `url(https://cdn.frazionz.net/shop/thumbnail/${item.id}.png)` }}>
                                                                <div className="infos">
                                                                    <span className="categ_name">{category.id !== 5 ? category.singular_name : item.custom_category_name}</span>
                                                                    <span className="package_name">{item.name}</span>
                                                                </div>
                                                                <div className="prices">
                                                                    {item.price_coins > -1 &&
                                                                        <span className="package_price_coins">{item.price_coins} Coins</span>
                                                                    }
                                                                    {item.price_pbs > -1 &&
                                                                        <span className="package_price_pbs">{item.price_pbs} Pbs</span>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                        }
                                    })}

                                </div>
                            </div>
                        )
                })}
            </div>
        </Layout>
    );
}
