import React from "react";

export default function TimeSlot({
  date,
  hour,
  posts,
  onDrop,
  onEdit,
  onDelete,
  CardComponent,
}) {
  const slotDate = new Date(date);

  slotDate.setHours(hour, 0, 0, 0);

  return (
    <div
      className="time-slot"
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();

        const postId =
          event.dataTransfer.getData("postId");

        if (postId) {
          onDrop(Number(postId), slotDate);
        }
      }}
    >
      {posts.map((post) => (
        <CardComponent
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}