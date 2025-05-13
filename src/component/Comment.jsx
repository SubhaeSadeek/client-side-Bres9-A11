import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Comment = () => {
	const { user } = useContext(AuthContext);
	const handleComment = (e) => {
		e.preventDefault();

		const comment = e.target.comment.value;
		const commentor = user?.displayName;
		const commentorEmail = user?.email;
		const commentAt = new Date();
		const commentData = {
			comment,
			commentor,
			commentorEmail,
			commentAt,
		};
		console.log(commentData);

		e.target.reset();
	};
	return (
		<div>
			<p>jhjkh</p>
			<p>jhjkh</p>
			<p>jhjkh</p>
			<div></div>
			<form onSubmit={handleComment}>
				<div className="form-control w-2/3 mx-auto ">
					<label className="label">Put your comment here</label>
					<textarea
						placeholder="Your comments..."
						className="textarea w-full border-2 border-amber-700 rounded-b-md"
						name="comment"
					></textarea>
				</div>
				<div className=" w-1/6 flex justify-center mx-auto p-2 rounded-md bg-accent cursor-pointer my-4">
					<input
						type="submit"
						value="Submit Comment"
						className="cursor-pointer"
					/>
				</div>
			</form>
		</div>
	);
};

export default Comment;
