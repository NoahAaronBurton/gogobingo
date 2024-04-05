import PageHeader from "./components/PageHeader"
import Button from "./components/Button"
import BoardForm from "./components/BoardForm"

export default function BoardEditor() {

   
    return (
    <>
    <div>
        <PageHeader title="Create a Board" subtitle="Here is where you will create your board.">
        </PageHeader>
    </div>
        <BoardForm />
    </>
    )
}