import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../login/authState";
import "./profile.css"

export function Profile({ authState }) {
    const [designs, setDesigns] = useState([]);
    const [profilePic, setProfilePic] = useState("default_profile2.0.jpg");

    const navigate = useNavigate();

    useEffect(() => {
        if (authState !== AuthState.Authenticated) {
            navigate("/");
        }
    }, [authState, navigate]);

    useEffect(() => {
        async function loadProfile() {
            const res = await fetch("/api/profile", {
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                setProfilePic(data.profilePic);
            }
        }

        if (authState === AuthState.Authenticated) {
            loadProfile();
        }
    }, [authState]);

    useEffect(() => {
        if (authState === AuthState.Authenticated) {
            fetch("/api/designs", {
                credentials: "include"
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch designs");
                    return res.json();
                })
                .then(data => setDesigns(data))
                .catch(err => console.error(err));
        }
    }, [authState]);

    async function renameDesign(id, currentName) {
        const newName = prompt("Enter a new design name:", currentName);

        if (!newName || !newName.trim()) return;

        const res = await fetch(`/api/designs/${id}/name`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name: newName.trim() })
        });

        if (res.ok) {
            setDesigns(prev =>
                prev.map(design =>
                    design.id === id ? { ...design, name: newName.trim() } : design
                )
            );
        }
    }

    function deleteDesign(id) {
        fetch(`/api/designs/${id}`, {
            method: 'DELETE',
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to delete design");
                setDesigns(prev => prev.filter(design => design.id !== id));
            })
            .catch(err => console.error(err));
    }

    async function changeProfilePic() {
        const newPic = prompt("Enter image url to change profile picture: ", profilePic);
        if (newPic && newPic.startsWith("http")) {
            const res = await fetch("/api/profile/pic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ profilePic: newPic })
            });

            if (res.ok) {
                setProfilePic(newPic);
            }
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
                        <label>{item.name || "Untitled Design"}</label>
                        <button className="delete-btn" onClick={() => renameDesign(item.id, item.name)}>Rename</button>
                        <button className="delete-btn" onClick={() => deleteDesign(item.id)}>Delete</button>
                        <div className="preview-stack">
                            <img src="live_preview_empty.png" />

                            {item.design.bodice && (
                                <img src={`/bodices/${item.design.bodice}${item.design.color ? `/${item.design.bodice}_${item.design.color}.png` : `/${item.design.bodice}.png`}`} />
                            )}

                            {item.design.sleeves && (
                                <img src={`/sleeves/${item.design.sleeves}${item.design.color ? `/${item.design.sleeves}_${item.design.color}.png` : `/${item.design.sleeves}.png`}`} />
                            )}

                            {item.design.necklines && (
                                <img src={`/necklines/${item.design.necklines}${item.design.color ? `/${item.design.necklines}_${item.design.color}.png` : `/${item.design.necklines}.png`}`} />
                            )}

                            {item.design?.bottom?.style && (
                                <img src={`/bottoms/${item.design.bottom.type}/${item.design.bottom.style}${item.design.color ? `/${item.design.bottom.style}_${item.design.color}.png` : `/${item.design.bottom.style}.png`}`} />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
}
