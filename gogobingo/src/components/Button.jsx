export default function Button ({text, funct}) {
    return (
        <button onClick={funct} className="px-6 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-700">{text}</button>
    )
}