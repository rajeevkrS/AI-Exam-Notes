import { useEffect, useRef } from "react";
import mermaid from "mermaid";

// Mermaid will NOT automatically render diagrams when page loads
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

// This function cleans the diagram text before rendering.
// Because AI or user input might contain invalid characters.
const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  // Clean unwanted characters
  let clean = diagram.replace(/\r\n/g, "\n").trim();

  // Ensure diagram starts with graph
  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

// This function fixes node syntax problems automatically
const autoFixBadNodes = (diagram) => {
  let index = 0;

  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    index++;
    return `N${index}[${label}]`;
  });
};

function MermaidSetup({ diagram, zoom = 1 }) {
  const containerRef = useRef(null);

  // Runs whenever diagram changes
  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    // Creates a function that renders the Mermaid diagram
    const renderDiagram = async () => {
      try {
        // If user generates new diagram → remove old one
        containerRef.current.innerHTML = "";

        // Mermaid requires a unique id per diagram
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        // Runs the diagram through the cleaning function
        const safeChart = autoFixBadNodes(cleanMermaidChart(diagram));

        // Mermaid Render
        // svg contains the diagram HTML.
        const { svg } = await mermaid.render(uniqueId, safeChart);

        // The generated diagram appears inside the container
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed: ", error);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-2 overflow-auto">
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
        }}
      >
        <div ref={containerRef} />
      </div>
    </div>
  );
}

export default MermaidSetup;
