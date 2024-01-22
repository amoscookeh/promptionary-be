import { generateSlug } from "random-word-slugs";

function generateRandomName() {
  const slug = generateSlug(2, { format: "camel" });
  const number = Math.floor(Math.random() * 10000);

  return `${slug.toLowerCase()}${number}`;
}

export default generateRandomName;
