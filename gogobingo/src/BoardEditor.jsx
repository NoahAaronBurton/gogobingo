import PageHeader from "./components/PageHeader"
import BoardForm from "./components/BoardForm"
import { useState } from "react";

export default function BoardEditor() {
    const [bingoBoard, setBingoBoard] = useState([]);
    const [textCols, setTextCols] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log('editor: ' + textCols); // Log the value of textCols
    console.log('editor: ' + isModalOpen)

    function getGridClassName() {
        return `grid grid-cols-${textCols} w-96 h-96 m-auto`;
    }
    return (
    <div>
        <div>
            <PageHeader title="Create a Board" subtitle="Here is where you will create your board.">
            </PageHeader>
        </div>
        <div className="flex">
        <BoardForm onFormSubmit={setBingoBoard} onColsChange={setTextCols} openModal={setIsModalOpen}/>
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md w-11/12 h-5/6 m-auto">
                    <h2 className="text-2xl font-bold">Preview</h2>
                    <div className={getGridClassName()}>
    {bingoBoard.map((task, index) => (
        <div key={index} className="flex flex-col items-center justify-center border border-gray-300 overflow-auto">
            <div className="w-16 h-16 flex items-center justify-center text-xs break-normal">
                <p>{task}</p>
            </div>
        </div>
    ))}
</div>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </div>
        )}
        </div>
    </div>
    )
}