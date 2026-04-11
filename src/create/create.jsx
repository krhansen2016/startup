import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../login/authState";
import "./create.css";

export function Create({ authState }) {
    const [designs, setDesigns] = useState([]);
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

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Authenticated) {
            fetch("/api/designs", { credentials: 'include' })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch designs");
                    return res.json();
                })
                .then(data => setDesigns(data))
                .catch(err => console.error(err));
        }
    }, [authState]);

    useEffect(() => {
        if (authState !== AuthState.Authenticated) {
            navigate("/");
        }
    }, [authState, navigate]);

    function selectColor(color) {
        setDesign(prev => ({ ...prev, color }));
    }

    function toggleMenu(menuName) {
        setOpenMenus(prev => {
            const isOpen = prev[menuName];
            if (isOpen) {
                return { ...prev, [menuName]:false, };
            }

            const closedMenus = {
                bodice: false,
                necklines: false,
                sleeves: false,
                bottoms: false,
                pants: false,
                skirts: false
            };

            if (menuName === "pants" || menuName == "skirts") {
                return { ...closedMenus, bottoms: true, [menuName]: true };
            }

            return {
                ...closedMenus, [menuName]: true,
            };
        });
    }

    function selectOption(category, value) {
        setDesign({ ...design, [category]: value, });
    }

    function saveDesign() {
        fetch("/api/designs", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(design)
        })
            .then(res => res.json())
            .then(saved => {
                alert("Design saved!");
                setDesigns(prev => [saved, ...prev]);
                setDesign({ bodice: "", necklines: "", sleeves: "", bottom: { type: "", style: "" }, color: "" });
            })
            .catch(err => console.error(err));
    }

    function selectBottom(type, style) {
        setDesign({ ...design, bottom: { type, style } });
    }

    return (
        <main>
            <h3 className="heading" id="description-header">Create a New Design</h3>
            <div id="design-tools">
                <div id="clothing-select">
                    <ul className="menu">
                        <li className="design-dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("bodice")}>Bodice Type <span className="arrow">{openMenus.bodice ? "▲" : "▼"}</span></button>
                            <ul className={`design-dropdown-menu ${openMenus.bodice ? "show" : ""}`}>
                                <li className={design.bodice === "loose" ? "selected-option" : ""} onClick={() => selectOption("bodice", "loose")}>Loose</li>
                                <li className={design.bodice === "fitted" ? "selected-option" : ""} onClick={() => selectOption("bodice", "fitted")}>Form Fitting</li>
                                <li className={design.bodice === "gathered" ? "selected-option" : ""} onClick={() => selectOption("bodice", "gathered")}>Gathered</li>
                                <li className={design.bodice === "boned" ? "selected-option" : ""} onClick={() => selectOption("bodice", "boned")}>Corset</li>
                            </ul>
                        </li>
                        <li className="design-dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("necklines")}>Necklines <span className="arrow">{openMenus.necklines ? "▲" : "▼"}</span></button>
                            <ul className={`design-dropdown-menu ${openMenus.necklines ? "show" : ""}`}>
                                <li className={design.necklines === "crew" ? "selected-option" : ""} onClick={() => selectOption("necklines", "crew")}>Crew</li>
                                <li className={design.necklines === "vneck" ? "selected-option" : ""} onClick={() => selectOption("necklines", "vneck")}>V-Neck</li>
                                <li className={design.necklines === "square" ? "selected-option" : ""} onClick={() => selectOption("necklines", "square")}>square</li>
                                <li className={design.necklines === "turtleneck" ? "selected-option" : ""} onClick={() => selectOption("necklines", "turtleneck")}>Turtleneck</li>
                                <li className={design.necklines === "sweetheart" ? "selected-option" : ""} onClick={() => selectOption("necklines", "sweetheart")}>Sweetheart</li>
                                <li className={design.necklines === "collared" ? "selected-option" : ""} onClick={() => selectOption("necklines", "collared")}>Collared</li>
                                <li className={design.necklines === "asymetrical_neckline" ? "selected-option" : ""} onClick={() => selectOption("necklines", "asymetrical_neckline")}>Asymetric</li>
                            </ul>
                        </li>
                        <li className="design-dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("sleeves")}>Sleeves <span className="arrow">{openMenus.sleeves ? "▲" : "▼"}</span></button>
                            <ul className={`design-dropdown-menu ${openMenus.sleeves ? "show" : ""}`}>
                                <li className={design.sleeves === "straps" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "straps")}>Straps</li>
                                <li className={design.sleeves === "off_shoulder" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "off_shoulder")}>Off the Shoulder</li>
                                <li className={design.sleeves === "short" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "short")}>Short</li>
                                <li className={design.sleeves === "long" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "long")}>Long</li>
                                <li className={design.sleeves === "elbow_length" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "elbow_length")}>Elbow-Length</li>
                                <li className={design.sleeves === "puffed" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "puffed")}>Puffed</li>
                                <li className={design.sleeves === "juliet" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "juliet")}>Juliet</li>
                                <li className={design.sleeves === "bishop" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "bishop")}>Bishop</li>
                                <li className={design.sleeves === "flounce" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "flounce")}>Flounce</li>
                                <li className={design.sleeves === "bell" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "bell")}>Bell</li>
                                <li className={design.sleeves === "layered_sleeves" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "layered_sleeves")}>Layered</li>
                                <li className={design.sleeves === "kimono" ? "selected-option" : ""} onClick={() => selectOption("sleeves", "kimono")}>Kimono</li>
                            </ul>
                        </li>
                        <li className="design-dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("bottoms")}>Bottoms <span className="arrow">{openMenus.bottoms ? "▲" : "▼"}</span></button>
                            <ul className={`design-dropdown-menu ${openMenus.bottoms ? "show" : ""}`}>
                                <li className="design-dropdown">
                                    <button className="dropdown-btn" onClick={() => toggleMenu("pants")}>Pants <span className="arrow">{openMenus.pants ? "▲" : "▼"}</span></button>
                                    <ul className={`design-dropdown-menu ${openMenus.pants ? "show" : ""}`}>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "shorts" ? "selected-option" : ""} onClick={() => selectBottom("pants", "shorts")}>Shorts</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "capris" ? "selected-option" : ""} onClick={() => selectBottom("pants", "capris")}>Capris</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "straight" ? "selected-option" : ""} onClick={() => selectBottom("pants", "straight")}>Straight</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "skinny" ? "selected-option" : ""} onClick={() => selectBottom("pants", "skinny")}>Skinny</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "bootcut" ? "selected-option" : ""} onClick={() => selectBottom("pants", "bootcut")}>Bootcut</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "flare" ? "selected-option" : ""} onClick={() => selectBottom("pants", "flare")}>Flare</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "wide" ? "selected-option" : ""} onClick={() => selectBottom("pants", "wide")}>Wide</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "cargo" ? "selected-option" : ""} onClick={() => selectBottom("pants", "cargo")}>Cargo</li>
                                        <li className={design.bottom.type === "pants" && design.bottom.style === "sweatpants" ? "selected-option" : ""} onClick={() => selectBottom("pants", "sweatpants")}>Sweatpants</li>
                                    </ul>
                                </li>
                                <li className="design-dropdown">
                                    <button className="dropdown-btn" onClick={() => toggleMenu("skirts")}>Skirts <span className="arrow">{openMenus.skirts ? "▲" : "▼"}</span></button>
                                    <ul className={`design-dropdown-menu ${openMenus.skirts ? "show" : ""}`}>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "mini" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "mini")}>Mini</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "midi" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "midi")}>Midi</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "maxi" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "maxi")}>Maxi</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "pencil" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "pencil")}>Pencil</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "tutu" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "tutu")}>Tutu</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "mermaid" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "mermaid")}>Mermaid</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "layered_skirt" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "layered_skirt")}>Layered</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "mullet" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "mullet")}>Mullet</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "slit" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "slit")}>Slit</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "asymetrical_skirt" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "asymetrical_skirt")}>Asymetrical</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "circle" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "circle")}>Circle</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "wrapped" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "wrapped")}>Wrapped</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "princess" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "princess")}>Princess</li>
                                        <li className={design.bottom.type === "skirts" && design.bottom.style === "tattered" ? "selected-option" : ""} onClick={() => selectBottom("skirts", "tattered")}>Tattered</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="live-preview">
                    <div className="preview-stack">

                        <img src="live_preview_empty.png" />

                        {design.bodice && (<img src={`/bodices/${design.bodice}${design.color ? `/${design.bodice}_${design.color}.png` : `/${design.bodice}.png`}`} alt="bodice" />)}
                        {design.sleeves && (<img src={`/sleeves/${design.sleeves}${design.color ? `/${design.sleeves}_${design.color}.png` : `/${design.sleeves}.png`}`} alt="sleeves" />)}
                        {design.necklines && (<img src={`/necklines/${design.necklines}${design.color ? `/${design.necklines}_${design.color}.png` : `/${design.necklines}.png`}`} alt="necklines" />)}
                        {design.bottom.style && (<img src={`/bottoms/${design.bottom.type}/${design.bottom.style}${design.color ? `/${design.bottom.style}_${design.color}.png` : `/${design.bottom.style}.png`}`} alt="bottom" />)}
                    </div>
                </div>
            </div>
            <div className="color-select">
                <label id="color-label">Colors:</label>
                <div className="colors">
                    <button id="dark-red" onClick={() => selectColor("dark-red")}></button>
                    <button id="red-orange" onClick={() => selectColor("red-orange")}></button>
                    <button id="yellow" onClick={() => selectColor("yellow")}></button>
                    <button id="olive" onClick={() => selectColor("olive")}></button>
                    <button id="blue" onClick={() => selectColor("blue")}></button>
                    <button id="dark-purple" onClick={() => selectColor("dark-purple")}></button>
                    <button id="light-pink" onClick={() => selectColor("light-pink")}></button>
                    <button id="light-brown" onClick={() => selectColor("light-brown")}></button>
                </div>
            </div>
            <div className="save-design">
                <button onClick={saveDesign} className="save-btn">Save Design</button>
            </div>
        </main>
    )
}
