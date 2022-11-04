import React from 'react'

const StatsCards = ({declined, interview, pending}) => {

    const statCardsInfo = [
        {
            title: "Pending Applications",
            status: pending,
            bgColor: "bg-[rgb(193,151,2)]",
            emoji: "🙂"
        },
        {
            title: "Interview Scheduled",
            status: interview,
            bgColor: "bg-primary-color",
            emoji: "🤩"
        },
        {
            title: "Declined Applications",
            status: declined,
            bgColor: "bg-[rgb(253,61,61)]",
            emoji: "😔"
        }
    ]

    return (
        <div className=''>
            {
                statCardsInfo.map((stat) => {
                    return(
                        <div key={stat.title} className={`${stat.bgColor} h-40 flex flex-col justify-center align-middle text-center rounded-md mb-5`}>
                            <h1 className='font-bold text-6xl text-white mb-2'>{stat.status}{stat.emoji}</h1>
                            <p className='text-secondary-color font-medium'>{stat.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default StatsCards