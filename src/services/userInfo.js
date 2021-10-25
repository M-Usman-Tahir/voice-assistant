import { db } from "../libraries/firebase";

const fetchUserName = async (user) => {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      return data.name;
  };

  export { fetchUserName };