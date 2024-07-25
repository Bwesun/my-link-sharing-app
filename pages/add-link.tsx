import { useState } from "react";
import { addLink } from "../services/firestoreService";

const AddLink = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    // e.preventDefault();
    await addLink({ title, url });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        required
      />
      <button type="submit">Add Link</button>
    </form>
  );
};

export default AddLink;
