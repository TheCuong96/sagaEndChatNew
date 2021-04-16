
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';

import { Link, useLocation } from 'react-router-dom';
import ProjectMain from './Layout/Project/ProjectMain';
import CreateProjectScreen from './Layout/Project/createProject'
import {useDispatch, useSelector} from "react-redux";
import {projectAction} from "store/action";
import {listProjectMapping} from "templates/Chat/Layout/Project/Mapping/listProjectMapping";

const PageProject = () => {

    const { t : translate } = useTranslation();
    const [toggle, setToggle] = useState(true)
    const [toggleUpdate, setToggleUpdate] = useState(true)
    const [projectUpdate, setProjectUpdate] = useState([])
    const dispatch = useDispatch()
    const listProjectReducer = useSelector((state) => state.projectReducer.list);
    const dataPagination = useSelector((state) => state.projectReducer.meta);
    const dataTableProject = listProjectReducer.length > 0 ? listProjectMapping(listProjectReducer) : null;
    const location = useLocation()
    useEffect(() => {
       if( location.pathname === '/project'){ 
        setToggle(true) && setProjectUpdate([])} 
        return () => {
         
        }
    }, [location.key])
    console.log({location})
    console.log("tog: " ,toggle)
    useEffect(() => {
        dispatch(projectAction.getProjectList({

        }));
    }, []);
    const handleChangeState = () =>{
        setToggle(!toggle)
        if(projectUpdate.length > 0)
        {
            setProjectUpdate([])
        }
    }
    

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="header-page">
                        <div className="header-page__title">{ toggle ? `${translate('project')}`: (projectUpdate.length == 0 ? "Dự án mới" : "Cập nhật dự án") }</div>
                        <div className="header-page__action">
                          
                                <button className={ toggle ? "btn btn-blue" : "btn btn-blue-outline" } onClick={()=>handleChangeState()}>
                                    {
                                        toggle ?
                                        <>
                                            <i className="fas fa-folder-open  btn-icon"></i>
                                            <span>{`${translate('project_new')}`}</span>
                                        </> :
                                        <>
                                            <i class="las la-angle-left btn-icon"></i> Trở lại
                                        </>
                                    }
                                </button>
                                
                          
                        </div>
                    </div>
                </div>
            </div>


            {
                toggle 
                ? 
                <ProjectMain
                        translate={translate}
                        dataPagination={dataPagination}
                        dataTableProject={dataTableProject}
                        setToggle={setToggle}
                        setProjectUpdate={setProjectUpdate}
                    />                        
                :
                <CreateProjectScreen
                    translate={translate}
                    setToggle={setToggle}
                    projectUpdate={projectUpdate}
                    />
                
                
            }

        </>

    )
}
export default PageProject;