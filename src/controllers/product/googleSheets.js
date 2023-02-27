import { sheinRequest } from "./request.js";

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
