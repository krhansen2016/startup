import React, { useEffect, useState } from "react";
import "./profile.css"

export function Profile() {
    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("userDesigns")) || [];
        setDesigns(saved);
    }, []);

    return (
        <main className="container-lg">
            <h3 className="heading" id="description-header">My Profile</h3>
            <div className="profile">
                <div className="profile-img-wrapper">
                    <img id="profile-img" src="default_profile2.0.jpg" alt="Default of the profile picture." />
                    <button id="edit-btn"><img src="edit_profilepic.PNG" alt="Change Profile Picture" /></button>
                </div>
            </div>
            <h3 className="heading" id="description-header">My Designs</h3>
            <ul className="designs row g-4">
                {designs.map((item) => (
                    <li key={item.id} className="col-12 col-sm-6 col-md-4">
                        <label>Design</label>
                        <div className="preview-stack">
                            <img src="live_preview_empty.png" />
                            {item.design.bodice && (<img src={`/bodices/${item.design.bodice}.png`}/>)}
                            {item.design.sleeves && (<img src={`/sleeves/${item.design.sleeves}.png`}/>)}
                            {item.design.necklines && (<img src={`/necklines/${item.design.necklines}.png`}/>)}
                            {item.design.bottom.style && (<img src={`/bottoms/${item.design.bottom.type}/${item.design.bottom.style}.png`}/>)}
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
}