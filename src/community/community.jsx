import React from "react";
import "./community.css";


export function Community() {
    return (
        <main>
            <h2 className="heading" id="description-header">The Community</h2>
            <div className="posts">
                <ul>
                    <li>
                        <img className="profile-pic" src="default_profile2.0.jpg" alt="Default Profile Pic" />
                        <label>Username</label>
                        <div className="post-content">
                            <img className="post-pic" src="default_design.jpg" alt="default design preview" />
                            <p>Text here...</p>
                        </div>
                    </li>
                    <li>
                        <img className="profile-pic" src="default_profile2.0.jpg" alt="Default Profile Pic" />
                        <label>Username</label>
                        <div className="post-content">
                            <img className="post-pic" src="default_design.jpg" alt="default design preview" />
                            <p>Text here...</p>
                        </div>
                    </li>
                    <li>
                        <img className="profile-pic" src="default_profile2.0.jpg" alt="Default Profile Pic" />
                        <label>Username</label>
                        <div className="post-content">
                            <img className="post-pic" src="default_design.jpg" alt="default design preview" />
                            <p>Text here...</p>
                        </div>
                    </li>
                    <li>
                        <img className="profile-pic" src="default_profile2.0.jpg" alt="Default Profile Pic" />
                        <label>Username</label>
                        <div className="post-content">
                            <img className="post-pic" src="default_design.jpg" alt="default design preview" />
                            <p>Text here...</p>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    )
}