import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../login/authState";
import "./community.css";
import { communityNotifier } from "./communityNotifier";

export function Community({ authState }) {

    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const [userDesigns, setUserDesigns] = useState([]);
    const [selectedDesign, setSelectedDesign] = useState(null);
    const [emojiGroups, setEmojiGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [emojis, setEmojis] = useState([]);
    const [profile, setProfile] = useState(null);
    const [openReactionPostId, setOpenReactionPostId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        function handleMessage(event) {
            if (event.type == "postCreated") {
                setPosts((currentPosts) => {
                    const alreadyExists = currentPosts.some((post) => post.id === event.value.id);
                    if (alreadyExists) return currentPosts;
                    return [event.value, ...currentPosts];
                });
            }
        }

        communityNotifier.addHandler(handleMessage);

        return () => {
            communityNotifier.removeHandler(handleMessage);
        };
    }, []);

    useEffect(() => {
        if (authState !== AuthState.Authenticated) {
            navigate("/");
        }
    }, [authState, navigate]);

    useEffect(() => {
        async function loadUserDesigns() {
            try {
                const res = await fetch("/api/designs", { credentials: "include" });
                if (res.ok) {
                    const designs = await res.json();
                    setUserDesigns(designs);
                    if (designs.length > 0) setSelectedDesign(designs[0]);
                }
            } catch (err) {
                console.error("Failed to load user designs:", err);
            }
        }
        loadUserDesigns();
    }, [authState]);

    async function addReaction(postId, emoji) {
        try {
            const res = await fetch(`/api/posts/${postId}/reaction`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ emoji })
            });

            if (res.ok) {
                const updatedPost = await res.json();
                setPosts(prev =>
                    prev.map(p => p.id === updatedPost.id ? updatedPost : p)
                );
                setOpenReactionPostId(null);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetch("/api/profile", { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Failed profile fetch");
                return res.json();
            })
            .then(data => setProfile(data));
    }, []);

    async function addPost() {
        if (!selectedDesign) return alert("You must have at least one saved design!");

        const newPost = {
            username: profile?.email || "Guest",
            profilePic: profile?.profilePic || "default_profile2.0.jpg",
            design: selectedDesign.design,
            text,
            reactions: []
        };

        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                const updatedPosts = await response.json();
                setPosts(updatedPosts);
                setText("");
            } else {
                console.error("Failed to create post");
            }
        } catch (err) {
            console.error("Error creating post:", err);
        }
    }

    useEffect(() => {
        fetch("/api/emoji-groups", { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error("Failed emoji groups");
                return res.json();
            })
            .then(groups => {
                setEmojiGroups(groups);
                if (groups.length > 0) setSelectedGroup(groups[0]);
            });
    }, []);

    useEffect(() => {
        if (!selectedGroup) return;

        fetch(`/api/emojis/category/${selectedGroup}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setEmojis(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error(err);
                setEmojis([]);
            });
    }, [selectedGroup]);

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch('/api/posts', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    console.error("Failed to load posts");
                }
            } catch (err) {
                console.error("Error loading posts:", err);
            }
        }

        loadPosts();
    }, []);

    return (
        <main>
            <h2 className="heading" id="description-header">The Community</h2>
            <div className="new-post">
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Make a community post..." />
                <select value={selectedDesign?.id || ""} onChange={(e) => setSelectedDesign(userDesigns.find(d => d.id === e.target.value))}>
                    {userDesigns.map(d => (
                        <option key={d.id} value={d.id}>{`Design ${d.id}`}</option>
                    ))}
                </select>
                <div className="preview-stack">
                    <img src="live_preview_empty.png" />
                    {selectedDesign?.design.bodice && (<img src={`/bodices/${selectedDesign.design.bodice}${selectedDesign.design.color ? `/${selectedDesign.design.bodice}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.bodice}.png`}`} />)}
                    {selectedDesign?.design.sleeves && (<img src={`/sleeves/${selectedDesign.design.sleeves}${selectedDesign.design.color ? `/${selectedDesign.design.sleeves}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.sleeves}.png`}`} />)}
                    {selectedDesign?.design.necklines && (<img src={`/necklines/${selectedDesign.design.necklines}${selectedDesign.design.color ? `/${selectedDesign.design.necklines}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.necklines}.png`}`} />)}
                    {selectedDesign?.design.bottom.style && (<img src={`/bottoms/${selectedDesign.design.bottom.type}/${selectedDesign.design.bottom.style}${selectedDesign.design.color ? `/${selectedDesign.design.bottom.style}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.bottom.style}.png`}`} />)}
                </div>
                <button onClick={addPost}>Post</button>
            </div>
            <div className="posts">
                <ul>
                    {posts.slice(0, 10).map((post) => (
                        <li key={post.id} className="post">
                            <div className="post-header">
                                <img className="profile-pic" src={post.profilePic} alt="profile" />
                                <label>{post.username}</label>
                            </div>
                            <div className="post-content">
                                <div className="preview-stack">
                                    <img src="live_preview_empty.png" />
                                    {post.design?.bodice && (<img src={`/bodices/${post.design.bodice}${post.design.color ? `/${post.design.bodice}_${post.design.color}.png` : `/${post.design.bodice}.png`}`} alt="bodice" />)}
                                    {post.design?.sleeves && (<img src={`/sleeves/${post.design.sleeves}${post.design.color ? `/${post.design.sleeves}_${post.design.color}.png` : `/${post.design.sleeves}.png`}`} alt="sleeves" />)}
                                    {post.design?.necklines && (<img src={`/necklines/${post.design.necklines}${post.design.color ? `/${post.design.necklines}_${post.design.color}.png` : `/${post.design.necklines}.png`}`} alt="necklines" />)}
                                    {post.design?.bottom?.style && (<img src={`/bottoms/${post.design.bottom.type}/${post.design.bottom.style}${post.design.color ? `/${post.design.bottom.style}_${post.design.color}.png` : `/${post.design.bottom.style}.png`}`} alt="bottom" />)}
                                </div>
                                <div className="post-text">
                                    <p>{post.text}</p>
                                </div>

                                <div className="post-reactions">
                                    {post.reactions?.map((r, i) => (<button key={i} onClick={() => addReaction(post.id, r.emoji)} className="reaction-btn">{r.emoji} {r.count}</button>))}
                                    <div className="emoji-dropdown">
                                        <button
                                            className="emoji-button"
                                            type="button"
                                            onClick={() => setOpenReactionPostId((current) => current === post.id ? null : post.id)}
                                        >
                                            Reactions
                                        </button>
                                        <div className={`emoji-menu ${openReactionPostId === post.id ? "open" : ""}`}>
                                            {emojis.slice(0, 72).map(emoji => {
                                                const unicodeArray = Array.isArray(emoji.unicode)
                                                    ? emoji.unicode
                                                    : [emoji.unicode];

                                                const symbol = String.fromCodePoint(
                                                    ...unicodeArray.map(u => parseInt(u.replace("U+", ""), 16))
                                                );

                                                return (
                                                    <button
                                                        key={unicodeArray.join("-") || symbol}
                                                        className="emoji-item"
                                                        type="button"
                                                        onClick={() => addReaction(post.id, symbol)}
                                                    >
                                                        {symbol}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
