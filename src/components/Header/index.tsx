import './index.scss'
import avatar from './images/avatar.png'

export function Header() {
    return (
        <div className="header">
            <label className="title" onClick={() => window.location.reload()}>Manage Tasks APP</label>
            <img src={avatar} height="40em" alt="avatar" />
        </div>
    )
}