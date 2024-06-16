import Avatar from "./avatar";

const Followers = () => {
  return (
    <div className="flex gap-2">
      <Avatar />
      <div>
        <h3 className="font-bold text-xl">Rayan Weragala</h3>
        <div className="text-sm leading-3">5 mutual followers</div>
      </div>
    </div>
  );
}

export default Followers
