import React, { useEffect, useState } from "react";
import "./profile.css"

export function Profile() {
    const [designs, setDesigns] = useState([]);
    const [profilePic, setProfilePic] = useState("default_profile2.0.jpg");

    useEffect(() => {
        const savedPic = localStorage.getItem("profilePic");
        if (savedPic) setProfilePic(savedPic)
    }, []);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("userDesigns")) || [];
        setDesigns(saved);
    }, []);

    function deleteDesign(id) {
        const updatedDesigns = designs.filter(design => design.id !== id);
        setDesigns(updatedDesigns);
        localStorage.setItem("userDesigns", JSON.stringify(updatedDesigns));
    }

    function changeProfilePic() {
        const newPic = prompt("Enter image url to change profile picture: ", profilePic);
        if (newPic) {
            setProfilePic(newPic);
            localStorage.setItem("profilePic", newPic);
        }
    }

    return (
        <main className="container-lg">
            <h3 className="heading" id="description-header">My Profile</h3>
            <div className="profile">
                <div className="profile-img-wrapper">
                    <img id="profile-img" src={profilePic} alt="Profile Picture" />
                    <button id="edit-btn" onClick={changeProfilePic}>
                        <img src="edit_profilepic.PNG" alt="Change Profile Picture" />
                    </button>
                </div>
            </div>
            <h3 className="heading" id="description-header">My Designs</h3>
            <ul className="designs row g-4">
                {designs.map((item) => (
                    <li key={item.id} className="col-12 col-sm-6 col-md-4">
                        <label>Design</label>
                        <button className="delete-btn" onClick={() => deleteDesign(item.id)}>Delete</button>
                        <div className="preview-stack">
    <img src="live_preview_empty.png" />

    {item.design.bodice && (
        <img src={`/bodices/${item.design.bodice}${item.design.color? `/${item.design.bodice}_${item.design.color}.png`: `/${item.design.bodice}.png`}`}/>
    )}

    {item.design.sleeves && (
        <img src={`/sleeves/${item.design.sleeves}${
                item.design.color ? `/${item.design.sleeves}_${item.design.color}.png`: `/${item.design.sleeves}.png`}`} />
    )}

    {item.design.necklines && (
        <img src={`/necklines/${item.design.necklines}${item.design.color ? `/${item.design.necklines}_${item.design.color}.png`: `/${item.design.necklines}.png` }`} />
    )}

    {item.design.bottom.style && (
        <img src={`/bottoms/${item.design.bottom.type}/${item.design.bottom.style}${item.design.color ? `/${item.design.bottom.style}_${item.design.color}.png`: `/${item.design.bottom.style}.png`}`} />
    )}
</div>
                    </li>
                ))}
            </ul>
        </main>
    )
}