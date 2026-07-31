function PlatformFilter({ platform, setPlatform }) {
  return (
    <select
      className="platformFilter"
      value={platform}
      onChange={(e) => setPlatform(e.target.value)}
    >
      <option value="All">All Platforms</option>
      <option value="LinkedIn">LinkedIn</option>
      <option value="Instagram">Instagram</option>
      <option value="Facebook">Facebook</option>
      <option value="Twitter">Twitter</option>
    </select>
  );
}

export default PlatformFilter;