import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function insertCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  return data;
}

export async function updateCabin(id, cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update(cabin)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export function getCabinImagePublicUrl(path) {
  const { data } = supabase.storage.from("cabin-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadCabinImage(path, image) {
  const { data, error } = await supabase.storage
    .from("cabin-images")
    .upload(path, image, { upsert: false, contentType: image.type });
  if (error) {
    console.error(error);
    throw new Error("Cabin image could not be uploaded");
  }
  return data;
}

export async function createCabin(cabin) {
  const imageFile = cabin.image;
  const hasNewImage = imageFile instanceof File;
  if (!hasNewImage) {
    return await insertCabin(cabin);
  }
  const { imagePath, imagePublicUrl } = buildCabinImage(imageFile);
  const { image, ...rest } = cabin;
  const data = await insertCabin({
    ...rest,
    image: imagePublicUrl,
  });
  try {
    await uploadCabinImage(imagePath, imageFile);
    return data;
  } catch (error) {
    await deleteCabin(data.id);
    throw error;
  }
}

export async function editCabin(id, cabin) {
  const imageFile = cabin.image;
  const hasNewImage = imageFile instanceof File;
  if (!hasNewImage) {
    const { image, ...rest } = cabin;
    return await updateCabin(id, rest);
  }
  const { imagePath, imagePublicUrl } = buildCabinImage(imageFile);
  const { image, ...rest } = cabin;
  const data = await updateCabin(id, {
    ...rest,
    image: imagePublicUrl,
  });
  await uploadCabinImage(imagePath, imageFile);
  return data;
}

function buildCabinImage(imageFile) {
  const imagePath = `${crypto.randomUUID()}-${imageFile.name}`.replace(
    /[/\\]/g,
    "-",
  );
  const imagePublicUrl = getCabinImagePublicUrl(imagePath);
  return { imagePath, imagePublicUrl };
}
