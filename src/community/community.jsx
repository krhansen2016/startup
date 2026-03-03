import React, { useEffect, useState } from "react";
import "./community.css";
import { Placeholder } from "react-bootstrap";


export function Community() {

    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");

    function addPost() {
    const newPost = {
        username: localStorage.getItem("userName") || "Guest",
        text,
        image: "default_design.jpg",
        profilePic: "default_profile2.0.jpg"
    };

    const updatedPosts = [newPost, ...posts];

    setPosts(updatedPosts);
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));

    setText("");
}

    useEffect(() => {
        const storedPosts = localStorage.getItem("communityPosts");

        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
        else {
            const mockPosts = [
                {
                username: "DesignQueen",
                text: "My newest outfit!",
                image: "default_design.jpg",
                profilePic: "default_profile2.0.jpg"
            },
            {
                username: "ThreadMaster",
                text: "Trying a new style today.",
                image: "default_design.jpg",
                profilePic: "default_profile2.0.jpg"
            }
            ];

            setPosts(mockPosts);
            localStorage.setItem("communityPosts", JSON.stringify(mockPosts));
        }
    }, []);

    return (
        <main>
            <h2 className="heading" id="description-header">The Community</h2>
            <div className="new-post">
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Make a community post..." />
                <button onClick={addPost}>Post</button>
            </div>
            <div className="posts">
                <ul>
                    {posts.map((post, index) => (
                        <li key={index}>
                            <img className="profile-pic" src="{post.profilePic" alt="profile" />
                            <label>{post.username}</label>
                            <div className="post-content">
                                <img className="post-pic" src={post.image} alt="design" />
                                <p>{post.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}