import supabase from "../utils/supabaseClient";

export async function insertUser({ username, hashedPassword, email }) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      username: username,
      password_hash: hashedPassword,
      email: email,
    })
    .select();

  if (error) {
    switch (error.code) {
      case "23505":
        throw new Error("Username already exists");
      default:
        throw new Error(error.message);
    }
  }
  return data;
}

export async function loginUser(username) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    switch (error.code) {
      case "PGRST116":
        throw new Error("Invalid Username");
      default:
        throw new Error(error.message);
    }
  }

  return data;
}

export async function fetchUserDetails(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    switch (error.code) {
      case "22P02":
        throw new Error("Invalid User ID");
      case "PGRST116":
        throw new Error("User does not exist");
      default:
        throw new Error(error.message);
    }
  }

  return data;
}

export async function updateUser(
  userId,
  { username, email, profilePictureUrl }
) {
  const { data, error } = await supabase
    .from("users")
    .update({ username, email, profile_picture_url: profilePictureUrl })
    .eq("user_id", userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function uploadProfilePicture(filePath, file) {
  const { data, error } = await supabase.storage
    .from("profile-pictures")
    .upload(filePath, file.buffer, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    switch (error.code) {
      case "PGRST121":
        throw new Error("Invalid file type");
      default:
        throw new Error(error.message);
    }
  }

  return data;
}

export async function updateUserProfilePicture(userId, filePath) {
  const { data, error } = await supabase
    .from("users")
    .update({ profile_picture_url: filePath })
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// TODO: Add fetching of smaller profile picture
export async function fetchProfilePictureUrl(filePath) {
  const { data } = supabase.storage
    .from("profile-pictures")
    .getPublicUrl(filePath);

  return data;
}
