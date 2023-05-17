import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FzToast from './FzToast'
import { usePage } from '@inertiajs/react'

export default function FzToastContainer(){
    
    const { flash } = usePage().props

    if(flash.status !== null){
        let type = flash.status.type;
        let msg = flash.status.msg;
        switch(type){
            case 'error':
                FzToast.error(msg)
                break;
            case 'success':
                FzToast.success(msg)
                break;
            case 'info':
                FzToast.info(msg)
                break;
            case 'warning':
                FzToast.warning(msg)
                break;
            default:
                FzToast.info(msg)
        }
        flash.status = null
    }

    return (
        <ToastContainer />
    )


}