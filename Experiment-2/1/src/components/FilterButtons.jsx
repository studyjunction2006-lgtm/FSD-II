import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/posts/postsSlice";

function FilterButtons() {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.posts.category);

  const categories = ["All", "Tech", "Sports", "News"];

  return (
    <div className="filterContainer">
      {categories.map((item) => (
        <button
          key={item}
          className={selected === item ? "activeBtn" : ""}
          onClick={() => dispatch(setCategory(item))}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
