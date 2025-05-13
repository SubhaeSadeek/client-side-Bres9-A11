import axios from "axios";
import Swal from "sweetalert2";

const Subscribe = () => {
	const handleSubscribe = (e) => {
		e.preventDefault();
		const subscribeEmail = e.target.email.value;

		axios
			.post("http://localhost:5001/subscribe", { subscribeEmail })
			.then((res) => {
				if (res.data.insertedId) {
					Swal.fire({
						title: "Thank You",
						text: "Your Subscription has been Registered!",
						icon: "success",
						confirmButtonColor: "#45acfb",
						confirmButtonText: "OK",
					});
				}
			});
		e.target.reset();
	};
	return (
		<div>
			{/* subscribe section */}
			<div className="p-4 rounded-2xl w-3/4 mx-auto border-white bg-white/20 border-2">
				<div className="card bg-base-100 bg-gradient-to-tr from-blue-400/10 to-fuchsia-300/20 py-16">
					<form
						onSubmit={handleSubscribe}
						className="card-body flex items-center"
					>
						<h1 className="text-2xl lg:text-4xl font-bold">
							Subscribe to our Newsletter
						</h1>
						<p className="px-12 text-xl">
							Get the latest updates and news right in your inbox!
						</p>
						<div className=" flex  justify-center gap-3 w-3/4">
							<input
								type="email"
								placeholder=" enter your email"
								className="input input-bordered w-2/3"
								name="email"
								required
							/>
							<button className="btn btn-info w-1/4 ">Subscribe</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Subscribe;
