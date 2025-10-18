import {useState} from "react";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: true},
    {id: 2, description: "Socks", quantity: 12, packed: true},
    {id: 3, description: "Charger", quantity: 1, packed: false}
];

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items}/>
            <Stats/>
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 💼</h1>
}

function Form({onAddItems}) {
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

function PackingList({items}) {

    return (<div className="list">
        <ul>
            {items.map(item => <Item item={item} key={item.id}/>)}
        </ul>
    </div>);
}

function Item({item}) {
    return (
        <div>
            <li>
                <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                    {item.quantity} {item.description}
                </span>
                <button>❌</button>
            </li>
        </div>
    );
}

function Stats() {
    return (<>
        <footer className="stats">
            <em>
                💼 You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    </>);
}
