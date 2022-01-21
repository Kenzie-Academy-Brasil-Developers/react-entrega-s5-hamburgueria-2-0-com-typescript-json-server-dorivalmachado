import { useProduct } from "../../contexts/ProductContext";

import { Card } from "./Card";
import { HeaderDash } from "./HeaderDash";



export const Dashboard = () => {

    const {productsList} = useProduct();

    return(
        <>
            <HeaderDash/> 
            <Card list={productsList} />
        </>
    )
}
