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
        setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName], }));
    }

    function selectOption(category, value) {
        setDesign({ ...design, [category]: value, });
        setOpenMenus({
            bodice: false,
            necklines: false,
            sleeves: false,
            bottoms: false,
            pants: false,
            skirts: false,
        });
    }

    function saveDesign() {
        fetch("/api/designs", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(design) // <-- changed here
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
                                <li onClick={() => selectOption("necklines", "square")}>square</li>
                                <li onClick={() => selectOption("necklines", "turtleneck")}>Turtleneck</li>
                                <li onClick={() => selectOption("necklines", "sweetheart")}>Sweetheart</li>
                                <li onClick={() => selectOption("necklines", "collared")}>Collared</li>
                                <li onClick={() => selectOption("necklines", "asymetrical_neckline")}>Asymetric</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn" onClick={() => toggleMenu("sleeves")}>Sleeves <span className="arrow">▼</span></button>
                            <ul className={`dropdown-menu ${openMenus.sleeves ? "show" : ""}`}>
                                <li onClick={() => selectOption("sleeves", "straps")}>Straps</li>
                                <li onClick={() => selectOption("sleeves", "off_shoulder")}>Off the Shoulder</li>
                                <li onClick={() => selectOption("sleeves", "short")}>Short</li>
                                <li onClick={() => selectOption("sleeves", "long")}>Long</li>
                                <li onClick={() => selectOption("sleeves", "elbow_length")}>Elbow-Length</li>
                                <li onClick={() => selectOption("sleeves", "puffed")}>Puffed</li>
                                <li onClick={() => selectOption("sleeves", "juliet")}>Juliet</li>
                                <li onClick={() => selectOption("sleeves", "bishop")}>Bishop</li>
                                <li onClick={() => selectOption("sleeves", "flounce")}>Flounce</li>
                                <li onClick={() => selectOption("sleeves", "bell")}>Bell</li>
                                <li onClick={() => selectOption("sleeves", "layered_sleeves")}>Layered</li>
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
                                        <li onClick={() => selectBottom("skirts", "circle")}>Circle</li>
                                        <li onClick={() => selectBottom("skirts", "wrapped")}>Wrapped</li>
                                        <li onClick={() => selectBottom("skirts", "princess")}>Princess</li>
                                        <li onClick={() => selectBottom("skirts", "tattered")}>Tattered</li>
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