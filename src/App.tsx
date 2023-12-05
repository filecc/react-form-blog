import { useState } from "react";

function App() {
  const [title, setTitle] = useState<string>("");
  const handleAdd = () => {
    console.log(title);
    setTitle("");
  }

  return (
    <section className="px-6 pt-12 pb-6">
      <label htmlFor="title">Insert a title</label>
      <input 
        name="title"
        className="input mt-2 px-4" 
        type="text" 
        value={title} 
        onKeyUp={(e) => e.key === "Enter" && handleAdd()}
        onChange={(e) => setTitle(e.target.value)} />
        <button disabled={title.trim() == ''} onClick={handleAdd} className="btn mt-4">Insert</button>
    </section>
  );
}

export default App;
