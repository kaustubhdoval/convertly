import "./tools.css";

export const Tools = ({ tools = [], sectionTitle = "Image Tools" }) => {
  return (
    <div className="bigBoy">
      <h2>{sectionTitle}</h2>
      <div className="toolContainer">
        {tools.map((tool, index) => (
          <div key={index} className="card">
            <h3 className="title">{tool.title}</h3>
            <p className="description">{tool.description}</p>
            <a href={tool.link}>
              {tool.toolType} {"->"}{" "}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
