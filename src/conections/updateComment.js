import axios from "axios";

const updateComment = (id_order, comment) => {
    const localIp = process.env.REACT_APP_LOCAL_IP; 
  return axios.put(`http://${localIp}/proyectodbaw/phpsql/updateComment.php`, {
    id_order,
    comment
  });
};

export default updateComment;
