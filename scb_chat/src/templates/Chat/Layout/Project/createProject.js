import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormNewOrUpdateProject from "./formProject";
import TableMenber from "./TableMenber";

const CreateProjectScreen = (props) => {

  const {  projectUpdate, translate , setToggle } = props
  const [dataNewProject, setdataNewProject] = useState([])
  const dispatch = useDispatch();
  const  handleNewProject = () =>{
    e.preventDefault();
  }
  console.log({dataNewProject})
  return (
    <div className="">
     
        <FormNewOrUpdateProject setdataNewProject={setdataNewProject} />              
        {
            projectUpdate.length > 0  && 
            <TableMenber
                translate={translate}
                dataSource = {projectUpdate}/>
        }
        <div className="footer-action-btn">
          <button type="submit" className="btn btn-blue" onClick={handleNewProject}>
            Lưu
          </button>
          <button type="submit" className="btn btn-red-bd-none" onClick={() => setToggle(pre => !pre)}>
            Hủy bỏ
          </button>
        </div>
      
    </div>
  );
};
export default CreateProjectScreen;
