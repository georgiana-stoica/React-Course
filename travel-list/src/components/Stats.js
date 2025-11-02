export default function Stats({items}) {
    if (items.length === 0)
        return <p className="stats"><em>
            Start adding items...
        </em></p>
    const numItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;

    return (<>
        <footer className="stats">
            <em>
                {numItems === packedItems ? 'You got everything you need to go' : `💼 You have ${numItems} items on your list, and you already packed ${packedItems} (${Math.round((packedItems * 100) / numItems)}%)`}
            </em>
        </footer>
    </>);
}