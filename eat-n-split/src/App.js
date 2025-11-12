import {useState} from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        imageURL: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        imageURL: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        imageURL: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friends, setFriends] = useState([...initialFriends]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleSplitBill(value) {
        console.log(value);
        setFriends(friends.map((friend) => (friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value } : friend)));
        setSelectedFriend(null);
    }

    function handleShowAddFriend() {
        setShowAddFriend(showAddFriend => !showAddFriend);
    }

    function handleAddFriends(friend) {
        setFriends(friends => [...friends, friend]);
        setShowAddFriend(false);
    }

    function handleSelection(friend) {
        setSelectedFriend(selectedFriend => selectedFriend?.id === friend.id ? null : friend);
        setShowAddFriend(false);
    }

    return (<div className="app">
        <title>Eat-N-Split</title>
        <div className="sidebar">
            <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>
            <FormAddFriend showAddFriend={showAddFriend} onAddFriend={handleAddFriends}/>
            <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close form" : "Add friend"}</Button>
        </div>
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>);
}

function FriendsList({friends, onSelection, selectedFriend}) {
    return (<ul>
        {friends.map(friend => (
            <Friend onSelection={onSelection} friend={friend} key={friend.id} selectedFriend={selectedFriend}/>))}
    </ul>);
}

function Friend({friend, key, onSelection, selectedFriend}) {
    const isSelected = selectedFriend?.id === friend.id;
    return (
        <li className={isSelected ? 'selected' : ""}>
            <img src={friend.imageURL} alt={friend.name}/>
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (<p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>)}
            {friend.balance > 0 && (<p className="green">{friend.name} owes you {Math.abs(friend.balance)}$</p>)}
            {friend.balance === 0 && (<p>You and {friend.name} are even</p>)}
            <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
        </li>
    )
}

function FormAddFriend({showAddFriend, onAddFriend}) {
    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48");

    function handleNameChange(name) {
        setName(name);
    }

    function handleImageURL(value) {
        setImageURL(value);
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!name || !imageURL) return;

        const id = crypto.randomUUID();
        const newFriend = {name, imageURL: `${imageURL}?=${id}`, balance: 0, id: id,};

        onAddFriend(newFriend);

        setName("");
        setImageURL(imageURL);
    }

    return (
        showAddFriend &&
        (<form className="form-add-friend" onSubmit={handleSubmit}>
            <label>&#128107; Friend name</label>
            <input type='text' value={name} onChange={(e) => (handleNameChange(e.target.value))}/>

            <label>&#128248; Image URL</label>
            <input type='text' value={imageURL} onChange={(e) => (handleImageURL(e.target.value))}/>
            <Button>Add</Button>
        </form>)
    );
}

function Button({children, onClick}) {
    return (<div>
        <button className="button" onClick={onClick}>{children}</button>
    </div>);
}

function FormSplitBill({selectedFriend, onSplitBill}) {
    const [bill, setBill] = useState('');
    const [paidByUser, setPaidByUser] = useState('');
    const [whoIsPaying, setWhoIsPaying] = useState("user");
    const paidByFriend = bill ? bill - paidByUser : "";

    function handleSubmit(e) {
        e.preventDefault();

        if (!paidByUser || !bill) return;

        onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    }

    return (<form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {selectedFriend.name}</h2>

        <label>&#128176; Bill value</label>
        <input type='text' value={bill} onChange={(e) => setBill(Number(e.target.value))}/>

        <label>&#128176; Your expense</label>
        <input type='text' value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) <= bill ? Number(e.target.value) : paidByUser)}/>

        <label>&#128176;{selectedFriend.name}'s expense</label>
        <input type='numeric' value={paidByFriend} disabled/>

        <label>&#128176;Who is paying the bill?</label>
        <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
            <option value="user">You</option>
            <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split</Button>
    </form>);
}