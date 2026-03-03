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
        colors: {
            bodice: "",
            necklines: "",
            sleeves: "",
            bottom: "",
        }
    });

    const[selectedClothing, setSelectedClothing] = useState("bodice");

    function toggleMenu(menuName) {
        setOpenMenus(prev => ({...prev, [menuName]: !prev[menuName],}));
    }

    function selectOption(category, value) {
        setDesign(prev => ({...prev, [category]: value,}));
        setSelectedClothing(category);
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
        setDesign(prev => ({...prev, bottom: { type, style }}));
        setSelectedClothing("bottom");
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

                            {design.bodice && (
                                <div className="clothing-wrapper">
                                    <img className="clothing-base" src={`/bodices/${design.bodice}.png`} />
                                    <div className="clothing-color" style={{ backgroundColor: design.colors.bodice }}></div> 
                                </div>
                            )}
                            {design.sleeves && (
                                <div className="clothing-wrapper">
                                    <img className="clothing-base" src={`/sleeves/${design.sleeves}.png`} />
                                    <div className="clothing-color" style={{ backgroundColor: design.colors.sleeves }}></div> 
                                </div>
                            )}
                            {design.necklines && (
                                <div className="clothing-wrapper">
                                    <img className="clothing-base" src={`/necklines/${design.necklines}.png`} />
                                    <div className="clothing-color" style={{ backgroundColor: design.colors.necklines }}></div> 
                                </div>
                            )}
                            {design.bottom.style && (
                                <div className="clothing-wrapper">
                                    <img className="clothing-base" src={`/bottoms/${design.bottom.type}/${design.bottom.style}.png`} />
                                    <div className="clothing-color" style={{ backgroundColor: design.colors.bottom }}></div> 
                                </div>
                            )}
                        </div>
                    </div>
            </div>
            <div className="color-select">
                <label id="color-label">Colors:</label>
                <div className="colors">
                    <button id="dark-red" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#590303"}}))}></button>
                    <button id="burgundy" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#830A22"}}))}></button>
                    <button id="red"  onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#E20000"}}))}></button>
                    <button id="red-orange"  onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#FF552E"}}))}></button>
                    <button id="orange"  onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#FF7C19"}}))}></button>
                    <button id="gold" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#FFC235"}}))}></button>
                    <button id="yellow" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#FFF875"}}))}></button>
                    <button id="light-green" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#79FF65"}}))}></button>
                    <button id="green" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#009B15"}}))}></button>
                    <button id="dark-green" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#004315"}}))}></button>
                    <button id="olive" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#3C5920"}}))}></button>
                    <button id="mint" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#58ffae"}}))}></button>
                    <button id="teal" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#49ffd7"}}))}></button>
                    <button id="dark-teal" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#00776B"}}))}></button>
                    <button id="light-blue" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#4aedff"}}))}></button>
                    <button id="blue" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#3c4dea"}}))}></button>
                    <button id="dark-blue" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#090069"}}))}></button>
                    <button id="indigo" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "indigo"}}))}></button>
                    <button id="periwinkle" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#D2CAFF"}}))}></button>
                    <button id="lavender" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#F3CCFF"}}))}></button>
                    <button id="purple" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "rgb(173, 0, 173)"}}))}></button>
                    <button id="dark-purple" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#50005b"}}))}></button>
                    <button id="plum" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#a00777"}}))}></button>
                    <button id="berry" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#B52B62"}}))}></button>
                    <button id="salmon" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#fc8787"}}))}></button>
                    <button id="magenta" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#FA2669"}}))}></button>
                    <button id="pink" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#ff0dae"}}))}></button>
                    <button id="light-pink" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#ffa1c6"}}))}></button>
                    <button id="dark-brown" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#352200"}}))}></button>
                    <button id="brown" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#682E0A"}}))}></button>
                    <button id="light-brown" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#CD8B62"}}))}></button>
                    <button id="eggshell" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#fce0d7"}}))}></button>
                    <button id="black" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#010010"}}))}></button>
                    <button id="grey" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#585858"}}))}></button>
                    <button id="silver" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#C8C8C8"}}))}></button>
                    <button id="white" onClick={() => setDesign(prev => ({...prev, colors: {...prev.colors, [selectedClothing]: "#F5F5F5"}}))}></button>
                </div>
            </div>
        </main>
    )
}