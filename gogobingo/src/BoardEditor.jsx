import PageHeader from "./components/PageHeader"
import BoardForm from "./components/BoardForm"
import { useState } from "react";
import Button from "./components/Button";

export default function BoardEditor() {
    const [bingoBoard, setBingoBoard] = useState([]);
    const [textCols, setTextCols] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boardTitle, setBoardTitle] = useState("");
    console.log('editor: ' + textCols); // Log the value of textCols
    console.log('editor: ' + isModalOpen)

    const saveBoard = () => {
        console.log('save board btn');
        console.log(bingoBoard);

        //! Save the board to local storage
        JSON.stringify(localStorage.setItem(boardTitle, bingoBoard));

    }

    return (
    <div>
        <div>
            <PageHeader title="Create a Board" subtitle="Here is where you will create your board.">
            </PageHeader>
        </div>
        <div className="flex">
        <BoardForm onFormSubmit={setBingoBoard} setBoardTitle={setBoardTitle} onColsChange={setTextCols} openModal={setIsModalOpen}/>
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md w-11/12 h-5/6 m-auto items-center overflow-auto">
                    <h2 className="text-2xl font-bold">Preview</h2>
                    <h3 className="text-lg font-semibold">{boardTitle}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${textCols}, 1fr)`, gridAutoRows: '1fr', maxWidth: '500px', maxHeight: '500px' }}>
                        {bingoBoard.map((task, index) => (
                            <div key={index} className="border border-gray-300 text-center text-base break-words overflow-auto relative">
                                <div style={{ paddingBottom: '100%' }}></div>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                                    <p>{task}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                    <Button funct={saveBoard} text="Save Board" />
                </div>
            </div>
        )}
        </div>
    </div>
    )
}