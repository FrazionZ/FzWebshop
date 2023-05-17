export default function PinnedSVG({ stopColorFirst, stopColorLast }){

    return (
        <svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradientLocked" gradientUnits="userSpaceOnUse" fy="90%">
                    <stop offset="0" stopColor={stopColorFirst !== undefined ? stopColorFirst : "#f7a92f"} />
                    <stop offset="1" stopColor={stopColorLast !== undefined ? stopColorLast : "#f16b1f"} />
                </linearGradient>
            </defs>
            <g clipPath="url(#clip0_2081_4634)">
                <path
                    d="M101.667 44.928V37.3332C101.667 16.7147 84.952 0 64.3333 0C43.7145 0 27 16.7147 27 37.3332V44.928C17.2935 49.1643 11.014 58.7428 11 69.3333V101.333C11.0175 116.054 22.9462 127.982 37.6665 128H90.9997C105.72 127.982 117.649 116.054 117.667 101.333V69.3333C117.653 58.7428 111.373 49.1643 101.667 44.928ZM69.6665 90.6667C69.6665 93.6123 67.2788 96 64.3333 96C61.3878 96 59 93.6123 59 90.6667V80C59 77.0545 61.3878 74.6667 64.3333 74.6667C67.2788 74.6667 69.6665 77.0545 69.6665 80V90.6667ZM91 42.6668H37.6665V37.3335C37.6665 22.606 49.6055 10.6667 64.3333 10.6667C79.061 10.6667 91 22.6058 91 37.3335V42.6668Z"
                    fill="url(#gradientLocked)" />
            </g>
            <defs>
                <clipPath id="clip0_2081_4634">
                    <rect width="128" height="128" fill="url(#gradientLocked)" />
                </clipPath>
            </defs>
        </svg>
    )

}

    