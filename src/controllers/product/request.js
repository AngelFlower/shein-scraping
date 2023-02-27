export const sheinRequest = async (url, location) => {
  const sheinUrl = location
    ? `https://m.shein.com.${location}`
    : "https://m.shein.com";

  const response = await fetch(url);

  const scripts = await response.text();
  const result = JSON.parse(scripts.match("var shareInfo = (.*?);")[1]);

  const { title, id, cat_id } = result;

  const mobileUrl =
    title.replace("/", "-").split(" ").join("-") +
    "-p-" +
    id +
    "-cat-" +
    cat_id +
    ".html";

  const mobileWeb = await fetch(`${sheinUrl}/${mobileUrl}`);

  return {
    title,
    id,
    html: await mobileWeb.text(),
  };
};
