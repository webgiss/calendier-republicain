import './SubTitle.css'

const SubTitle = ({ url, version }) =>
    <p className='SubTitle'>Sources : <a href={url} rel="noreferrer" target="_blank">{url}</a> - Version : <b>{version}</b></p>

export default SubTitle;