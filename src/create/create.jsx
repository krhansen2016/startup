import React, { useState } from "react";
import "./create.css";

export function Create() {
    const [openMenu, setOpenMenu] = useState(null);
    const [design, setDesign] = useState({
        bodice: "",
        neckline: "",
        sleeves: "",
        bottoms: "",
        color: "",
    })

    function toggleMenu(menuName) {
        setOpenMenu(openMenu === menuName ? null : menuName);
    }

    function selectOption(category, value) {
        setDesign({...design, [category]: value,});
        setOpenMenu(null);
    }

    function getPreviewImage() {
        if (!design.bodice) {
            return "/preview_placeholder.jpg";
        }
        return `/images/${design.bodice}.png`;
    }

    return (
        <main>
            <h3 className="heading" id="description-header">Create a New Design</h3>
            <div id="design-tools">
                <div id="clothing-select">
                    <ul className="menu">
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("bodice")}>Bodice Type <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenu === "bodice" ? "show" : ""}`}>
                                <li onClick={() => selectOption("bodice", "Loose")}>Loose</li>
                                <li onClick={() => selectOption("bodice", "Form Fitting")}>Form Fitting</li>
                                <li onClick={() => selectOption("bodice", "Gathered")}>Gathered</li>
                                <li onClick={() => selectOption("bodice", "Boned")}>Boned</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("necklines")}>Necklines <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenu === "necklines" ? "show" : ""}`}>
                                <li onClick={() => selectOption("necklines", "Crew")}>Crew</li>
                                <li onClick={() => selectOption("necklines", "V-Neck")}>V-Neck</li>
                                <li onClick={() => selectOption("necklines", "Square")}>Square</li>
                                <li onClick={() => selectOption("necklines", "Turtleneck")}>Turtleneck</li>
                                <li onClick={() => selectOption("necklines", "Sweetheart")}>Sweetheart</li>
                                <li onClick={() => selectOption("necklines", "Collared")}>Collared</li>
                                <li onClick={() => selectOption("necklines", "Asymetric")}>Asymetric</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("sleeves")}>Sleeves <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenu === "sleeves" ? "show" : ""}`}>
                                <li onClick={() => selectOption("sleeves", "None")}>None</li>
                                <li onClick={() => selectOption("sleeves", "Straps")}>Straps</li>
                                <li onClick={() => selectOption("sleeves", "Off the Shoulder")}>Off the Shoulder</li>
                                <li onClick={() => selectOption("sleeves", "Short")}>Short</li>
                                <li onClick={() => selectOption("sleeves", "Long")}>Long</li>
                                <li onClick={() => selectOption("sleeves", "Elbow-Length")}>Elbow-Length</li>
                                <li onClick={() => selectOption("sleeves", "Puffed")}>Puffed</li>
                                <li onClick={() => selectOption("sleeves", "Juliet")}>Juliet</li>
                                <li onClick={() => selectOption("sleeves", "Bishops")}>Bishops</li>
                                <li onClick={() => selectOption("sleeves", "Flounce")}>Flounce</li>
                                <li onClick={() => selectOption("sleeves", "Bell")}>Bell</li>
                                <li onClick={() => selectOption("sleeves", "Layered")}>Layered</li>
                                <li onClick={() => selectOption("sleeves", "Kimono")}>Kimono</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("bottoms")}>Bottoms <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenu === "bottoms" ? "show" : ""}`}>
                                <li className="dropdown">
                                    <button className="dropdown-btn" onClick={() => toggleMenu("pants")}>Pants <span className="arrow">▼</span></button>
                                    <ul className={`dropdown-menu ${openMenu === "pants" ? "show" : ""}`}>
                                        <li>Shorts</li>
                                        <li>Capris</li>
                                        <li>Straight</li>
                                        <li>Skinny</li>
                                        <li>Bootcut</li>
                                        <li>Flare</li>
                                        <li>Wide</li>
                                        <li>Cargo</li>
                                        <li>Sweatpants</li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <button className="dropdown-btn" onClick={() => toggleMenu("skirts")}>Skirts <span className="arrow">▼</span></button>
                                    <ul className={`dropdown-menu ${openMenu === "skirts" ? "show" : ""}`}>
                                        <li>Mini</li>
                                        <li>Midi</li>
                                        <li>Maxi</li>
                                        <li>Pencil</li>
                                        <li>Tutu</li>
                                        <li>Mermaid</li>
                                        <li>Tiered</li>
                                        <li>Mullet</li>
                                        <li>Slit</li>
                                        <li>Asymetrical</li>
                                        <li>Pleated</li>
                                        <li>Circle</li>
                                        <li>Wrapped</li>
                                        <li>Princess</li>
                                        <li>Gypsy</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                    <div id="live-preview">
                        <img src={getPreviewImage()} alt="Live Design Preview" />
                    </div>
            </div>
            <div className="color-select">
                <label id="color-label">Colors:</label>
                <div className="colors">
                    <button id="dark-red"></button>
                    <button id="burgundy"></button>
                    <button id="red"></button>
                    <button id="red-orange"></button>
                    <button id="orange"></button>
                    <button id="gold"></button>
                    <button id="yellow"></button>
                    <button id="light-green"></button>
                    <button id="green"></button>
                    <button id="dark-green"></button>
                    <button id="olive"></button>
                    <button id="mint"></button>
                    <button id="teal"></button>
                    <button id="dark-teal"></button>
                    <button id="light-blue"></button>
                    <button id="blue"></button>
                    <button id="dark-blue"></button>
                    <button id="indigo"></button>
                    <button id="periwinkle"></button>
                    <button id="lavender"></button>
                    <button id="purple"></button>
                    <button id="dark-purple"></button>
                    <button id="plum"></button>
                    <button id="berry"></button>
                    <button id="salmon"></button>
                    <button id="magenta"></button>
                    <button id="pink"></button>
                    <button id="light-pink"></button>
                    <button id="dark-brown"></button>
                    <button id="brown"></button>
                    <button id="light-brown"></button>
                    <button id="eggshell"></button>
                    <button id="black"></button>
                    <button id="grey"></button>
                    <button id="silver"></button>
                    <button id="white"></button>
                </div>
            </div>
        </main>
    )
}