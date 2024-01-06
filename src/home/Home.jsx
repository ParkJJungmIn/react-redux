import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


export { Home }

function Home(){
    const auth = useSelector(x=>x.auth.value);
    console.log("Home", auth);
    return(
        <div>
            <h1>Hi {auth?.name}!</h1>
            <p> 로그인 된 상태.</p>
            <p> <Link to={"/user"}>로그인 관리하기</Link></p>
        </div>
    )
}