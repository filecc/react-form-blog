import { useState } from "react";

function App() {
  const [title, setTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [posts, setPosts] = useState<string[]>([]);
  const [[editing, indexEditing], setEditing] = useState<
    [boolean, number | null]
  >([false, null]);
  const handleAdd = () => {
    setPosts([...posts, title]);
    setTitle("");
  };

  const handleDelete = (index: number) => {
    setPosts(posts.slice(0, index).concat(posts.slice(index + 1)));
  };

  const handleEdit = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = newTitle;
  
    setPosts(updatedPosts);
    setEditing([false, null]);
    setNewTitle("");
  };

  return (
    <section className="px-6 pt-12 pb-6 container max-w-xl mx-auto">
      {!editing && (
        <section>
          <label htmlFor="title">Insert a title</label>
          <input
            name="title"
            className="input mt-2 px-4"
            type="text"
            value={title}
            onKeyUp={(e) => e.key === "Enter" && handleAdd()}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={title.trim() == ""}
            onClick={handleAdd}
            className="btn mt-4"
          >
            Insert
          </button>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            I Post che hai inserito
          </h2>
          <div>
            {posts.map((post, index) => (
              <div className="py-1.5" key={'post-number'+index+post}>
                <div className="grid grid-cols-3">
                  {editing && indexEditing === index ? (
                    <input
                      key={"editing" + index + "post"}
                      name="title"
                      className="input px-4 col-span-2"
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  ) : (
                    <span className="col-span-2">
                      {index + 1}. {post}
                    </span>
                  )}
                  <div className="ml-2 grid grid-cols-2 space-x-2">
                    {!editing ? (
                      <button
                        className="border-2 border-red-200 bg-red-50 text-red-600 px-2 py-1 rounded text-xs"
                        onClick={() => handleDelete(index)}
                      >
                        DEL
                      </button>
                    ) : (
                      <button
                        className="border-2 border-green-200 bg-green-50 text-green-600 px-2 py-1 rounded text-xs"
                        onClick={() => handleEdit(index)}
                      >
                        OK
                      </button>
                    )}
                    <button
                      className="border-2 border-amber-200 bg-amber-50 text-amber-600 px-2 py-1 rounded text-xs"
                      onClick={() => {
                        if (!editing) {
                          setNewTitle(post);
                        }
                        setEditing([!editing, index]);
                      }}
                    >
                      {editing ? "UNDO" : "EDIT"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default App;
