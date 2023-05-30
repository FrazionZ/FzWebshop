import ApplicationLogo from '@/Components/ApplicationLogo';
import FzToastContainer from '@/Components/FzToastContainer';
import { Link, usePage } from '@inertiajs/react';
import LogoStore from '../../assets/img/fzlogo_store.svg'
import IconPbs from '../../assets/img/icon_pbs.svg'
import IconCoins from '../../assets/img/icon_coins.svg'

export default function Layout({ children }) {

    const props = usePage().props;
    console.log(props)
    const user = props.auth.user;
    const factionProfile = props.auth.factionProfile;
    const categories = props.shop.categories

    return (
        <>
            <div className="head">
                <a href={props.ziggy.url}>
                    <img src={LogoStore} alt="fzlogo_store" />
                </a>
                <ul className='menu'>
                    {categories.map((category, index) => {
                        if (category.is_enable == 1)
                            return <li key={index}><a href={`#${category.name.toLowerCase()}`}>{category.name}</a></li>
                    })}
                </ul>

                <div className="user">
                    <div className="ui teal buttons">
                        <div className="ui floating dropdown icon" tabIndex="0">
                            <div className="infos">
                                <h3>{user.name}</h3>
                                <div className="money">
                                    <div id="pbs">
                                        <img src={IconPbs} className="pbs" width="24" height="24" alt="" />
                                        <span>{user.money}</span>
                                    </div>
                                    <div id="coins">
                                        <img src={IconCoins} className="coins" width="24" height="24" alt="" />
                                        <span>{factionProfile?.money == undefined ? 0 : factionProfile?.money}</span>
                                    </div>
                                </div>
                            </div>
                            <img src="https://auth.frazionz.net/skins/face.php?u={{ Auth::user()->id }}" className="avatar" width="56" height="56" alt="" />
                            <div className="menu transition w-full" tabIndex="-1">
                                <a className="item" href="{{ route('credit.index') }}">
                                    Créditer mon compte
                                </a>
                                <a className="item" href="{{ route('user.creator.support') }}">
                                    Soutenir un créateur
                                </a>
                                <a className="item" href="{{ route('user.history') }}">
                                    Historique
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                {children}
            </div>
            <FzToastContainer />
        </>
    );
}
