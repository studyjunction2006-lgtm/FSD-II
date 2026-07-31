import { useState } from "react";

import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";

import PlatformFilter from "./PlatformFilter";

import PostCard from "./PostCard";

function PostList() {

  const posts = useSelector((state) => state.posts.posts);

  const [search, setSearch] = useState("");

  const [platform, setPlatform] = useState("All");

  const filteredPosts = posts.filter((post) => {

    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase());

    const matchesPlatform =
      platform === "All" || post.platform === platform;

    return matchesSearch && matchesPlatform;
  });

  return (
    <>
      <div className="toolbar">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <PlatformFilter
          platform={platform}
          setPlatform={setPlatform}
        />

      </div>

      <div className="postList">

        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

      </div>
    </>
  );
}

export default PostList;