import { useSelector } from "react-redux";

function DashboardCards() {

    const posts = useSelector((state)=>state.posts.posts);

    const published =
        posts.filter((post)=>post.status==="Published").length;

    const drafts =
        posts.filter((post)=>post.status==="Draft").length;

    const platforms =
        [...new Set(posts.map((post)=>post.platform))].length;

    return(

        <div className="cards">

            <div className="card">
                <h2>{posts.length}</h2>
                <p>Total Posts</p>
            </div>

            <div className="card">
                <h2>{published}</h2>
                <p>Published</p>
            </div>

            <div className="card">
                <h2>{drafts}</h2>
                <p>Drafts</p>
            </div>

            <div className="card">
                <h2>{platforms}</h2>
                <p>Platforms</p>
            </div>

        </div>

    );

}

export default DashboardCards;