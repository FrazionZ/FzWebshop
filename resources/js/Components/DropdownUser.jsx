import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { usePage, Link } from '@inertiajs/react'
import LogoStore from '../../assets/img/fzlogo_store.svg'
import IconPbs from '../../assets/img/icon_pbs.svg'
import IconCoins from '../../assets/img/icon_coins.svg'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DropdownUser() {

    const props = usePage().props
    const user = props.auth.user
    const factionProfile = props.auth.factionProfile;

    return (
        <Menu as="div" className="relative inline-block text-left user dropdown">
            <Menu.Button style={{ background: 'transparent' }} className={`ui-active:active inline-flex w-full justify-center gap-x-1.5 rounded-md p-3 text-sm font-semibold shadow-sm cursor-pointer`}>
                <div className="flex gap-3 items-center">
                    <div className="infos flex flex-col gap-1">
                        <h3>{user.name}</h3>
                        <div className="money cursor-pointer">
                            <div id="pbs" className=' cursor-pointer'>
                                <img src={IconPbs} className="pbs cursor-pointer" width="24" height="24" alt="" />
                                <span className=' cursor-pointer'>{window.moneyFormatter(user.money, true)}</span>
                            </div>
                            <div id="coins" className=' cursor-pointer'>
                                <img src={IconCoins} className="coins cursor-pointer" width="24" height="24" alt="" />
                                <span className=' cursor-pointer'>{factionProfile?.money == undefined ? 0 : window.moneyFormatter(factionProfile?.money, false)}</span>
                            </div>
                        </div>
                    </div>
                    <img src={`https://auth.frazionz.net/skins/face.php?u=${user.id}`} className="avatar" width="56" height="56" alt="" />
                </div>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute top-20 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[var(--fzbg-2)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                    <div className="menu transition w-full flex flex-col p-3 gap-3" tabIndex="-1">
                        <Link className="item" href={route('credit.index')}>
                            Créditer mon compte
                        </Link>
                        <Link className="item" href="{{ route('user.creator.support') }}">
                            Soutenir un créateur
                        </Link>
                        <Link className="item" href="{{ route('user.history') }}">
                            Historique
                        </Link>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}