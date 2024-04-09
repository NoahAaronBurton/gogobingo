import PageHeader from "./components/PageHeader"
import BoardForm from "./components/BoardForm"
import { useState } from "react";

export default function BoardEditor() {
    const [bingoBoard, setBingoBoard] = useState([]);
    const [textCols, setTextCols] = useState(3);

    console.log('editor: ' + textCols); // Log the value of textCols
    return (
    <div>
        <div>
            <PageHeader title="Create a Board" subtitle="Here is where you will create your board.">
            </PageHeader>
        </div>
        <div className="flex">
        <BoardForm onFormSubmit={setBingoBoard} onColsChange={setTextCols}/>
            <div className="w-1/2">
                <h2 className="text-2xl font-bold">Preview</h2>
                <div className={`grid grid-cols-${textCols}`}>
                    {bingoBoard.map((task, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-md">
                            {task}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}