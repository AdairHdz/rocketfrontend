import Avatar from "../../assets/avatar.png"

export const UserAvatar = () => {
    return (
        <figure style={{ height: 60 }} className="position-relative">
            <span className="position-absolute bottom-0 start-100 translate-middle p-2 bg-pink border border-light rounded-circle">
                <span className="visually-hidden"></span>
            </span>
            <img
                alt="avatar for user"
                src={Avatar}
                className="img-responsive border-pink rounded-circle p-1"
                height={60} />
        </figure>
    )
}