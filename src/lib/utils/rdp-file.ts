export interface RdpConnectionConfig {
  ipAddress: string;
  rdpPort?: number;
  username: string;
  serverLabel?: string;
}

export function buildRdpFileContent({
  ipAddress,
  rdpPort = 3389,
  username,
}: RdpConnectionConfig): string {
  const fullAddress =
    rdpPort && rdpPort !== 3389 ? `${ipAddress}:${rdpPort}` : ipAddress;

  return [
    `full address:s:${fullAddress}`,
    `username:s:${username}`,
    "prompt for credentials:i:1",
    "administrative session:i:1",
    "screen mode id:i:2",
    "use multimon:i:0",
    "desktopwidth:i:1920",
    "desktopheight:i:1080",
    "session bpp:i:32",
    "compression:i:1",
    "keyboardhook:i:2",
    "audiocapturemode:i:0",
    "videoplaybackmode:i:1",
    "connection type:i:7",
    "networkautodetect:i:1",
    "bandwidthautodetect:i:1",
    "displayconnectionbar:i:1",
    "autoreconnection enabled:i:1",
    "authentication level:i:2",
    "negotiate security layer:i:1",
  ].join("\r\n");
}

export function downloadRdpFile(config: RdpConnectionConfig): void {
  const content = buildRdpFileContent(config);
  const blob = new Blob([content], { type: "application/x-rdp;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const safeName = (config.serverLabel || config.ipAddress || "primavps-rdp")
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-");

  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeName}.rdp`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}