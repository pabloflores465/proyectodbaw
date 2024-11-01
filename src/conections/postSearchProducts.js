import axios from "axios";

export default function postSearchProducts(setSearchedProducts, checkedFields, searchTerm) {
    const localIp = process.env.REACT_APP_LOCAL_IP;
    axios.post(`http://${localIp}/proyectodbaw/phpsql/searchproducts.php`, {filters: checkedFields, searchTerm: searchTerm})
    .then((response)=>{
        console.log(response.data)
        setSearchedProducts(response.data)
    }).catch((error)=>{
        console.log(error)
    })
}