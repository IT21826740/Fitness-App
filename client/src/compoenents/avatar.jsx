import { useEffect, useRef, useState } from "react";

const Avatar = ({ size, avatarURL, handleAvatarChange }) => {
  const avatarInputRef = useRef(null);
  const [displayedAvatarURL, setDisplayedAvatarURL] = useState("");

  useEffect(() => {
    if (avatarURL) {
      setDisplayedAvatarURL(avatarURL);
    }
  }, [avatarURL]);

  let width = "45";
  if (size === "lg") {
    width = "140";
  }

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);

    handleAvatarChange(event);
    setDisplayedAvatarURL(imageURL);
  };

  return (
    <div
      className={`w-${width} rounded-full overflow-hidden cursor-pointer`}
      onClick={handleAvatarClick}
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={avatarInputRef}
        onChange={handleFileChange}
      />
      {displayedAvatarURL ? (
        <img
          src={displayedAvatarURL}
          style={{ width: `${width}px`, height: `${width}px` }}
          alt="User's avatar"
        />
      ) : (
        <p>Upload profile photo</p>
      )}
    </div>
  );
};

export default Avatar;
