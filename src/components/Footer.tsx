import * as React from "react"

export interface FooterProps { 
    status:any
    refresh():void
}

function gpsIcon(status:any){
    const located = status == "OK" ;
    if (located){
        return (<i className="footer-button fnt--green material-icons">&#xE1B3;</i>)
    } else {
        return (<i className="footer-button fnt--red material-icons">&#xE1B5;</i>)
    }
}

export const Footer = (props:FooterProps) => (
    <footer className='bg--dark-gray grd'>  
        <div className='grd-row'>
            <div className='grd-row-col-2-6 footer-container'>
                    {gpsIcon(props.status)}
            </div>
            <div className='grd-row-col-2-6 btn--gray footer-container' onClick={props.refresh}>
                <i className="footer-button material-icons fnt--light-gray">&#xE87A;</i>
            </div> 
            <div className='grd-row-col-2-6 footer-container google-logo .p1'>
                <img src="images/powered_by_google_on_non_white.png" alt="powered_by_google"/>
            </div>
        </div>
    </footer>
)
