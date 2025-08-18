import "./tools.css";

import { Tools } from "./tools";

export const AllTools = () => {
  const imageTools = [
    {
      toolType: "Convert",
      title: "Convert Images",
      description: "Batch convert images to and from JPG, PNG, WEBP and ICO",
      link: "/convert-image",
    },
    {
      toolType: "Resize",
      title: "Resize Images",
      description: "Tool to Resize images to exact dimensions",
      link: "/resize-image",
    },
  ];

  const ytTools = [
    {
      toolType: "Download MP3",
      title: "YT to MP3",
      description: "Download Audio (MP3) from Youtube Videos",
      link: "/yt-to-mp3",
    },
    {
      toolType: "Download MP4",
      title: "YT to MP4",
      description: "Download Videos (MP4) from Youtube Videos",
      link: "/yt-to-mp4",
    },
  ];

  return (
    <section className="allContainer">
      <Tools tools={imageTools} sectionTitle="Image Tools" />
      <Tools tools={ytTools} sectionTitle="YT Tools" />
    </section>
  );
};
