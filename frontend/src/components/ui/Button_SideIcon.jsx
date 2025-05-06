export function Button_SideIcon({ icon, text, func = () => {}, className="" } ) {
    return (        
        <button className={`button-square2 center gap-5 Button_SideIcon ${className}`} onClick={func}>
            <img className='fullheight img-themes button-sideIcon' src={icon} alt={text} /> 
            {text}
        </button>
    );
}
export default Button_SideIcon;
