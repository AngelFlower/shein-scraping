import { sheinRequest } from "./request.js";

export const getInformation = async (req, res) => {
  try {
    const { url, location } = req.query;

    if (!url) {
      return res.json({ message: "Please send a valid id" }).status(400);
    }

    const { title, id, html } = await sheinRequest(url, location);

    const imgTags = html.match(/<img[^>]+src="([^">]+)/g);

    // find last mainSaleAttribute : []

    const mainSaleAttribute = html
      .match(/"mainSaleAttribute":(.*?)]/g)
      .reverse()[0]
      .replace('"mainSaleAttribute":', "")
      .replace("]", "")
      .split(":")[9];

    const color = mainSaleAttribute.match(/"([^"]+)"/)[1];

    const dataSrc = imgTags.map((imgTag) => {
      const dataSrc = imgTag.match(/data-src="([^">]+)/g);
      return `https:${dataSrc[0].replace('data-src="', "")}`;
    });

    const salePrice = html
      .match(/"salePrice":(.*?),/g)[0]
      .replace('"salePrice":', "")
      .replace(",", "")
      .split(":")[1]
      .match(/"([^"]+)"/)[1];

    const data = [id, title, color, salePrice, dataSrc[0], dataSrc.slice(1)];

    res
      .set(
        "Content-Disposition",
        "attachment; filename=product-information.csv"
      )
      .set("Content-Type", "text/csv")
      .status(200)
      .send(data.join(","));
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" }).status(500);
  }
};

export const getPrincipalImage = async (req, res) => {
  try {
    const { url, location } = req.query;

    if (!url) {
      return res.json({ message: "Please send a valid id" }).status(400);
    }

    const { html } = await sheinRequest(url, location);

    const imgTags = html.match(/<img[^>]+src="([^">]+)/g);

    const dataSrc = imgTags.map((imgTag) => {
      const dataSrc = imgTag.match(/data-src="([^">]+)/g);
      return `https:${dataSrc[0].replace('data-src="', "")}`;
    });

    res.json(dataSrc[0]).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" }).status(500);
  }
};

export const getImages = async (req, res) => {
  try {
    const { url, location } = req.query;

    if (!url) {
      return res.json({ message: "Please send a valid id" }).status(400);
    }

    const { html } = await sheinRequest(url, location);

    const imgTags = html.match(/<img[^>]+src="([^">]+)/g);

    const dataSrc = imgTags.map((imgTag) => {
      const dataSrc = imgTag.match(/data-src="([^">]+)/g);
      return `https:${dataSrc[0].replace('data-src="', "")}`;
    });

    res.json(dataSrc.slice(1).toString()).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" }).status(500);
  }
};
