import React, { useState } from "react";
import "./create.css";

export function Create() {
    const [openMenus, setOpenMenus] = useState({
        bodice: false,
        necklines: false,
        sleeves: false,
        bottoms: false,
        pants: false,
        skirts: false,
    });
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
        setOpenMenus(prev => ({...prev, [menuName]: !prev[menuName],}));
    }

    function selectOption(category, value) {
        setDesign({...design, [category]: value,});
        setOpenMenus({
            bodice: false,
            necklines: false,
            sleeves: false,
            bottoms: false,
            pants: false,
            skirts: false,
        });
    }

    function selectBottom(type, style) {
        setDesign({...design, bottom: { type, style }});
        setOpenMenus({
            bodice: false,
            necklines: false,
            sleeves: false,
            bottoms: false,
            pants: false,
            skirts: false,
        });
    }

    return (
        <main>
            <h3 className="heading" id="description-header">Create a New Design</h3>
            <div id="design-tools">
                <div id="clothing-select">
                    <ul className="menu">
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("bodice")}>Bodice Type <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenus.bodice ? "show" : ""}`}>
                                <li onClick={() => selectOption("bodice", "loose")}>Loose</li>
                                <li onClick={() => selectOption("bodice", "fitted")}>Form Fitting</li>
                                <li onClick={() => selectOption("bodice", "gathered")}>Gathered</li>
                                <li onClick={() => selectOption("bodice", "boned")}>Boned</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("necklines")}>Necklines <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenus.necklines ? "show" : ""}`}>
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
                            <ul className={`dropdown-menu ${openMenus.sleeves ? "show" : ""}`}>
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
                            <ul className={`dropdown-menu ${openMenus.bottoms ? "show" : ""}`}>
                                <li className="dropdown">
                                    <button className="dropdown-btn" onClick={() => toggleMenu("pants")}>Pants <span className="arrow">▼</span></button>
                                    <ul className={`dropdown-menu ${openMenus.pants ? "show" : ""}`}>
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
                                    <ul className={`dropdown-menu ${openMenus.skirts ? "show" : ""}`}>
                                        <li onClick={() => selectBottom("skirts", "mini")}>Mini</li>
                                        <li onClick={() => selectBottom("skirts", "midi")}>Midi</li>
                                        <li onClick={() => selectBottom("skirts", "maxi")}>Maxi</li>
                                        <li onClick={() => selectBottom("skirts", "pencil")}>Pencil</li>
                                        <li onClick={() => selectBottom("skirts", "tutu")}>Tutu</li>
                                        <li onClick={() => selectBottom("skirts", "mermaid")}>Mermaid</li>
                                        <li onClick={() => selectBottom("skirts", "layered_skirt")}>Layered</li>
                                        <li onClick={() => selectBottom("skirts", "mullet")}>Mullet</li>
                                        <li onClick={() => selectBottom("skirts", "slit")}>Slit</li>
                                        <li onClick={() => selectBottom("skirts", "asymetrical_skirt")}>Asymetrical</li>
                                        <li onClick={() => selectBottom("skirts", "pleated")}>Pleated</li>
                                        <li onClick={() => selectBottom("skirts", "circle")}>Circle</li>
                                        <li onClick={() => selectBottom("skirts", "wrapped")}>Wrapped</li>
                                        <li onClick={() => selectBottom("skirts", "princess")}>Princess</li>
                                        <li onClick={() => selectBottom("skirts", "gypsy")}>Gypsy</li>
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
                    <button id="dark-red" onClick={() => setDesign({...design, color: "dark-red"})}></button>
                    <button id="burgundy" onClick={() => setDesign({...design, color: "burgundy"})}></button>
                    <button id="red"  onClick={() => setDesign({...design, color: "red"})}></button>
                    <button id="red-orange"  onClick={() => setDesign({...design, color: "red-orange"})}></button>
                    <button id="orange"  onClick={() => setDesign({...design, color: "orange"})}></button>
                    <button id="gold" onClick={() => setDesign({...design, color: "gold"})}></button>
                    <button id="yellow" onClick={() => setDesign({...design, color: "yellow"})}></button>
                    <button id="light-green" onClick={() => setDesign({...design, color: "light-green"})}></button>
                    <button id="green" onClick={() => setDesign({...design, color: "green"})}></button>
                    <button id="dark-green" onClick={() => setDesign({...design, color: "dark-green"})}></button>
                    <button id="olive" onClick={() => setDesign({...design, color: "olive"})}></button>
                    <button id="mint" onClick={() => setDesign({...design, color: "mint"})}></button>
                    <button id="teal" onClick={() => setDesign({...design, color: "teal"})}></button>
                    <button id="dark-teal" onClick={() => setDesign({...design, color: "dark-teal"})}></button>
                    <button id="light-blue" onClick={() => setDesign({...design, color: "light-blue"})}></button>
                    <button id="blue" onClick={() => setDesign({...design, color: "blue"})}></button>
                    <button id="dark-blue" onClick={() => setDesign({...design, color: "dark-blue"})}></button>
                    <button id="indigo" onClick={() => setDesign({...design, color: "indigo"})}></button>
                    <button id="periwinkle" onClick={() => setDesign({...design, color: "periwinkle"})}></button>
                    <button id="lavender" onClick={() => setDesign({...design, color: "lavender"})}></button>
                    <button id="purple" onClick={() => setDesign({...design, color: "purple"})}></button>
                    <button id="dark-purple" onClick={() => setDesign({...design, color: "dark-purple"})}></button>
                    <button id="plum" onClick={() => setDesign({...design, color: "plum"})}></button>
                    <button id="berry" onClick={() => setDesign({...design, color: "berry"})}></button>
                    <button id="salmon" onClick={() => setDesign({...design, color: "salmon"})}></button>
                    <button id="magenta" onClick={() => setDesign({...design, color: "magenta"})}></button>
                    <button id="pink" onClick={() => setDesign({...design, color: "pink"})}></button>
                    <button id="light-pink" onClick={() => setDesign({...design, color: "light-pink"})}></button>
                    <button id="dark-brown" onClick={() => setDesign({...design, color: "dark-brown"})}></button>
                    <button id="brown" onClick={() => setDesign({...design, color: "brown"})}></button>
                    <button id="light-brown" onClick={() => setDesign({...design, color: "light-brown"})}></button>
                    <button id="eggshell" onClick={() => setDesign({...design, color: "eggshell"})}></button>
                    <button id="black" onClick={() => setDesign({...design, color: "black"})}></button>
                    <button id="grey" onClick={() => setDesign({...design, color: "grey"})}></button>
                    <button id="silver" onClick={() => setDesign({...design, color: "silver"})}></button>
                    <button id="white" onClick={() => setDesign({...design, color: "white"})}></button>
                </div>
            </div>
        </main>
    )
}