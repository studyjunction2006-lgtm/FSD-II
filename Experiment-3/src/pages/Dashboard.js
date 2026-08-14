import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser, logout } from "../utils/auth";

import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";

function Dashboard() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to Secure CMS",
      content:
        "This post demonstrates role-based access control using JWT authentication.",
      author: "Admin User",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      title: "RBAC Implementation",
      content:
        "Admins can create, edit and delete content. Editors can create and edit. Viewers have read-only access.",
      author: "Editor User",
      createdAt: new Date().toLocaleString(),
    },
  ]);

  const [editingPost, setEditingPost] = useState(null);

  const isAdmin = user?.role === "Admin";

  const isEditor =
    user?.role === "Editor";

  const canCreate =
    isAdmin || isEditor;

  const canEdit =
    isAdmin || isEditor;

  const canDelete =
    isAdmin;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const addPost = (newPost) => {
    newPost.author = user.name;

    setPosts((previousPosts) => [
      newPost,
      ...previousPosts,
    ]);
  };

  const deletePost = (id) => {
    if (!canDelete) {
      alert("You don't have permission to delete posts.");
      return;
    }

    setPosts((previousPosts) =>
      previousPosts.filter(
        (post) => post.id !== id
      )
    );
  };

  const editPost = (post) => {
    if (!canEdit) {
      alert("You don't have permission to edit posts.");
      return;
    }

    const updatedTitle = prompt(
      "Enter new title:",
      post.title
    );

    const updatedContent = prompt(
      "Enter new content:",
      post.content
    );

    if (
      updatedTitle &&
      updatedContent
    ) {
      setPosts((previousPosts) =>
        previousPosts.map((item) =>
          item.id === post.id
            ? {
                ...item,
                title: updatedTitle,
                content: updatedContent,
              }
            : item
        )
      );
    }
  };

  return (
    <div className="app-shell">

      {/* HEADER */}

      <header className="topbar">

        <div className="brand">
          <div className="brand-icon">
            🔐
          </div>

          <div>
            <h2>Secure CMS</h2>
            <span>JWT + RBAC</span>
          </div>
        </div>

        <div className="user-section">

          <div className="user-info">

            <strong>
              {user?.name}
            </strong>

            <span className={`role-badge ${user?.role?.toLowerCase()}`}>
              {user?.role}
            </span>

          </div>

          <button
            className="logout-small"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="main-content">

        {/* WELCOME */}

        <section className="welcome-section">

          <div>

            <p className="eyebrow">
              ROLE-BASED CONTENT MANAGEMENT
            </p>

            <h1>
              Welcome back,{" "}
              <span>{user?.name}</span> 👋
            </h1>

            <p>
              Manage your content according to your
              assigned permissions.
            </p>

          </div>

          <div className="role-display">

            <span>Your Role</span>

            <strong>
              {user?.role}
            </strong>

          </div>

        </section>


        {/* PERMISSIONS */}

        <section className="permission-section">

          <h2>Your Permissions</h2>

          <div className="permission-grid">

            <div className="permission-item">
              <span>👁️</span>
              <strong>View</strong>
              <small>Always allowed</small>
            </div>

            <div
              className={
                canCreate
                  ? "permission-item allowed"
                  : "permission-item denied"
              }
            >
              <span>➕</span>
              <strong>Create</strong>
              <small>
                {canCreate
                  ? "Allowed"
                  : "Restricted"}
              </small>
            </div>

            <div
              className={
                canEdit
                  ? "permission-item allowed"
                  : "permission-item denied"
              }
            >
              <span>✏️</span>
              <strong>Edit</strong>
              <small>
                {canEdit
                  ? "Allowed"
                  : "Restricted"}
              </small>
            </div>

            <div
              className={
                canDelete
                  ? "permission-item allowed"
                  : "permission-item denied"
              }
            >
              <span>🗑️</span>
              <strong>Delete</strong>
              <small>
                {canDelete
                  ? "Allowed"
                  : "Restricted"}
              </small>
            </div>

          </div>

        </section>


        {/* COMPOSER */}

        {canCreate && (
          <PostComposer
            onAddPost={addPost}
          />
        )}


        {/* VIEWER MESSAGE */}

        {!canCreate && (
          <div className="viewer-notice">

            <span>👁️</span>

            <div>
              <strong>
                View Only Mode
              </strong>

              <p>
                Your Viewer role allows you to read
                posts but not create, edit or delete them.
              </p>
            </div>

          </div>
        )}


        {/* POSTS */}

        <section className="posts-section">

          <div className="posts-heading">

            <div>
              <h2>Published Posts</h2>
              <p>
                {posts.length} posts available
              </p>
            </div>

            <span className="live-badge">
              ● LIVE
            </span>

          </div>


          <div className="posts-grid">

            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                canEdit={canEdit}
                canDelete={canDelete}
                onEdit={editPost}
                onDelete={deletePost}
              />
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;