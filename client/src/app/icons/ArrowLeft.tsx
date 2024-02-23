import React from 'react'

const ArrowLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 32 32"
      fill="#000000"
      stroke="#000000"
      strokeWidth="0.192"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

      <g id="SVGRepo_iconCarrier">
        {' '}
        <g id="arrow_left">
          {' '}
          <path
            fill="#231f20"
            d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"
          />{' '}
        </g>{' '}
      </g>
    </svg>
  )
}

export default ArrowLeft
