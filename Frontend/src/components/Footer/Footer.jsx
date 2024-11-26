import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 pt-4 pb-4" style={{ height: '120px', top: "0",
            bottom: "0", }}>
            <div className="container-fluid h-100 d-flex justify-content-around align-items-center">
                <p className="mb-0">Lautaro Balsebre</p>
                <p className="mb-0">Belén Lo Tártaro</p>
            </div>
        </footer>
    );
}

export default Footer;