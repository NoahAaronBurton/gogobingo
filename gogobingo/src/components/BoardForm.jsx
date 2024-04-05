import Button from "./Button";

export default function BoardForm() {
    const inputClases = "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    const dropDownClasses = "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    return (
        <div id="board-form" className="outline-2">
        <form>
            <div className="flex flex-col">
                <label htmlFor="board-title">Board Title</label>
                <input type="text" id="board-title" name="board-title" className={inputClases} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="grid-size" className="mb-2">Select a grid size</label>
                <select id="grid-size" name="grid-size" className={dropDownClasses}>
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
            <div className="flex flex-col">
                <label htmlFor="board-words">Board Words</label>
                <textarea id="board-words" name="board-words" />
            </div>
            <Button text="submit" funct={handleSubmit} >Submit</Button>
        </form>

    </div>
    )
}