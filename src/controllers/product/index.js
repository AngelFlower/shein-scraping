export const getOne = async (req, res) => {
  try {
    const { url, location } = req.query;

    if (!url) {
      return res.json({ message: "Please send a valid id" }).status(400);
    }

    const sheinUrl = location
      ? `https://m.shein.com.${location}`
      : "https://m.shein.com";

    const apiURL = url;

    const response = await fetch(apiURL);

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

    const mobileWebText = await mobileWeb.text();

    const imgTags = mobileWebText.match(/<img[^>]+src="([^">]+)/g);

    const dataSrc = imgTags.map((imgTag) => {
      const dataSrc = imgTag.match(/data-src="([^">]+)/g);
      return `https:${dataSrc[0].replace('data-src="', "")}`;
    });

    const salePrice = mobileWebText
      .match(/"salePrice":(.*?),/g)[0]
      .replace('"salePrice":', "")
      .replace(",", "")
      .split(":")[1]
      .match(/"([^"]+)"/)[1];

    const data = {
      title,
      id,
      price: salePrice,
      principal_image: dataSrc[0],
      images: dataSrc.slice(1),
    };

    res.json({ status: "ok", data }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" }).status(500);
  }
};
