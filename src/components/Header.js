
const Header = () =>{
    return(
        <>
        <div className="header">

            <div className="logoContainer">
                <img className='logo' src={require('./Swiggy-logo.png')} alt="logo" />
                <span className="address">Maner</span>
            </div>

            <div className="menuSection">
                <div className="search">Search</div>
                <div className="offers">offers</div>
                <div className="help">help</div>
                <div className="user">user</div>
                <div className="cart">cart</div>
            </div>

        </div>
        </>
    )
};
export default Header;