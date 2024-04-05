import Button from "./Button";
import { useEffect, useState } from "react";

export default function BoardForm() {
    const [textCols, setTextCols] = useState(3);
    const [textGridSize, setTextGridSize] = useState("3x3");
    const inputClases = "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    const dropDownClasses = "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }

    // Update gridSize whenever the selected option changes
    function handleSelectChange(e) {
        setTextGridSize(e.target.value);
    }
    //function to generate the correct amount of word inputs based on grid size
    function generateWordInputs() {
        //get grid size from dropdown
        const gridInput = document.getElementById("grid-size").value;
        
        //  console.log(gridInput);

        const newGridSize = gridInput.split("x");
        // console.log(newGridSize);
        
        //get the div where the word inputs will be appended
        const textInput = document.getElementById("text-input");

        //clear the div of any previous inputs
        textInput.innerHTML = "";

        //The outer loop iterates over the rows of the grid.
        for (let i = 0; i < newGridSize[0]; i++) {
            // For each iteration of the outer loop, the inner loop iterates over the columns of the grid. The number of iterations is determined by newGridSize[1]
            for (let j = 0; j < newGridSize[1]; j++) {
                const input = document.createElement("input");
                input.type = "text";
                input.name = `task-${i}-${j}`;
                input.id = `task-${i}-${j}`;
                input.className = inputClases;
                input.placeholder = `task ${i + 1}, ${j + 1}`;
                textInput.appendChild(input);
            }
        }
        //* for getting grid class for styling
        const cols= newGridSize[1];
        setTextCols(cols);
    }
    //The useEffect hook then listens for changes to textGridSize. When textGridSize changes, it triggers the generateWordInputs function. This function generates the correct number of input fields
    useEffect(() => { 
        generateWordInputs();

    }
    , [textGridSize]);
    return (
        <div id="board-form" className="outline-2">
        <form>
            <div className="flex flex-col">
                <label htmlFor="board-title">Board Title</label>
                <input type="text" id="board-title" name="board-title" className={inputClases} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="grid-size" className="mb-2">Select a grid size (determine the length of the game):</label>
                <select id="grid-size" name="grid-size" onChange={handleSelectChange} defaultValue="3x3" className={dropDownClasses}>
                    <option>3x3</option>
                    <option>4x4</option>
                    <option>5x5</option>

                </select>
            </div>
            {/* make option for bg image? */}
            {/* <div className="flex flex-col">
                <label htmlFor="board-image">Board Image</label>
                <input type="file" id="board-image" name="board-image" />
            </div> */}
                <p>Enter the Tasks to be completed for this Board:</p>
            <div id="text-input" className={`grid grid-cols-${textCols} space-y-2 space-x-2 mb-4`}>
            </div>
            <Button text="submit" funct={handleSubmit} >Submit</Button>
        </form>

    </div>
    )
}