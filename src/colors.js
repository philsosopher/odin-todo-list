const brightColors = [
    "#ff4d4d", // Bright red (original)
    "#ff8c00", // Bright orange (original)
    "#ffd700", // Bright yellow (original)
    "#00cc00", // Bright green (original)
    "#00cccc", // Bright cyan (original)
    "#3399ff", // Bright blue (original)
    "#cc33cc", // Bright purple (original)
    "#ff3399", // Bright magenta (original)
    "#ff6666", // Coral red
    "#ffaa00", // Amber
    "#ccff33", // Lime yellow
    "#33cc99", // Teal
    "#00b7eb", // Sky blue
    "#9933ff", // Violet
    "#ff66b2", // Hot pink
    "#ff9933", // Tangerine
    "#66ff66", // Spring green
    "#00e6b8", // Aqua
    "#4d79ff", // Indigo
    "#ff4da6"  // Bubblegum pink
];

export function getRandomColor() {
    return brightColors[Math.floor(Math.random() * brightColors.length)];
}