import React from "react";
import "./create.css";

export function Create() {
    return (
        <main>
            <h3 className="heading" id="description-header">Create a New Design</h3>
            <div id="design-tools">
                <div id="clothing-select">
                    <ul className="menu">
                        <li className="dropdown">
                            <button className="dropdown-btn">Bodice Type <span className="arrow">▼</span></button>
                            <ul className="dropdown-menu">
                                <li>Loose</li>
                                <li>Form Fitting</li>
                                <li>Gathered</li>
                                <li>Boned</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn">Necklines <span className="arrow">▼</span></button>
                            <ul className="dropdown-menu">
                                <li>Crew</li>
                                <li>V-Neck</li>
                                <li>Square</li>
                                <li>Turtleneck</li>
                                <li>Sweetheart</li>
                                <li>Collared</li>
                                <li>Asymetric</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn">Sleeves <span className="arrow">▼</span></button>
                            <ul className="dropdown-menu">
                                <li>None</li>
                                <li>Straps</li>
                                <li>Off the Shoulder</li>
                                <li>Short</li>
                                <li>Long</li>
                                <li>Elbow-Length</li>
                                <li>Puffed</li>
                                <li>Juliet</li>
                                <li>Bishops</li>
                                <li>Flounce</li>
                                <li>Bell</li>
                                <li>Layered</li>
                                <li>Kimono</li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <button className="dropdown-btn">Bottoms <span className="arrow">▼</span></button>
                            <ul className="dropdown-menu">
                                <li className="dropdown">
                                    <button className="dropdown-btn">Pants <span className="arrow">▼</span></button>
                                    <ul className="dropdown-menu">
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
                                    <button className="dropdown-btn">Skirts <span className="arrow">▼</span></button>
                                    <ul className="dropdown-menu">
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
                        <img src="preview_placeholder.jpg" alt="Example of what the live preview could look like." />
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