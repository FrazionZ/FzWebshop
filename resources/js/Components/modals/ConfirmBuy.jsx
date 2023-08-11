import React, { useState } from 'react'
import Modal from 'react-modal';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import FzToast from '../FzToast';

import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../assets/img/icons/successfully-done.json";

const customStyles = {
    overlay: {
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(5px)",
    },
    content: {
        background: 'var(--fzbg-3)',
        border: 'none',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '12px',
        width: '50rem',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
};

export default function ConfirmBuy({ isMobile, item, type }) {

    const props = usePage().props
    const [open, setOpen] = React.useState(false)
    const modalTitle = "Confirmation de votre achat";

    document.querySelector('body').style.overflowY = open ? "hidden" : "auto"
    
    const { data, setData, post, processing, errors } = useForm({
        type: type,
        item_id: item.id,
        _token: props.csrf_token,
    });

    async function submit(e) {
        e.preventDefault();
        post(route("buy"), {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => {
            },
            onSuccess: (data) => {
                if (!data.props.flash.result) return;
                document.querySelector('.confirmBuyModal form').remove()
                document.querySelector('.confirmBuyModal .apply').classList.add('open')
            },
            onError: (data) => {
                FzToast.error('Une erreur interne est survenue :(')
            },
        });
    }

    return (
        <>
            <a className={`btn btn-primary ${type == "pbs" ? "pbs" : ""} btnBuy`} onClick={() => { setOpen(true) }}>Acheter</a>
            <Modal
                isOpen={open}
                onRequestClose={() => { setOpen(false) }}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
                ariaHideApp={true}
                contentLabel="Modal Promo Code"
                bodyOpenClassName='w-full confirmBuyModal'
                portalClassName='confirmBuyModal'
            >
                <form onSubmit={submit} className='flex flex-col gap-6'>
                    <h2 className='title text-3xl text-white'>{modalTitle}</h2>
                    <span className='text-white'>Vous êtes sur le point d'acheter "{item.name}".<br/>Souhaitez-vous vraiement réaliser cette achat de {type == "pbs" ? item.price_pbs : item.price_coins} {type}</span>
                    <button className='btn tiny' disabled={processing} type='submit'>Utiliser</button>
                </form>
                <div className="apply">
                    <Lottie animationData={groovyWalkAnimation} loop={true} />
                    <div className="col">
                        <h2 className='text-2xl text-white font-bold text-center'>Votre achat s'est déroulé avec succès !</h2>
                        <h4 className='text-xl text-white font-semibold text-center'>Connectez-vous en jeu pour récupérer votre achat</h4>
                    </div>
                    <div className="flex justify-center">
                        <button className='btn mt-6' onClick={() => { setOpen(false) }}>Continuer</button>
                    </div>
                </div>
            </Modal>
        </>

    )
}