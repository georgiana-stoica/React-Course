import {useState} from "react";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: true},
    {id: 2, description: "Socks", quantity: 12, packed: true},
    {id: 3, description: "Charger", quantity: 1, packed: false}
];

export default function App() {
    return (
        <div className="app">
            <Logo/>
            <Form/>
            <PackingList/>
            <Stats/>
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 💼</h1>
}

function Form() {
    const [description, setDescription] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); //  to prevent the default browser actions hence we can use it to prevent the default action in event callbacks (like browser refresh)
        console.log(e);
    }

    return <div className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select>
            {Array.from({length: 20}, (_, i) => i + 1).map((num) =>(<option value={num} key={num}>{num}</option>))}
        </select>
        <form>
            <input type="text" placeholder="Item..." value={description}/>
        </form>
        <button>ADD</button>
    </div>
}

function PackingList() {

    return (<div className="list">
        <ul>
            {initialItems.map(item => <Item item={item} key={item.id}/>)}
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
