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