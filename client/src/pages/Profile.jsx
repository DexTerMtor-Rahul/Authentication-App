import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = image ? new Date().getTime() + image.name : "";
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="bg-indigo-50 min-h-screen">
      <div className="mx-auto flex flex-col items-center justify-center px-2 md:mt-0 sm:max-w-md xl:p-0  ">
        <div className="mt-10 bg-white w-full rounded-lg shadow-md px-8 py-8 ">
          <h1 className="mb-8 text-3xl font-semibold text-center">Profile</h1>
          <div className="mb-10 flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt="profile"
              className="h-100 w-100 rounded-full object-cover"
              onClick={() => fileRef.current.click()}
            />
            <p className="mt-2 text-sm self-center">
              {imageError ? (
                <span className="text-red-700">
                  Error uploading image (file size must be less than 2 MB)
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <form>
            <input
              defaultValue={currentUser.username}
              type="text"
              className=" bg-indigo-50 w-full p-3 rounded-lg mb-4"
              name="username"
              placeholder="Username"
              id="username"
              // onChange={handleChange}
            />
            <input
              defaultValue={currentUser.email}
              type="text"
              className=" bg-indigo-50 w-full p-3 rounded-lg mb-4"
              name="email"
              placeholder="Email"
              id="email"
              // onChange={handleChange}
            />

            <input
              type="password"
              className=" bg-indigo-50 w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              id="password"
              // onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded-lg text-white bg-indigo-700 hover:opacity-85 disabled:opacity-80 focus:outline-none my-1">
              Update
            </button>
          </form>

          <div className="flex justify-between mt-5">
            <span className="text-md  text-red-500 cursor-pointer hover:text-red-700">
              Delete Account{" "}
            </span>
            <span className="text-md text-red-500 cursor-pointer  hover:text-red-700">
              Sign Out{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
