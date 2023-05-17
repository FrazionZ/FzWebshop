import React from 'react'

export default function Appareance({ className }) {

    return (
        <svg width="128" className={ className } height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradientAppareance" gradientUnits="userSpaceOnUse" fy="90%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="white"/>
                </linearGradient>
            </defs>
            <g clipPath="url(#clip0_2216_5236)">
                <path d="M121.419 23.4751C119.47 22.6632 117.323 22.4499 115.253 22.8621C113.182 23.2743 111.281 24.2934 109.792 25.7897L96 39.5817L71.5413 15.1231C69.541 13.1234 66.8284 12 64 12C61.1716 12 58.459 13.1234 56.4587 15.1231L32 39.5817L18.208 25.7897C16.7162 24.2984 14.8158 23.2829 12.747 22.8715C10.6782 22.4601 8.53382 22.6713 6.58502 23.4785C4.63622 24.2856 2.97048 25.6525 1.79838 27.4062C0.626284 29.1599 0.000450393 31.2217 0 33.3311L0 89.7897C0.00846857 96.8596 2.8207 103.637 7.81984 108.637C12.819 113.636 19.5968 116.448 26.6667 116.456H101.333C108.403 116.448 115.181 113.636 120.18 108.637C125.179 103.637 127.992 96.8596 128 89.7897V33.3311C128.001 31.2216 127.376 29.1593 126.204 27.4049C125.033 25.6506 123.367 24.283 121.419 23.4751V23.4751Z" fill="url(#gradientAppareance)" />
            </g>
            <defs>
                <clipPath id="clip0_2216_5236">
                    <rect width="128" height="128" fill="url(#gradientAppareance)" />
                </clipPath>
            </defs>
        </svg>
    )
}