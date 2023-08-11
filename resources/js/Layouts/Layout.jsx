import ApplicationLogo from '@/Components/ApplicationLogo';
import FzToastContainer from '@/Components/FzToastContainer';
import { Link, usePage } from '@inertiajs/react';
import LogoStore from '../../assets/img/fzlogo_store.svg'
import IconPbs from '../../assets/img/icon_pbs.svg'
import IconCoins from '../../assets/img/icon_coins.svg'
import DropdownUser from '@/Components/DropdownUser';

export default function Layout({ children }) {

    const props = usePage().props;
    const user = props.auth.user;
    const factionProfile = props.auth.factionProfile;
    const categories = props.shop.categories
    console.log(props)

    return (
        <>
            <div className="head">
                <a href={props.ziggy.url}>
                    <img src={LogoStore} alt="fzlogo_store" />
                </a>
                {props.ziggy.url == props.ziggy.location &&
                    <ul className='menu'>
                        {categories.map((category, index) => {
                            if (category.is_enable == 1)
                                return <li key={index}><a href={`#${category.name.toLowerCase()}`}>{category.name}</a></li>
                        })}
                    </ul>
                }

                <DropdownUser />
            </div>
            <div className="main">
                {children}
            </div>
            <FzToastContainer />
        </>
    );
}
