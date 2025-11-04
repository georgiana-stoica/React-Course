export default function OutputResult({bill, tip}) {
    return (bill ?
            <div>
                <h1>You pay ${+bill + +tip} (${bill} + ${tip} tip)</h1>
            </div>
            : null
    );
}