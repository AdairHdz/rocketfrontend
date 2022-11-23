import React from "react"
import { DataOverview } from "../DataOverview"
import { FormSectionProps } from "../../props/FormSectionProps"
import { UserAvatar } from "../common/UserAvatar"

export const FormSection = (props: FormSectionProps) => {
    return (
        <div className="d-flex flex-column mb-5 row">
            <div className="d-flex gap-3">
                <UserAvatar />
                <div className="bg-light py-3 px-3 mb-3 col-8">
                    <p className="h4"> {props.title} </p>
                    {props.children}
                </div>
            </div>
            <DataOverview>
                {props.overview}
            </DataOverview>
            
        </div>
    )
}

