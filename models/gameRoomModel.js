import supabase from "../utils/supabaseClient";

export async function createGameRoom({ hostUserId, roomName, difficulty }) {
  const { data, error } = await supabase
    .from("game_rooms")
    .insert([{ host_user_id: hostUserId, room_name: roomName, difficulty }])
    .single()
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function doesRoomNameExist(roomName) {
  const { data, error } = await supabase
    .from("game_rooms")
    .select("room_id")
    .eq("room_name", roomName)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return !!data;
}

export async function getGameRoom(roomId) {
  const { data, error } = await supabase
    .from("game_rooms")
    .select("*")
    .eq("room_id", roomId)
    .single();

  if (error) {
    switch (error.code) {
      case "PGRST116":
        throw new Error("Room does not exist");
      default:
        throw new Error(error.message);
    }
  }

  return data;
}

export async function updateGameRoom(roomId, updates) {
  const { data, error } = await supabase
    .from("game_rooms")
    .update(updates)
    .eq("room_id", roomId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
