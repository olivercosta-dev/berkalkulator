export default function PersonAvatar({personAvatar}) {
    return (
        <div className="avatar">
            <div className="w-24 rounded-xl">
                <img src={personAvatar} />
            </div>
        </div>
    )
}