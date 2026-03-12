import React, { useEffect, useState } from "react";
import "./community.css";

export function Community() {

    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const userDesigns = JSON.parse(localStorage.getItem("userDesigns")) || [];
    const [selectedDesign, setSelectedDesign] = useState(userDesigns.length > 0 ? userDesigns[0] : null);

    const [emojiGroups, setEmojiGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [emojis, setEmojis] = useState([]);
    const [selectedEmoji, setSelectedEmoji] = useState("");

    function addPost() {
        if (!selectedDesign) return alert("You must have at least one saved design!");
        const newPost = {
            username: localStorage.getItem("userName") || "Guest",
            text: text + (selectedEmoji ? ` ${selectedEmoji}` : ""),
            design: selectedDesign.design,
            profilePic: localStorage.getItem("profilePic") || "default_profile2.0.jpg",
        };

        const updatedPosts = [newPost, ...posts].slice(0, 10);
        setPosts(updatedPosts);
        localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
        setText("");
        setSelectedEmoji("");
    }

    useEffect(() => {
        fetch("/api/emoji-groups").then(res => res.json()).then(groups => {
            setEmojiGroups(groups);
            setSelectedGroup(groups[0]);
        });
    }, []);

    useEffect(() => {
        if (!selectedGroup) return;
        fetch(`/api/emojis/group/${selectedGroup}`).then(res => res.json()).then(data => setEmojis(data)).catch(err => console.error(err));
    }, [selectedGroup]);

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
                text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
                image: "default_design.jpg",
                profilePic: "default_profile2.0.jpg"
            };

            setPosts(prevPosts => {
                const updated = [newPost, ...prevPosts].slice(0, 10);

                localStorage.setItem("communityPosts", JSON.stringify(updated));
                return updated;
            });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <h2 className="heading" id="description-header">The Community</h2>
            <div className="new-post">
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Make a community post..." />
                <div className="emoji-picker">
                    <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
                        {emojiGroups.map(group => (<option key={group} value={group}>{group}</option>))}
                    </select>
                    <select value={selectedEmoji} onChange={e => setSelectedEmoji(e.target.value)}>
                        <option value="">None</option>
                        {emojis.map(emoji => (<option key={emoji.unicode[0]} value={emoji.htmlCode[0]}>{emoji.name} {emoji.htmlCode[0]}</option>))}
                    </select>
                </div>
                <select value={selectedDesign?.id || ""} onChange={(e) => setSelectedDesign(userDesigns.find(d => d.id === Number(e.target.value)))}>
                    {userDesigns.map(d => (
                        <option key={d.id} value={d.id}>{`Design ${d.id}`}</option>
                    ))}
                </select>
                <div className="preview-stack">
                    <img src="live_preview_empty.png" />
                    {selectedDesign?.design.bodice && (<img src={`/bodices/${selectedDesign.design.bodice}${selectedDesign.design.color ? `/${selectedDesign.design.bodice}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.bodice}.png`}`} />)}
                    {selectedDesign?.design.sleeves && (<img src={`/sleeves/${selectedDesign.design.sleeves}${selectedDesign.design.color ? `/${selectedDesign.design.sleeves}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.sleeves}.png`}`} />)}
                    {selectedDesign?.design.necklines && (<img src={`/necklines/${selectedDesign.design.neckline}${selectedDesign.design.color ? `/${selectedDesign.design.neckline}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.neckline}.png`}`} />)}
                    {selectedDesign?.design.bottom.style && (<img src={`/bottoms/${selectedDesign.design.bottom.type}/${selectedDesign.design.bottom.style}${selectedDesign.design.color ? `/${selectedDesign.design.bottom.style}_${selectedDesign.design.color}.png` : `/${selectedDesign.design.bottom.style}.png`}`} />)}
                </div>
                <button onClick={addPost}>Post</button>
            </div>
            <div className="posts">
                <ul>
                    {posts.slice(0, 10).map((post, index) => (
                        <li key={index}>
                            <img className="profile-pic" src={post.profilePic} alt="profile" />
                            <label>{post.username}</label>
                            <div className="post-content">
                                <div className="preview-stack">
                                    <img src="live_preview_empty.png" />
                                    {post.design?.bodice && (<img src={`/bodices/${post.design.bodice}${post.design.color ? `/${post.design.bodice}_${post.design.color}.png` : `/${post.design.bodice}.png`}`} alt="bodice" />)}
                                    {post.design?.sleeves && (<img src={`/sleeves/${post.design.sleeves}${post.design.color ? `/${post.design.sleeves}_${post.design.color}.png` : `/${post.design.sleeves}.png`}`} alt="sleeves" />)}
                                    {post.design?.necklines && (<img src={`/necklines/${post.design.necklines}${post.design.color ? `/${post.design.necklines}_${post.design.color}.png` : `/${post.design.necklines}.png`}`} alt="necklines" />)}
                                    {post.design?.bottom?.style && (<img src={`/bottoms/${post.design.bottom.type}/${post.design.bottom.style}${post.design.color ? `/${post.design.bottom.style}_${post.design.color}.png` : `/${post.design.bottom.style}.png`}`} alt="bottom" />)}
                                </div>
                                <p>{post.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}