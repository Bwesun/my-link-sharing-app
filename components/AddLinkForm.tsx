import { useState } from 'react';

interface AddLinkFormProps {
  onSubmit: (url: string, description: string) => void;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url, description);
    setUrl('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block mb-1">URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Link
      </button>
    </form>
  );
};

export default AddLinkForm;
