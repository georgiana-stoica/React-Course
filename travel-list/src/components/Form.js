import {useState} from "react";

export default function Form({onAddItems}) {
    const [description, setDescription] = useState("");

    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault(); //  to prevent the default browser actions hence we can use it to prevent the default action in event callbacks (like browser refresh)

        if (!description)
            return;
        const newItem = {description: description, quantity: quantity, packed: false, id: Date.now()};
        console.log(newItem);

        onAddItems(newItem)

        setQuantity(1);
        setDescription("");
    }

    return <div className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {Array.from({length: 20}, (_, i) => i + 1).map((num) => (<option value={num} key={num}>{num}</option>))}
        </select>
        <form>
            <input type="text" placeholder="Item..." value={description} onChange={(e) => {
                setDescription(e.target.value)
            }}/>
        </form>
        <button>ADD</button>
    </div>
}