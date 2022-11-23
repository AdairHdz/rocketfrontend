import React from "react"

export const DataOverview: React.FC<{
    children: React.ReactNode
}> = (props) => {
    return (
        <div className="align-self-end bg-pink px-3 col-8">
            {props.children}
        </div>
    )
}