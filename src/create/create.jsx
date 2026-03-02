import React, { useState } from "react";
import "./create.css";

export function Create() {
    const [openMenu, setOpenMenu] = useState(null);
    const [design, setDesign] = useState({
        bodice: "",
        necklines: "",
        sleeves: "",
        bottom: {
            type: "",
            style: "",
        },
        color: "",
    });

    function toggleMenu(menuName) {
        setOpenMenu(openMenu === menuName ? null : menuName);
    }

    function selectOption(category, value) {
        setDesign({...design, [category]: value,});
        setOpenMenu(null);
    }

    function selectBottom(type, style) {
        setDesign({...design, bottom: { type, style }});
        setOpenMenu(null);
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
                                <li onClick={() => selectOption("bodice", "loose")}>Loose</li>
                                <li onClick={() => selectOption("bodice", "fitted")}>Form Fitting</li>
                                <li onClick={() => selectOption("bodice", "gathered")}>Gathered</li>
                                <li onClick={() => selectOption("bodice", "boned")}>Boned</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("necklines")}>Necklines <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenu === "necklines" ? "show" : ""}`}>
                                <li onClick={() => selectOption("necklines", "crew")}>Crew</li>
                                <li onClick={() => selectOption("necklines", "vneck")}>V-Neck</li>
                                <li onClick={() => selectOption("necklines", "Square")}>Square</li>
                                <li onClick={() => selectOption("necklines", "turtleneck")}>Turtleneck</li>
                                <li onClick={() => selectOption("necklines", "sweetheart")}>Sweetheart</li>
                                <li onClick={() => selectOption("necklines", "collared")}>Collared</li>
                                <li onClick={() => selectOption("necklines", "asymetrical_neckline")}>Asymetric</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("sleeves")}>Sleeves <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenu === "sleeves" ? "show" : ""}`}>
                                <li onClick={() => selectOption("sleeves", "none")}>None</li>
                                <li onClick={() => selectOption("sleeves", "straps")}>Straps</li>
                                <li onClick={() => selectOption("sleeves", "off_shoulder")}>Off the Shoulder</li>
                                <li onClick={() => selectOption("sleeves", "short")}>Short</li>
                                <li onClick={() => selectOption("sleeves", "long")}>Long</li>
                                <li onClick={() => selectOption("sleeves", "elbow_length")}>Elbow-Length</li>
                                <li onClick={() => selectOption("sleeves", "puffed")}>Puffed</li>
                                <li onClick={() => selectOption("sleeves", "juliet")}>Juliet</li>
                                <li onClick={() => selectOption("sleeves", "bishops")}>Bishops</li>
                                <li onClick={() => selectOption("sleeves", "flounce")}>Flounce</li>
                                <li onClick={() => selectOption("sleeves", "bell")}>Bell</li>
                                <li onClick={() => selectOption("sleeves", "layered")}>Layered</li>
                                <li onClick={() => selectOption("sleeves", "kimono")}>Kimono</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("bottoms")}>Bottoms <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenu === "bottoms" ? "show" : ""}`}>
                                <li className="dropdown">
                                    <button className="dropdown-btn" onClick={() => toggleMenu("pants")}>Pants <span className="arrow">▼</span></button>
                                    <ul className={`dropdown-menu ${openMenu === "pants" ? "show" : ""}`}>
                                        <li onClick={() => selectBottom("pants", "shorts")}>Shorts</li>
                                        <li onClick={() => selectBottom("pants", "capris")}>Capris</li>
                                        <li onClick={() => selectBottom("pants", "straight")}>Straight</li>
                                        <li onClick={() => selectBottom("pants", "skinny")}>Skinny</li>
                                        <li onClick={() => selectBottom("pants", "bootcut")}>Bootcut</li>
                                        <li onClick={() => selectBottom("pants", "flare")}>Flare</li>
                                        <li onClick={() => selectBottom("pants", "wide")}>Wide</li>
                                        <li onClick={() => selectBottom("pants", "cargo")}>Cargo</li>
                                        <li onClick={() => selectBottom("pants", "sweatpants")}>Sweatpants</li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <button className="dropdown-btn" onClick={() => toggleMenu("skirts")}>Skirts <span className="arrow">▼</span></button>
                                    <ul className={`dropdown-menu ${openMenu === "skirts" ? "show" : ""}`}>
                                        <li onClick={() => selectBottom("skirt", "mini")}>Mini</li>
                                        <li onClick={() => selectBottom("skirt", "midi")}>Midi</li>
                                        <li onClick={() => selectBottom("skirt", "maxi")}>Maxi</li>
                                        <li onClick={() => selectBottom("skirt", "pencil")}>Pencil</li>
                                        <li onClick={() => selectBottom("skirt", "tutu")}>Tutu</li>
                                        <li onClick={() => selectBottom("skirt", "mermaid")}>Mermaid</li>
                                        <li onClick={() => selectBottom("skirt", "layered_skirt")}>Layered</li>
                                        <li onClick={() => selectBottom("skirt", "mullet")}>Mullet</li>
                                        <li onClick={() => selectBottom("skirt", "slit")}>Slit</li>
                                        <li onClick={() => selectBottom("skirt", "asymetrical_skirt")}>Asymetrical</li>
                                        <li onClick={() => selectBottom("skirt", "pleated")}>Pleated</li>
                                        <li onClick={() => selectBottom("skirt", "circle")}>Circle</li>
                                        <li onClick={() => selectBottom("skirt", "wrapped")}>Wrapped</li>
                                        <li onClick={() => selectBottom("skirt", "princess")}>Princess</li>
                                        <li onClick={() => selectBottom("skirt", "gypsy")}>Gypsy</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                    <div id="live-preview">
                        <div className="preview-stack">

                            <img src="live_preview_empty.png" />

                            {design.bodice && (<img src={`/bodices/${design.bodice}.png`} />)}
                            {design.sleeves && (<img src={`/sleeves/${design.sleeves}.png`} />)}
                            {design.necklines && (<img src={`/necklines/${design.necklines}.png`} />)}
                            {design.bottom.style && (<img src={`/bottoms/${design.bottom.type}/${design.bottom.style}.png`} />)}
                        </div>
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