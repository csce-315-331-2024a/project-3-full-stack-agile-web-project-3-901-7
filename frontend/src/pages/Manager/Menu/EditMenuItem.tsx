import { useParams } from "react-router-dom";
import NewMenuItemPage from "./NewMenuItem";

const EditMenuItemPage = () => {
    const { itemId } = useParams<{ itemId: string }>();
    return <NewMenuItemPage itemId={(itemId && parseInt(itemId)) || undefined} />
}

export default EditMenuItemPage;