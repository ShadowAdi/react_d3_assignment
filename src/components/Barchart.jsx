import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { fetchRaceWinPerDriver } from "../functions/Global";
import { teamColors } from "../constants/Color_Constant";

const Barchart = ({ startYear, endYear }) => {
  const svgRef = useRef();
  const containerRef = useRef(); // Reference to the container div
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const raceData = await fetchRaceWinPerDriver(startYear, endYear);
      setData(raceData);
      setLoading(false);
    };
    loadData();
  }, [startYear, endYear]);

  // Set dimensions based on container size and handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newWidth = Math.min(containerWidth, 1200); // Cap at 1200px for large screens
        const newHeight = Math.max(300, newWidth * 0.5); // Maintain aspect ratio (adjustable)
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions(); // Initial call
    window.addEventListener("resize", updateDimensions); // Update on resize

    return () => window.removeEventListener("resize", updateDimensions); // Cleanup
  }, []);

  // Render chart
  useEffect(() => {
    if (loading || data.length === 0 || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    const margin = {
      top: 40,
      right: 30,
      bottom: width < 600 ? 80 : 100, // More bottom margin on small screens
      left: width < 600 ? 50 : 80,
    };

    svg.selectAll("*").remove(); // Clear previous elements
    const getColor = (team) => teamColors[team] || "#888888";

    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.driverName))
      .range([margin.left, width - margin.right])
      .padding(width < 600 ? 0.2 : 0.4); // Smaller padding on small screens

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.wins)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const g = svg.append("g");

    // Draw Bars
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.driverName))
      .attr("y", height - margin.bottom)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", (d) => getColor(d.team))
      .transition()
      .duration(1000)
      .attr("y", (d) => yScale(d.wins))
      .attr("height", (d) => height - margin.bottom - yScale(d.wins));

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", `rotate(${width < 600 ? -10 : -20})`) // Less rotation on small screens
      .style("text-anchor", "end")
      .style("font-size", width < 600 ? "10px" : "12px"); // Smaller font on small screens

    // Y Axis
    g.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(d3.format("d")))
      .style("font-size", width < 600 ? "10px" : "12px");

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("background", "#1b1b1b")
      .style("color", "#fff")
      .style("padding", "8px")
      .style("border-radius", "5px")
      .style("border", "1px solid #ddd")
      .style("display", "none");

    g.selectAll("rect")
      .on("mouseover", (event, d) => {
        tooltip
          .html(
            `<strong>${d.driverName}</strong> (${d.team})<br/>Wins: ${d.wins}`
          )
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 30 + "px")
          .style("display", "block");
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });

    // Zoom & Pan
    const zoom = d3
      .zoom()
      .scaleExtent([1, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, [data, loading, dimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        flex: 1,
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 500 }}>Race Wins Per Driver</h2>
      {loading ? (
        <div style={{ fontSize: 18, color: "white" }}>Loading...</div>
      ) : (
        <svg
          ref={svgRef}
          style={{ width: "100%", height: dimensions.height, maxWidth: "1200px" }}
        ></svg>
      )}
    </div>
  );
};

export default Barchart;