import React from "react";

export function Profile() {
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
                <li className="col-12 col-sm-6 col-md-4">
                    <label for="design">design_1</label>
                    <img src="default_design.jpg" alt="default design preview" />
                </li>
                <li className="col-12 col-sm-6 col-md-4">
                    <label for="design">design_2</label>
                    <img src="default_design.jpg" alt="default design preview" />
                </li>
                <li className="col-12 col-sm-6 col-md-4">
                    <label for="design">design_3</label>
                    <img src="default_design.jpg" alt="default design preview" />
                </li>
                <li className="col-12 col-sm-6 col-md-4">
                    <label for="design">design_4</label>
                    <img src="default_design.jpg" alt="default design preview" />
                </li>
                <li className="col-12 col-sm-6 col-md-4">
                    <label for="design">design_5</label>
                    <img src="default_design.jpg" alt="default design preview" />
                </li>
                <li className="col-12 col-sm-6 col-md-4">
                    <label for="design">design_6</label>
                    <img src="default_design.jpg" alt="default design preview" />
                </li>
            </ul>
        </main>
    )
}