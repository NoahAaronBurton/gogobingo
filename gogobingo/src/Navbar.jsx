import Button from "./components/Button";

export default function Navbar({ setOpenPage }) {

    const NavItem = ({ name, funct }) => {
        return (
            <Button funct={funct} text={name} />
        );
    }

    return (
        <nav className="flex justify-between w-full p-4">
          <div className="flex space-x-4">
            <NavItem name="Home" funct={() => setOpenPage("landing")} />
            <NavItem name="Create a Board" funct={() => setOpenPage("board-editor")} />
          </div>
         
        </nav>
    )
}