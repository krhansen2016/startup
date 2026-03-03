import React, { useEffect, useState } from "react";
import "./community.css";

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

    const updatedPosts = [newPost, ...posts].slice(0, 10);

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

    useEffect(() => {
        const interval = setInterval(() => {
            const randomUser = "User-" + Math.floor(Math.random() * 100);

            const randomMessages = [
                "What do you think?",
                "Felt cute, might delete later",
                "I'm absolutely obsessed with this!",
                "Trying something new!"
            ];

            const newPost = {
                username: randomUser,
                text: randomMessages[ Math.floor(Math.random() * randomMessages.length)],
                image: "default_design.jpg",
                profilePic: "default_profile2.0.jpg"
            };

            setPosts(prevPosts => {
                const updated = [newPost, ...prevPosts].slice(0, 10);

                localStorage.setItem("communityPosts", JSON.stringify(updated));
                return updated;
            });
        }, 5000);
        return () => clearInterval(interval);
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
                    {posts.slice(0, 10).map((post, index) => (
                        <li key={index}>
                            <img className="profile-pic" src={post.profilePic} alt="profile" />
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