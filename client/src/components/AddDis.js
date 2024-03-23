import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
function AddDis() {
    let { register, handleSubmit } = useForm();
    let { currentUser } = useSelector(
        (state) => state.studentAlumniLoginReducer
      );
    // let [err, setErr] = useState("");
    let navigate = useNavigate();
    let token=localStorage.getItem('token')
    // //create axios with token
    const axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
      })
  
    const postNewArticle = async (diss) => {
      diss.dateOfCreation = new Date();
      diss.dateOfModification = new Date();
      diss.disId = Date.now();
      diss.username = currentUser.username;
      diss.userType=currentUser.userType;
      diss.threads = [];
      diss.status = true;
    //  //make HTTP post req
    let res;
    if(currentUser.userType==='student'){
     res=await axiosWithToken.post('http://localhost:4000/student-api/new-discussion',diss)
    }
    else{
        res=await axiosWithToken.post('http://localhost:4000/alumni-api/new-discussion',diss)
    }
     console.log(res)
     if(res.data.message==='new discussion created'){
        navigate('/discussions')
     }else{
      console.log(res.data.message)
     }
    console.log(diss)
    };
  
    //<p style="white-space: pre-line">multi-line text</p>
    return (
      <div className="container m-5">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 col-md-8 col-sm-10">
            <div className="card shadow">
              <div className="card-title text-center border-bottom">
                <h2 className="p-3">Add Disscussion</h2>
              </div>
              <div className="card-body bg-light">
                {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
                <form onSubmit={handleSubmit(postNewArticle)}>
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      {...register("title")}
                    />
                  </div>
  
                  <div className="mb-4">
                    <label htmlFor="category" className="form-label">
                      category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      {...register("category")}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="content" className="form-label">
                      Content
                    </label>
                    <textarea
                      {...register("content")}
                      className="form-control"
                      id="content"
                      rows="10"
                    ></textarea>
                  </div>
  
                  <div className="text-end">
                  <button type="submit" className="btn  text-dark mx-auto d-block fs-5" style={{backgroundColor:"var(--main-yellow)"}}>
                    Post
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AddDis
